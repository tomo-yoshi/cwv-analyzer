'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

import { createClient } from '@/lib/supabase/server';

import { State } from './signin/state';

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email field has to be filled.' })
    .email('Email is not valid.'),
  password: z
    .string()
    .min(5, { message: 'Password should be longer than four letters.' }),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

export async function login(prevState: { message: string[] }, formData: FormData) {
  try {
    const supabase = createClient();
    
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const { error: signInError, data: { user } } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      return {
        message: [signInError.message],
      };
    }

    if (!user) {
      return {
        message: ['User not found'],
      };
    }

    // Fetch user's organizations and their roles
    const { data: memberships, error: membershipError } = await supabase
      .from('organization_members')
      .select(`
        organization_id,
        role,
        organizations (
          id,
          name,
          projects (
            id,
            name,
            organization_id
          )
        )
      `)
      .eq('profile_id', user.id)
      .order('created_at', { ascending: false });

    if (membershipError) {
      console.error('Error fetching organizations:', membershipError);
      return {
        message: ['Error fetching user data'],
      };
    }

    // If user has organizations, set the first one and its first project
    if (memberships && memberships.length > 0) {
      const firstOrg = memberships[0].organizations;
      // @ts-ignore
      const firstProject = firstOrg.projects[0];

      if (firstOrg && firstProject) {
        // Store selected organization and project in localStorage
        // This is needed because the store will be reset on page load
        if (typeof window !== 'undefined') {
          localStorage.setItem('selectedOrganization', JSON.stringify(firstOrg));
          localStorage.setItem('selectedProject', JSON.stringify(firstProject));
        }
      }
    }

    redirect('/');
  } catch (error) {
    console.error('Login error:', error);
    return {
      message: ['An error occurred during login. Please try again.'],
    };
  }
}

export async function signup(prevState: any, formData: FormData) {
  const supabase = createClient();

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirmPassword') as string;
  const firstName = formData.get('firstName') as string;
  const lastName = formData.get('lastName') as string;

  if (password !== confirmPassword) {
    return { message: ['Passwords do not match'] };
  }

  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name: firstName,
        last_name: lastName
      }
    }
  });

  if (signUpError) {
    return { message: ['Auth Error: Failed to Sign Up', signUpError.message] };
  }

  if (!signUpData.user) {
    return { message: ['No user data after signup'] };
  }

  // Create default organization
  const { data: orgData, error: orgError } = await supabase
    .from('organizations')
    .insert([
      {
        name: `${firstName}'s Organization`,
      },
    ])
    .select()
    .single();

  if (orgError || !orgData) {
    return { message: ['Failed to create default organization'] };
  }

  // Add user as organization owner
  const { error: memberError } = await supabase
    .from('organization_members')
    .insert([
      {
        profile_id: signUpData.user.id,
        organization_id: orgData.id,
        role: 'OWNER',
      },
    ]);

  if (memberError) {
    return { message: ['Failed to add user to organization'] };
  }

  // Create default project
  const { data: projectData, error: projectError } = await supabase
    .from('projects')
    .insert([
      {
        name: 'My First Project',
        organization_id: orgData.id,
      },
    ])
    .select()
    .single();

  if (projectError || !projectData) {
    return { message: ['Failed to create default project'] };
  }

  // Store initial state in localStorage
  // Note: We need to handle this client-side since localStorage isn't available server-side
  const initialState = {
    selectedOrganization: {
      id: orgData.id,
      name: orgData.name,
    },
    selectedProject: {
      id: projectData.id,
      name: projectData.name,
      organizationId: orgData.id,
    },
  };

  revalidatePath('/', 'layout');
  redirect(`/?initial=${encodeURIComponent(JSON.stringify(initialState))}`);
}

export async function signout() {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();
  
  if (error) {
    return { message: ['Auth Error: Failed to Sign Out', error.message] };
  }

  revalidatePath('/', 'layout');
  redirect('/');
}
