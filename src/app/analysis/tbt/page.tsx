import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { ArrowRight, Search, BarChart2 } from 'lucide-react';

interface AnalyzeRecordsCardProps {
  isLoggedIn: boolean;
  href: string;
}

export function AnalyzeRecordsCard({ isLoggedIn, href }: AnalyzeRecordsCardProps) {
  const content = {
    title: 'Analyze Records',
    description: 'Compare and analyze TBT records with interactive charts and detailed metrics. Gain insights into your page\'s performance over time.',
    features: [
      'Interactive visualizations',
      'Historical data analysis',
      'Performance trending',
      'Detailed metric insights'
    ]
  };

  const commonContent = (
    <>
      <div className="flex items-center gap-4 mb-4">
        <div className={`p-3 rounded-lg ${
          isLoggedIn ? 'bg-primary-50 text-primary-500' : 'bg-gray-100 text-gray-400'
        }`}>
          <BarChart2 className="w-6 h-6" />
        </div>
        <h2 className={`text-xl font-semibold ${
          isLoggedIn ? '' : 'text-gray-400'
        }`}>{content.title}</h2>
        {isLoggedIn && (
          <ArrowRight className="w-5 h-5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
        )}
      </div>
      <p className={isLoggedIn ? 'text-gray-600' : 'text-gray-500'}>
        {content.description}
      </p>
      <ul className={`mt-4 text-sm ${
        isLoggedIn ? 'text-gray-500' : 'text-gray-400'
      } space-y-2`}>
        {content.features.map((feature, index) => (
          <li key={index}>• {feature}</li>
        ))}
      </ul>
      {!isLoggedIn && (
        <p className="text-sm text-red-500 mt-4">
          Please log in to access this feature
        </p>
      )}
    </>
  );

  if (!isLoggedIn) {
    return (
      <div className="border rounded-lg p-6 bg-gray-50">
        {commonContent}
      </div>
    );
  }

  return (
    <Link 
      href={href}
      className="group border rounded-lg p-6 hover:border-primary-500 transition-colors"
    >
      {commonContent}
    </Link>
  );
}

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