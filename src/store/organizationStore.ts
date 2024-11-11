import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Organization {
  id: string;
  name: string;
}

interface Project {
  id: string;
  name: string;
  organizationId: string;
}

interface OrganizationStore {
  selectedOrganization: Organization | null;
  selectedProject: Project | null;
  setSelectedOrganization: (org: Organization | null) => void;
  setSelectedProject: (project: Project | null) => void;
  reset: () => void;
}

export const useOrganizationStore = create<OrganizationStore>()(
  persist(
    (set) => ({
      selectedOrganization: null,
      selectedProject: null,
      setSelectedOrganization: (org) => set({ selectedOrganization: org, selectedProject: null }),
      setSelectedProject: (project) => set({ selectedProject: project }),
      reset: () => set({ selectedOrganization: null, selectedProject: null }),
    }),
    {
      name: 'organization-storage',
    }
  )
); 