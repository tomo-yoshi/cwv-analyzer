import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { Activity, ArrowRight, BarChart2, LineChart, Search } from 'lucide-react';

export const metadata = {
  title: 'Core Web Vitals Analyzer',
  description: 'Analyze and track Core Web Vitals metrics for your web applications.',
};

export default async function HomePage() {
  const { data: session } = await createClient().auth.getSession();
  const isLoggedIn = !!session.session;

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-6xl mx-auto pl-8 pr-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Core Web Vitals Analyzer - β
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Comprehensive analysis of Core Web Vitals metrics to optimize your web performance.
          </p>
        </div>

        {/* TBT Analysis Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 px-2">TBT Analysis</h2>
          <div className="grid gap-8 md:grid-cols-2">
            <Link 
              href="/analysis/tbt/inspect"
              className="group border rounded-lg p-6 hover:border-primary-500 transition-colors"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-lg bg-primary-50 text-primary-500">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold">TBT Test</h3>
                <ArrowRight className="w-5 h-5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-gray-600">
                Run instant TBT analysis on any URL. Compare TBT metrics between different URLs in real-time.
              </p>
              <ul className="mt-4 text-sm text-gray-500 space-y-2">
                <li>• Real-time TBT analysis</li>
                <li>• Multiple URL testing</li>
                <li>• Save and track results</li>
              </ul>
            </Link>

            <div className={isLoggedIn ? 
              "group border rounded-lg p-6 hover:border-primary-500 transition-colors" : 
              "border rounded-lg p-6 bg-gray-50"
            }>
              <div className="flex items-center gap-4 mb-4">
                <div className={`p-3 rounded-lg ${
                  isLoggedIn ? 'bg-primary-50 text-primary-500' : 'bg-gray-100 text-gray-400'
                }`}>
                  <BarChart2 className="w-6 h-6" />
                </div>
                <h3 className={`text-xl font-semibold ${isLoggedIn ? '' : 'text-gray-400'}`}>
                  TBT Analytics
                </h3>
                {isLoggedIn && (
                  <ArrowRight className="w-5 h-5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                )}
              </div>
              <p className={isLoggedIn ? 'text-gray-600' : 'text-gray-500'}>
                Compare and analyze TBT records with interactive charts and detailed metrics.
              </p>
              <ul className={`mt-4 text-sm ${isLoggedIn ? 'text-gray-500' : 'text-gray-400'} space-y-2`}>
                <li>• Interactive visualizations</li>
                <li>• Historical data analysis</li>
                <li>• Performance trending</li>
                <li>• Detailed metric insights</li>
              </ul>
              {!isLoggedIn && (
                <p className="text-sm text-red-500 mt-4">
                  Please log in to access this feature
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Collect Data Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 px-2">Collect Data</h2>
          <div className="grid gap-8">
            <Link 
              href="/analysis/collect-data"
              className="group border rounded-lg p-6 hover:border-primary-500 transition-colors"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-lg bg-primary-50 text-primary-500">
                  <Activity className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold">PageSpeed Test</h3>
                <ArrowRight className="w-5 h-5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-gray-600">
                Run comprehensive PageSpeed tests with detailed metrics for both mobile and desktop platforms.
              </p>
              <ul className="mt-4 text-sm text-gray-500 space-y-2">
                <li>• Mobile and desktop testing</li>
                <li>• Multiple URL support</li>
                <li>• Detailed performance metrics</li>
                <li>• Save results for analysis</li>
              </ul>
            </Link>
          </div>
        </div>

        {/* Analyze Saved Data Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 px-2">Analyze Saved Data</h2>
          <div className="grid gap-8">
            <div className={isLoggedIn ? 
              "group border rounded-lg p-6 hover:border-primary-500 transition-colors" : 
              "border rounded-lg p-6 bg-gray-50"
            }>
              <div className="flex items-center gap-4 mb-4">
                <div className={`p-3 rounded-lg ${
                  isLoggedIn ? 'bg-primary-50 text-primary-500' : 'bg-gray-100 text-gray-400'
                }`}>
                  <LineChart className="w-6 h-6" />
                </div>
                <h3 className={`text-xl font-semibold ${isLoggedIn ? '' : 'text-gray-400'}`}>
                  PageSpeed Analytics
                </h3>
                {isLoggedIn && (
                  <ArrowRight className="w-5 h-5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                )}
              </div>
              <p className={isLoggedIn ? 'text-gray-600' : 'text-gray-500'}>
                Analyze saved PageSpeed test results with AI-powered insights and detailed metrics comparison.
              </p>
              <ul className={`mt-4 text-sm ${isLoggedIn ? 'text-gray-500' : 'text-gray-400'} space-y-2`}>
                <li>• AI-powered analysis</li>
                <li>• Performance comparison</li>
                <li>• Historical trends</li>
                <li>• Detailed metric breakdowns</li>
              </ul>
              {!isLoggedIn && (
                <p className="text-sm text-red-500 mt-4">
                  Please log in to access this feature
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}