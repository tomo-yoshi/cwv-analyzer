import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';

export default async function TbtPage() {
  const { data: session } = await createClient().auth.getSession();
  const isLoggedIn = !!session.session;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Total Blocking Time Analysis</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link 
          href="/analysis/tbt/inspect"
          className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-primary-500 transition-colors"
        >
          <h2 className="text-xl font-semibold mb-2">Inspect Page</h2>
          <p className="text-gray-600">
            Run TBT analysis on specific URLs and save the results
          </p>
        </Link>

        {isLoggedIn ? (
          <Link 
            href="/analysis/tbt/analyze"
            className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-primary-500 transition-colors"
          >
            <h2 className="text-xl font-semibold mb-2">Analyze Records</h2>
            <p className="text-gray-600">
              Compare and analyze TBT records with interactive charts
            </p>
          </Link>
        ) : (
          <div className="block p-6 bg-gray-50 rounded-lg border border-gray-200">
            <h2 className="text-xl font-semibold mb-2 text-gray-400">Analyze Records</h2>
            <p className="text-gray-500">
              Compare and analyze TBT records with interactive charts
            </p>
            <p className="text-sm text-red-500 mt-2">
              Please log in to access this feature
            </p>
          </div>
        )}
      </div>
    </div>
  );
}