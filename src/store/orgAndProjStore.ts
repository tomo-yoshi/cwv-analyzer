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

const getLocalStorageItem = (key: string) => {
  if (typeof window === 'undefined') return null;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error(`Error reading ${key} from localStorage:`, error);
    return null;
  }
};

export const useOrgAndProjStore = create<OrgAndProjStore>((set) => ({
  selectedOrganization: null,
  selectedProject: null,
  setSelectedOrganization: (org) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('selectedOrganization', JSON.stringify(org));
    }
    set({ selectedOrganization: org });
  },
  setSelectedProject: (project) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('selectedProject', JSON.stringify(project));
    }
    set({ selectedProject: project });
  },
}));

// Initialize store from localStorage on client side
if (typeof window !== 'undefined') {
  const storedOrg = getLocalStorageItem('selectedOrganization');
  const storedProject = getLocalStorageItem('selectedProject');
  
  if (storedOrg || storedProject) {
    useOrgAndProjStore.setState({
      selectedOrganization: storedOrg,
      selectedProject: storedProject,
    });
  }
}