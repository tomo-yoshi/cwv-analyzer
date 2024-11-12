import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { CreateOrganizationForm } from './CreateOrganizationForm';
import { OrganizationCard } from './OrganizationCard';

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

  if (error) {
    console.error('Error fetching organizations:', error);
    return (
      <div className="max-w-4xl mx-auto p-4">
        <p className="text-red-500">Error loading organizations</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Organizations</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Create New Organization</h2>
        <CreateOrganizationForm userId={user.id} />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Your Organizations</h2>
        <div className="grid gap-4">
          {organizations?.map((org) => (
            <OrganizationCard
              key={org.organization_id}
              organization={{
                id: org.organization_id,
                // @ts-ignore
                name: org.organizations.name
              }}
              role={org.role}
            />
          ))}
        </div>
      </div>
    </div>
  );
} 