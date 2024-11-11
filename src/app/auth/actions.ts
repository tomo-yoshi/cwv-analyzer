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

export async function login(_: State, formData: FormData) {
  const result = formSchema.safeParse(Object.fromEntries(formData.entries()));

  if (result.success) {
    const supabase = createClient();

    // type-casting here for convenience
    // in practice, you should validate your inputs
    const data = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    };

    const { error } = await supabase.auth.signInWithPassword(data);

    if (error) {
      return { message: ['Auth Error: Failed to Log In', error.message] };
    }

    revalidatePath('/', 'layout');
    redirect('/');
  } else {
    const emailError = result.error.format().email?._errors[0];
    const pwError = result.error.format().password?._errors[0];
    const errors = [emailError, pwError].filter((err) => err !== undefined);
    return {
      message: errors,
    };
  }
}

export async function signup(_: State, formData: FormData) {
  const result = formSchema.safeParse(Object.fromEntries(formData.entries()));

  console.log(result);

  if (result.success) {
    const supabase = createClient();

    const data = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      options: {
        data: {
          first_name: formData.get('firstName') as string,
          last_name: formData.get('lastName') as string,
        }
      }
    };

    const { error } = await supabase.auth.signUp(data);

    if (error) {
      return { message: ['Auth Error: Failed to Sign Up', error.message] };
    }

    revalidatePath('/', 'layout');
    redirect('/');
  } else {
    const emailError = result.error.format().email?._errors[0];
    const pwError = result.error.format().password?._errors[0];
    const errors = [emailError, pwError].filter((err) => err !== undefined);
    return {
      message: errors,
    };
  }
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
