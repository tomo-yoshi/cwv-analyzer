'use client';

import { useState } from 'react';
import Link from 'next/link';
import { HiHome, HiClock, HiCog } from 'react-icons/hi';
import clsx from 'clsx';
import { Session } from '@supabase/supabase-js';

interface SidebarClientProps {
  initialSession: Session | null;
}

export function SidebarClient({ initialSession }: SidebarClientProps) {
  const [isHovered, setIsHovered] = useState(false);

  const menuItems = [
    { 
      name: 'Home', 
      href: '/', 
      icon: HiHome 
    },
    { 
      name: 'TBT Inspector', 
      href: '/analysis/tbt', 
      icon: HiClock 
    },
    ...(initialSession ? [
      { 
        name: 'Settings', 
        href: '/settings',
        class: '',
        icon: HiCog
      },
    ] : [])
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
          isHovered ? 'w-56' : 'w-16'
        )}
      >
        <nav className="py-6 px-5 grid items-start">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex h-12 items-center text-gray-700 transition-colors hover:text-primary-500"
            >
              <div
                className={clsx(
                  "flex items-center justify-center",
                  item.class
                )}
                >
                <item.icon className="w-6 h-6" />
              </div>
              <span 
                className={clsx(
                  'whitespace-nowrap font-medium transition-opacity duration-300 pl-4',
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
