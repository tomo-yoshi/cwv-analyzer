'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function deleteProject(projectId: string, organizationId: string) {
  const supabase = createClient();
  
  try {
    // Check if this is the last project in the organization
    const { data: projectCount, error: countError } = await supabase
      .from('projects')
      .select('id', { count: 'exact' })
      .eq('organization_id', organizationId);

    if (countError) throw countError;

    if (projectCount && projectCount.length <= 1) {
      return { 
        success: false, 
        error: 'Cannot delete the last project in an organization. Organizations must have at least one project.' 
      };
    }

    // Proceed with deletion if it's not the last project
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', projectId);

    if (error) throw error;

    revalidatePath('/settings/projects');
    return { success: true };
  } catch (error) {
    console.error('Error deleting project:', error);
    return { success: false, error };
  }
}