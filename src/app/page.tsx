import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';

export const metadata = {
  title: 'Core Web Vitals Analyzer',
  description: 'Analyze and track Total Blocking Time (TBT) metrics for your web applications.',
};

export default async function HomePage() {
  const { data: session } = await createClient().auth.getSession();
  const isLoggedIn = !!session.session;

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Core Web Vitals Analyzer - β
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Analyze Core Web Vitals metricsto optimize your web performance.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              TBT Inspector
            </h2>
            <p className="text-gray-600 mb-4">
              Run instant TBT analysis on any URL. Measure page performance and identify blocking tasks.
            </p>
            <div className="mt-4">
              <Link 
                href="/analysis/tbt/inspect"
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary-500 hover:bg-primary-600 transition-colors"
              >
                Start Inspection
              </Link>
            </div>
          </div>

          <div className={`bg-white rounded-lg shadow-md p-6 ${isLoggedIn ? 'hover:shadow-lg' : 'opacity-75'} transition-shadow`}>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              TBT Analytics
            </h2>
            <p className="text-gray-600 mb-4">
              Compare TBT metrics between different URLs with statistical analysis and visual distributions.
            </p>
            <div className="mt-4">
              {isLoggedIn ? (
                <Link 
                  href="/analysis/tbt/analyze"
                  className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary-500 hover:bg-primary-600 transition-colors"
                >
                  View Analytics
                </Link>
              ) : (
                <div className="text-sm text-red-500">
                  Sign in to access analytics features
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Why Use Core Web Vitals Analyzer?
          </h2>
          <div className="grid gap-6 md:grid-cols-3 text-left">
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Real-time Analysis</h3>
              <p className="text-gray-600">Get instant TBT measurements for any webpage</p>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Statistical Insights</h3>
              <p className="text-gray-600">Compare performance across different versions or pages</p>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Performance Tracking</h3>
              <p className="text-gray-600">Monitor TBT changes over time with saved records</p>
            </div>
          </div>
        </div>

        <footer className="mt-16 text-center text-gray-500">
          <p>
            Built to help developers optimize web performance and improve user experience.
          </p>
        </footer>
      </main>
    </div>
  );
}