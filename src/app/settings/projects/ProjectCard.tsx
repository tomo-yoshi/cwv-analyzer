'use client';

import { useState } from 'react';
import { useOrgAndProjStore } from '@/store/orgAndProjStore';
import { createClient } from '@/lib/supabase/client';
import { deleteProject } from './actions';

interface ProjectCardProps {
  project: {
    id: string;
    name: string;
    organizationId: string;
  };
  role: string;
}

export function ProjectCard({ project, role }: ProjectCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const { 
    selectedProject, 
    setSelectedProject, 
    setSelectedOrganization 
  } = useOrgAndProjStore();
  const isSelected = selectedProject?.id === project.id;
  const supabase = createClient();
  const canDelete = role === 'OWNER' || role === 'ADMIN';

  const handleProjectSelect = async () => {
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

  const handleDelete = async () => {
    // Prevent deletion of the selected project
    if (isSelected) {
      alert('Cannot delete the currently selected project. Please select another project first.');
      return;
    }

    if (!window.confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      return;
    }

    setIsDeleting(true);
    try {
      const result = await deleteProject(project.id, project.organizationId);
      if (!result.success) {
        throw new Error(result.error?.toString() || 'Failed to delete project');
      }
    } catch (error) {
      console.error('Error:', error);
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('Failed to delete project');
      }
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg">
      <div className="flex justify-between items-center">
        <span className='flex-1'>
          <h3 className="text-lg font-medium">{project.name}</h3>
          <span className="text-sm text-gray-500 capitalize">Role: {role}</span>
        </span>
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
          {canDelete && !isSelected && (
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className={`px-3 py-1 rounded-md text-sm font-medium text-white 
                ${isDeleting 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-red-500 hover:bg-red-600'
                }`}
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
} 