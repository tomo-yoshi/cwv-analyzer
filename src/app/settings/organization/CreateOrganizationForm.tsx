'use client';

import { useState } from 'react';
import { createOrganization } from './actions';
import { useOrgAndProjStore } from '@/store/orgAndProjStore';

interface Props {
  userId: string | undefined;
}

export function CreateOrganizationForm({ userId }: Props) {
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { setSelectedOrganization, setSelectedProject } = useOrgAndProjStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;
    
    setIsLoading(true);
    try {
      const result = await createOrganization(name, userId);
      if (result.success && result.organization && result.project) {
        // Set the newly created organization and project as selected
        setSelectedOrganization(result.organization);
        setSelectedProject(result.project);
        setName('');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md">
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Organization Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
      >
        {isLoading ? 'Creating...' : 'Create Organization'}
      </button>
    </form>
  );
} 