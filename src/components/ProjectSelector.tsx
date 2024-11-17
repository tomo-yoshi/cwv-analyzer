// @ts-nocheck
'use client';

import { useEffect, useState } from 'react';

import { createClient } from '@/lib/supabase/client';

import { Organization, Project,useOrgAndProjStore } from '@/store/orgAndProjStore';

export function ProjectSelector() {
  const { 
    selectedOrganization, 
    selectedProject,
    setSelectedOrganization,
    setSelectedProject 
  } = useOrgAndProjStore();

  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrganizationsAndProjects = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) return;

      const { data: memberships } = await supabase
        .from('organization_members')
        .select(`
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
        .eq('profile_id', user.id);

      if (memberships) {
        const orgs = memberships.map(m => m.organizations);
        setOrganizations(orgs);

        // Set first org and project if none selected
        if (!selectedOrganization && orgs.length > 0) {
          const firstOrg = orgs[0];
          setSelectedOrganization(firstOrg);
          
          if (firstOrg.projects.length > 0) {
            setSelectedProject(firstOrg.projects[0]);
          }
        }
      }
      setLoading(false);
    };

    fetchOrganizationsAndProjects();
  }, [selectedOrganization, setSelectedOrganization, setSelectedProject]);

  // Update projects when organization changes
  useEffect(() => {
    if (selectedOrganization) {
      const org = organizations.find(o => o.id === selectedOrganization.id);
      if (org) {
        setProjects(org.projects);
      }
    }
  }, [selectedOrganization, organizations]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex gap-4">
      <select
        value={selectedOrganization?.id || ''}
        onChange={(e) => {
          const org = organizations.find(o => o.id === e.target.value);
          if (org) {
            setSelectedOrganization(org);
            if (org.projects.length > 0) {
              setSelectedProject(org.projects[0]);
            }
          }
        }}
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
      >
        <option value="" disabled>Select Organization</option>
        {organizations.map((org) => (
          <option key={org.id} value={org.id}>
            {org.name}
          </option>
        ))}
      </select>

      <select
        value={selectedProject?.id || ''}
        onChange={(e) => {
          const project = projects.find(p => p.id === e.target.value);
          if (project) {
            setSelectedProject(project);
          }
        }}
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
      >
        <option value="" disabled>Select Project</option>
        {projects.map((project) => (
          <option key={project.id} value={project.id}>
            {project.name}
          </option>
        ))}
      </select>
    </div>
  );
}