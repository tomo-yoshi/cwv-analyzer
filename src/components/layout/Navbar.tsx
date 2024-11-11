import { NavbarClient } from './NavbarClient';
// import { createClient } from '@/lib/supabase/server';

export async function Navbar() {
  // const supabase = createClient();
  // const { data: { session } } = await supabase.auth.getSession();

  return (
    <nav className="border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="text-xl font-bold text-primary-600">
              CWV Analyzer
            </a>
          </div>
          <NavbarClient />
        </div>
      </div>
    </nav>
  );
} 