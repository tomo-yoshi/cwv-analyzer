'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useOrgAndProjStore } from '@/store/orgAndProjStore';

interface Project {
  id: string;
  name: string;
  organization_id: string;
  organizationId: string;
}

export function ProjectSelector() {
  const [projects, setProjects] = useState<Project[]>([]);
  const { selectedOrganization, selectedProject, setSelectedProject } = useOrgAndProjStore();
  const supabase = createClient();

  useEffect(() => {
    if (!selectedOrganization) {
      return;
    }

    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('organization_id', selectedOrganization.id);

      if (!error && data) {
        const mappedProjects = data.map(p => ({
          ...p,
          organizationId: p.organization_id
        }));
        setProjects(mappedProjects);
        
        // If no project is selected, select the first one
        if (!selectedProject && mappedProjects.length > 0) {
          setSelectedProject(mappedProjects[0]);
        }
      }
    };

    fetchProjects();
  }, [selectedOrganization, selectedProject, setSelectedProject]);

  if (!selectedOrganization) {
    return null;
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-500">{selectedOrganization.name}</span>
      <select
        value={selectedProject?.id || ''}
        onChange={(e) => {
          const project = projects.find(p => p.id === e.target.value);
          if (project) {
            setSelectedProject(project);
          }
        }}
        className="block w-48 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        required
      >
        {projects.map((project) => (
          <option key={project.id} value={project.id}>
            {project.name}
          </option>
        ))}
      </select>
    </div>
  );
} 