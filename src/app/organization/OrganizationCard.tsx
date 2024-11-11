'use client';

import { useState } from 'react';
import { deleteOrganization } from './actions';
import { useOrganizationStore } from '@/store/organizationStore';

interface OrganizationCardProps {
  organization: {
    id: string;
    name: string;
  };
  role: string;
}

export function OrganizationCard({ organization, role }: OrganizationCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const { selectedOrganization, setSelectedOrganization } = useOrganizationStore();
  const canDelete = role === 'OWNER' || role === 'ADMIN';
  const isSelected = selectedOrganization?.id === organization.id;

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this organization? This action cannot be undone.')) {
      return;
    }

    setIsDeleting(true);
    try {
      const result = await deleteOrganization(organization.id);
      if (!result.success) {
        throw new Error('Failed to delete organization');
      }
      if (isSelected) {
        setSelectedOrganization(null);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to delete organization');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleSelect = () => {
    setSelectedOrganization(organization);
  };

  return (
    <div className="p-4 border rounded-lg shadow-sm">
      <div className="flex justify-between items-center">
        <div>
          <div className="font-medium">{organization.name}</div>
          <div className="text-sm text-gray-500">Role: {role}</div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleSelect}
            className={`px-3 py-1 rounded-md text-sm font-medium
              ${isSelected 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
          >
            {isSelected ? 'Selected' : 'Select'}
          </button>
          {canDelete && (
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