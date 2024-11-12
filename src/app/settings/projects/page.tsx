// @ts-nocheck
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { CreateProjectForm } from './CreateProjectForm';
import { ProjectCard } from './ProjectCard';

export default async function ProjectsPage() {
  const supabase = createClient();
  
  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (!user || userError) {
    redirect('/auth/signin');
  }

  const { data: projectsData, error } = await supabase
    .from('projects')
    .select(`
      id,
      name,
      organization_id,
      created_at,
      organizations!inner (
        id,
        name,
        organization_members!inner (
          role
        )
      )
    `)
    .eq('organizations.organization_members.profile_id', user.id);

  if (error) {
    console.error('Error fetching projects:', error);
    return (
      <div className="max-w-4xl mx-auto p-4">
        <p className="text-red-500">Error loading projects</p>
      </div>
    );
  }

  // Group projects by organization
  const projectsByOrg = projectsData?.reduce((acc, project) => {
    const orgId = project.organization_id;
    const orgName = project.organizations.name;
    
    if (!acc[orgId]) {
      acc[orgId] = {
        name: orgName,
        projects: []
      };
    }
    
    acc[orgId].projects.push({
      id: project.id,
      name: project.name,
      organizationId: project.organization_id,
      role: project.organizations.organization_members[0].role
    });
    
    return acc;
  }, {} as Record<string, { name: string; projects: any[] }>);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Projects</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Create New Project</h2>
        <CreateProjectForm userId={user.id} />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Your Projects</h2>
        {projectsByOrg && Object.entries(projectsByOrg).map(([orgId, org]) => (
          <div key={orgId} className="mb-8">
            <h3 className="text-lg font-medium mb-4 text-gray-700">
              {org.name}
            </h3>
            <div className="grid gap-4">
              {org.projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={{
                    id: project.id,
                    name: project.name,
                    organizationId: project.organizationId
                  }}
                  role={project.role}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}