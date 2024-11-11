'use client';

import { useRouter } from 'next/navigation';
import { Session } from '@supabase/supabase-js';
import { useState } from 'react';
import { useOrganizationStore } from '@/store/organizationStore';
import { LoadingOverlay } from '@/components/ui/LoadingOverlay';
import { signout } from '@/app/auth/actions';

export function NavbarClient({ session }: { session: Session | null }) {
  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    try {
      setIsSigningOut(true);
      await signout();
      useOrganizationStore.getState().reset();
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsSigningOut(false);
    }
  };

  const handleSignIn = () => {
    router.push('/auth/signin');
  };

  return (
    <>
      {isSigningOut && <LoadingOverlay message="Signing out..." />}
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
    </>
  );
} 