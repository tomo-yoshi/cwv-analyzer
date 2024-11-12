'use client';

import Link from 'next/link';
import { useOrgAndProjStore } from '@/store/orgAndProjStore';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

interface ProjectCardProps {
  project: {
    id: string;
    name: string;
    organizationId: string;
  };
  role: string;
}

export function ProjectCard({ project, role }: ProjectCardProps) {
  const { 
    selectedProject, 
    setSelectedProject, 
    setSelectedOrganization 
  } = useOrgAndProjStore();
  const isSelected = selectedProject?.id === project.id;
  const supabase = createClient();

  const handleProjectSelect = async () => {
    // Fetch the organization details for this project
    const { data: organization } = await supabase
      .from('organizations')
      .select('*')
      .eq('id', project.organizationId)
      .single();

    if (organization) {
      setSelectedOrganization(organization);
      setSelectedProject(project);
    }
  };

  return (
    <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
      <div className="flex justify-between items-center">
        <Link href={`/projects/${project.id}`} className="flex-1">
          <h3 className="text-lg font-medium">{project.name}</h3>
          <span className="text-sm text-gray-500 capitalize">{role}</span>
        </Link>
        <div className="flex gap-2 ml-4">
          {!isSelected && (
            <button
              onClick={handleProjectSelect}
              className="px-3 py-1 rounded-md text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200"
            >
              Select
            </button>
          )}
          {isSelected && (
            <span className="px-3 py-1 rounded-md text-sm font-medium bg-blue-500 text-white">
              Selected
            </span>
          )}
        </div>
      </div>
    </div>
  );
} 