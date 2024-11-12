import { create } from 'zustand';

export interface Organization {
  id: string;
  name: string;
}

export interface Project {
  id: string;
  name: string;
  organizationId: string;
}

interface OrgAndProjStore {
  selectedOrganization: Organization | null;
  selectedProject: Project | null;
  setSelectedOrganization: (org: Organization | null) => void;
  setSelectedProject: (project: Project | null) => void;
}

export const useOrgAndProjStore = create<OrgAndProjStore>((set) => ({
  selectedOrganization: typeof window !== 'undefined' 
    ? JSON.parse(localStorage.getItem('selectedOrganization') || 'null')
    : null,
  selectedProject: typeof window !== 'undefined'
    ? JSON.parse(localStorage.getItem('selectedProject') || 'null')
    : null,
  setSelectedOrganization: (org) => {
    localStorage.setItem('selectedOrganization', JSON.stringify(org));
    set({ selectedOrganization: org });
  },
  setSelectedProject: (project) => {
    localStorage.setItem('selectedProject', JSON.stringify(project));
    set({ selectedProject: project });
  },
}));