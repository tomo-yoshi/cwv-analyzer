import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { CreateOrganizationForm } from './CreateOrganizationForm';

export default async function OrganizationPage() {
  const supabase = createClient();
  
  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (!user || userError) {
    redirect('/auth/signin');
  }

  const { data: organizations, error } = await supabase
    .from('organization_members')
    .select(`
      organization_id,
      role,
      organizations (
        id,
        name,
        created_at
      )
    `)
    .eq('profile_id', user.id);

  console.log('organizations', organizations)

  if (error) {
    console.error('Error fetching organizations:', error);
    return (
      <div className="max-w-4xl mx-auto p-4">
        <p className="text-red-500">Error loading organizations</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 pl-20">
      <h1 className="text-2xl font-bold mb-6">Organizations</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Create New Organization</h2>
        <CreateOrganizationForm userId={user.id} />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Your Organizations</h2>
        <div className="grid gap-4">
          {organizations?.map((org) => (
            <div 
              key={org.organization_id} 
              className="p-4 border rounded-lg shadow-sm"
            >
              {/* @ts-ignore */}
              <div className="font-medium">{org.organizations.name}</div>
              <div className="text-sm text-gray-500">Role: {org.role}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 