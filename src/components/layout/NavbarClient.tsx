'use client';

import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Session } from '@supabase/supabase-js';
import { useState } from 'react';

export function NavbarClient() {
  const [session, setSession] = useState<Session | null>(null);
  const router = useRouter();
  const supabase = createClient();
    supabase.auth.getSession().then(({ data: { session } }) => {
    setSession(session);
  });


  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Error signing out:', error);
        return;
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSignIn = () => {
    router.push('/auth/signin');
  };

  return (
    <div className="flex items-center">
      {session ? (
        <div className="flex items-center space-x-4">
          <span className="text-gray-700">
            Hello {session.user.user_metadata.first_name}!
          </span>
          <button
            onClick={handleSignOut}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Sign out
          </button>
        </div>
      ) : (
        <button
          onClick={handleSignIn}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Sign in
        </button>
      )}
    </div>
  );
} 