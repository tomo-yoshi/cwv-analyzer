'use client';

import { Session } from '@supabase/supabase-js';
// import { ProjectSelector } from '../ProjectSelector';
import { UserMenu } from './UserMenu';
import { useOrgAndProjStore } from '@/store/orgAndProjStore';

interface NavbarClientProps {
  session: Session | null;
}

export function NavbarClient({ session }: NavbarClientProps) {
  const { selectedOrganization, selectedProject } = useOrgAndProjStore();

  return (
    <>
      <div className="flex items-center gap-4">
        <a href="/" className="text-xl font-bold text-primary-600">
          CWV Analyzer - β
        </a>
        {/* {session && <ProjectSelector />} */}
        {session && selectedOrganization && selectedProject && (
          <div className="flex items-center text-sm text-gray-600 border-2 py-1 px-2 rounded-md">
            <span>Org: {selectedOrganization.name}</span>
            <span className="mx-2">/</span>
            <span>Proj: {selectedProject.name}</span>
          </div>
        )}
      </div>
      <div className="flex items-center">
        <UserMenu session={session} />
      </div>
    </>
  );
}