import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useOrgAndProjStore, type Organization, type Project } from '@/store/orgAndProjStore';

interface InitialState {
  selectedOrganization: Organization;
  selectedProject: Project;
}

export function useInitialState() {
  const searchParams = useSearchParams();
  const { setSelectedOrganization, setSelectedProject } = useOrgAndProjStore();

  useEffect(() => {
    const initialState = searchParams.get('initial');
    if (initialState) {
      try {
        const { selectedOrganization, selectedProject } = JSON.parse(
          decodeURIComponent(initialState)
        ) as InitialState;
        
        setSelectedOrganization(selectedOrganization);
        setSelectedProject(selectedProject);
      } catch (error) {
        console.error('Failed to parse initial state:', error);
      }
    }
  }, [searchParams, setSelectedOrganization, setSelectedProject]);
}