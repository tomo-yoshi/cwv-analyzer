'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useOrganizationStore } from '@/store/organizationStore';

interface Project {
  id: string;
  name: string;
  organization_id: string;
  organizationId: string;
}

export function ProjectSelector() {
  const [projects, setProjects] = useState<Project[]>([]);
  const { selectedOrganization, selectedProject, setSelectedProject } = useOrganizationStore();
  const supabase = createClient();

  useEffect(() => {
    if (!selectedOrganization) {
      setProjects([]);
      return;
    }

    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('organization_id', selectedOrganization.id);

      if (!error && data) {
        setProjects(data.map(p => ({
          ...p,
          organizationId: p.organization_id
        })));
      }
    };

    fetchProjects();
  }, [selectedOrganization]);

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
          setSelectedProject(project || null);
        }}
        className="block w-48 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      >
        <option value="">Select Project</option>
        {projects.map((project) => (
          <option key={project.id} value={project.id}>
            {project.name}
          </option>
        ))}
      </select>
    </div>
  );
} 