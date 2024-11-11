'use client';

import { NavbarClient } from './NavbarClient';
import { ProjectSelector } from '../ProjectSelector';

export function Navbar() {
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
          <NavbarClient />
        </div>
      </div>
    </nav>
  );
} 