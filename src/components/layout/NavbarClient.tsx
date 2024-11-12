'use client';

import { Session } from '@supabase/supabase-js';
import { useState } from 'react';
import { useOrgAndProjStore } from '@/store/orgAndProjStore';
import { LoadingOverlay } from '@/components/ui/LoadingOverlay';
import { signout } from '@/app/auth/actions';
import Link from 'next/link';
import { useInitialState } from '@/hooks/useInitialState';

export function NavbarClient({ session }: { session: Session | null }) {
  const [isSigningOut, setIsSigningOut] = useState(false);
  useInitialState();

  const handleSignOut = async () => {
    try {
      setIsSigningOut(true);
      await signout();
      useOrgAndProjStore.getState().reset();
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <>
      {isSigningOut && <LoadingOverlay message="Signing out..." />}
      <div className="flex items-center">
        {!session ? (
          <div className="flex gap-4">
            <Link
              href="/auth/signin"
              className="text-primary-600 border-1 solid border-primary-600 px-4 py-2 rounded-md hover:bg-primary-100"
            >
              Sign in
            </Link>
            <Link
              href="/auth/signup"
              className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700"
            >
              Sign up
            </Link>
          </div>
        ) : (
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
        )}
      </div>
    </>
  );
} 