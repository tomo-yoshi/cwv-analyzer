'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

interface CreateProjectFormProps {
  userId: string;
}

interface Organization {
  id: string;
  name: string;
}

export function CreateProjectForm({ userId }: CreateProjectFormProps) {
  const [name, setName] = useState('');
  const [organizationId, setOrganizationId] = useState('');
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const fetchOrganizations = async () => {
      const { data, error } = await supabase
        .from('organization_members')
        .select(`
          organizations (
            id,
            name
          )
        `)
        .eq('profile_id', userId)
        .eq('role', 'OWNER');

      if (!error && data) {
        // @ts-ignore
        setOrganizations(data.map(item => item.organizations));
      }
    };

    fetchOrganizations();
  }, [userId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!organizationId) {
      setError('Please select an organization');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { error: projectError } = await supabase
        .from('projects')
        .insert([{ 
          name,
          organization_id: organizationId
        }]);

      if (projectError) throw projectError;

      router.refresh();
      setName('');
      setOrganizationId('');
    } catch (err) {
      setError('Failed to create project');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md">
      {error && (
        <p className="text-red-500 mb-4">{error}</p>
      )}
      <div className="flex flex-col gap-4">
        <select
          value={organizationId}
          onChange={(e) => setOrganizationId(e.target.value)}
          className="px-4 py-2 border rounded-md"
          required
        >
          <option value="">Select Organization</option>
          {organizations.map((org) => (
            <option key={org.id} value={org.id}>
              {org.name}
            </option>
          ))}
        </select>
        <div className="flex gap-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Project name"
            className="flex-1 px-4 py-2 border rounded-md"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Create Project'}
          </button>
        </div>
      </div>
    </form>
  );
} 