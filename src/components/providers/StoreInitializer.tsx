'use client';

import { useEffect } from 'react';
import { useOrgAndProjStore } from '@/store/orgAndProjStore';

export function StoreInitializer() {
  const { setSelectedOrganization, setSelectedProject } = useOrgAndProjStore();

  useEffect(() => {
    // Initialize store from localStorage
    const storedOrg = localStorage.getItem('selectedOrganization');
    const storedProject = localStorage.getItem('selectedProject');

    if (storedOrg) {
      setSelectedOrganization(JSON.parse(storedOrg));
    }
    if (storedProject) {
      setSelectedProject(JSON.parse(storedProject));
    }
  }, [setSelectedOrganization, setSelectedProject]);

  return null;
}