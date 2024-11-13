'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function createOrganization(name: string, userId: string) {
  const supabase = createClient();
  
  try {
    // Start a transaction for organization creation
    const { data: org, error: orgError } = await supabase
      .from('organizations')
      .insert({ name })
      .select()
      .single();

    if (orgError) throw orgError;

    // Add the creator as an owner
    const { error: memberError } = await supabase
      .from('organization_members')
      .insert({
        profile_id: userId,
        organization_id: org.id,
        role: 'OWNER'
      });

    if (memberError) throw memberError;

    // Create default project
    const { data: project, error: projectError } = await supabase
      .from('projects')
      .insert({
        name: 'Default Project',
        organization_id: org.id
      })
      .select()
      .single();

    if (projectError) throw projectError;

    revalidatePath('/organization');
    return { 
      success: true, 
      organization: org, 
      project: project 
    };
  } catch (error) {
    console.error('Error creating organization:', error);
    return { success: false, error };
  }
}

export async function deleteOrganization(organizationId: string) {
  const supabase = createClient();
  
  try {
    const { error } = await supabase
      .from('organizations')
      .delete()
      .eq('id', organizationId);

    if (error) throw error;

    revalidatePath('/organization');
    return { success: true };
  } catch (error) {
    console.error('Error deleting organization:', error);
    return { success: false, error };
  }
} 