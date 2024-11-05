import Link from 'next/link';
import * as React from 'react';
import '@/lib/env';

export const metadata = {
  title: 'Core Web Vitals Analyzer',
  description: 'Analyze Core Web Vitals metrics to optimize your web performance.',
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Core Web Vitals Analyzer
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Analyze Core Web Vitals metricsto optimize your web performance.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-1">
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              Total Blocking Time (TBT) Inspector
            </h2>
            <p className="text-gray-600 mb-4">
              Compare TBT metrics between two URLs with statistical analysis and visual distributions. 
              Identify performance bottlenecks and validate improvements in your web applications.
            </p>
            <div className="mt-4">
              <Link 
                href="/tbt-inspector"
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary-500 hover:bg-primary-600 transition-colors"
              >
                Open TBT Inspector
              </Link>
            </div>
          </div>

          {/* Placeholder for future features */}
          <div className="bg-gray-100 rounded-lg p-6 border-2 border-dashed border-gray-300">
            <h2 className="text-xl font-semibold text-gray-500 mb-2">
              More Features Coming Soon
            </h2>
            <p className="text-gray-500">
              We're working on additional tools to help you analyze other Core Web Vitals metrics.
            </p>
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
