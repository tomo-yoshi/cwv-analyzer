'use client';

import { useState } from 'react';
import Link from 'next/link';
import { HiHome, HiClock, HiOfficeBuilding } from 'react-icons/hi';
import clsx from 'clsx';
import { createClient } from '@/lib/supabase/client';
import { Session } from '@supabase/supabase-js';
export function Sidebar() {
  const [session, setSession] = useState<Session | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const supabase = createClient();
  supabase.auth.getSession().then(({ data: { session } }) => {
    setSession(session);
  });

  const menuItems = [
    { 
      name: 'Home', 
      href: '/', 
      icon: HiHome 
    },
    ...(session ? [
      { 
        name: 'Organization', 
        href: '/organization', 
        icon: HiOfficeBuilding 
      }
    ] : []),
    { 
      name: 'TBT Inspector', 
      href: '/analysis/tbt', 
      icon: HiClock 
    }
  ];

  return (
    <div
      className="fixed left-0 top-16 h-full z-40 transition-all duration-300 ease-in-out"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={clsx(
          'h-full bg-white border-r shadow-lg transition-all duration-300 overflow-hidden',
          isHovered ? 'w-60' : 'w-16'
        )}
      >
        <nav className="py-6 px-5">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex h-12 items-center text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center justify-center w-16 h-full">
                <item.icon className="w-6 h-6" />
              </div>
              <span 
                className={clsx(
                  'whitespace-nowrap font-medium transition-opacity duration-300',
                  isHovered ? 'opacity-100' : 'opacity-0'
                )}
              >
                {item.name}
              </span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}

function useAuth(): { session: any; } {
  throw new Error('Function not implemented.');
}
