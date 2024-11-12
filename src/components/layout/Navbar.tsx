import { NavbarClient } from './NavbarClient';
import { createClient } from '@/lib/supabase/server';

export async function Navbar() {
  const { data: session } = await createClient().auth.getSession();
  
  return (
    <nav className="border-b border-gray-200 fixed w-full bg-white z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <NavbarClient session={session?.session} />
        </div>
      </div>
    </nav>
  );
} 