import { NavbarClient } from './NavbarClient';
import { ProjectSelector } from '../ProjectSelector';
import { createClient } from '@/lib/supabase/server';

export async function Navbar() {
  const { data: session } = await createClient().auth.getSession();
  return (
    <nav className="border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center gap-4">
            <a href="/" className="text-xl font-bold text-primary-600">
              CWV Analyzer
            </a>
            <ProjectSelector />
          </div>
          <NavbarClient session={session?.session} />
        </div>
      </div>
    </nav>
  );
} 