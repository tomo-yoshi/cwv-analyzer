import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { ArrowRight, Search } from 'lucide-react';
import { AnalyzeRecordsCard } from '@/components/AnalyzeRecordsCard';

export default async function TbtPage() {
  const { data: session } = await createClient().auth.getSession();
  const isLoggedIn = !!session.session;

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Total Blocking Time Analysis</h1>
        <p className="text-gray-600 mt-2">Analyze and track Total Blocking Time metrics for your pages</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <Link 
          href="/analysis/tbt/inspect"
          className="group border rounded-lg p-6 hover:border-primary-500 transition-colors"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-lg bg-primary-50 text-primary-500">
              <Search className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-semibold">Inspect Page</h2>
            <ArrowRight className="w-5 h-5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <p className="text-gray-600">
            Run TBT analysis on specific URLs and save the results for future reference.
            Track how your pages perform in terms of blocking time.
          </p>
          <ul className="mt-4 text-sm text-gray-500 space-y-2">
            <li>• Real-time TBT analysis</li>
            <li>• Multiple URL testing</li>
            <li>• Save and track results</li>
          </ul>
        </Link>

        <AnalyzeRecordsCard 
          isLoggedIn={isLoggedIn}
          href="/analysis/tbt/analyze"
        />
      </div>
    </div>
  );
}