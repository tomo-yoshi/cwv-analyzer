'use client';

import { useState } from 'react';
import { deleteOrganization } from './actions';
import { useOrgAndProjStore } from '@/store/orgAndProjStore';

interface OrganizationCardProps {
  organization: {
    id: string;
    name: string;
  };
  role: string;
}

export function OrganizationCard({ organization, role }: OrganizationCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const { selectedOrganization, setSelectedOrganization } = useOrgAndProjStore();
  const canDelete = role === 'OWNER' || role === 'ADMIN';
  const isSelected = selectedOrganization?.id === organization.id;

  const handleDelete = async () => {
    // Prevent deletion of the selected organization
    if (isSelected) {
      alert('Cannot delete the currently selected organization. Please select another organization first.');
      return;
    }

    if (!window.confirm('Are you sure you want to delete this organization? This action cannot be undone.')) {
      return;
    }

    setIsDeleting(true);
    try {
      const result = await deleteOrganization(organization.id);
      if (!result.success) {
        throw new Error('Failed to delete organization');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to delete organization');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-sm">
      <div className="flex justify-between items-center">
        <div>
          <div className="font-medium">{organization.name}</div>
          <div className="text-sm text-gray-500">Role: {role}</div>
        </div>
        <div className="flex gap-2">
          {!isSelected && (
            <button
              onClick={() => setSelectedOrganization(organization)}
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