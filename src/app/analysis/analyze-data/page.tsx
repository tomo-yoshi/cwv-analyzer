import Link from 'next/link';
import { ArrowRight, BarChart2, GitCompare } from 'lucide-react';

export default function AnalyzeDataPage() {
  return (
    <div className='p-8'>
      <div className='mb-8'>
        <h1 className='text-2xl font-bold'>Analyze Data</h1>
        <p className='text-gray-600 mt-2'>Choose how you want to analyze your PageSpeed data</p>
      </div>

      <div className='grid md:grid-cols-2 gap-6'>
        {/* Single Data Analysis Card */}
        <Link 
          href="/analysis/analyze-data/single"
          className='group border rounded-lg p-6 hover:border-primary-500 transition-colors'
        >
          <div className='flex items-center gap-4 mb-4'>
            <div className='p-3 rounded-lg bg-primary-50 text-primary-500'>
              <BarChart2 className='w-6 h-6' />
            </div>
            <h2 className='text-xl font-semibold'>Single Data Analysis</h2>
            <ArrowRight className='w-5 h-5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity' />
          </div>
          <p className='text-gray-600'>
            Analyze a single dataset in detail. View comprehensive metrics, trends, and insights 
            from your PageSpeed tests. Perfect for understanding the performance characteristics 
            of a single URL or testing session.
          </p>
          <ul className='mt-4 text-sm text-gray-500 space-y-2'>
            <li>• Detailed metric breakdowns</li>
            <li>• Statistical analysis</li>
            <li>• Visual data representations</li>
          </ul>
        </Link>

        {/* Comparative Analysis Card */}
        <Link 
          href="/analysis/analyze-data/compare"
          className='group border rounded-lg p-6 hover:border-primary-500 transition-colors'
        >
          <div className='flex items-center gap-4 mb-4'>
            <div className='p-3 rounded-lg bg-primary-50 text-primary-500'>
              <GitCompare className='w-6 h-6' />
            </div>
            <h2 className='text-xl font-semibold'>Comparative Analysis</h2>
            <ArrowRight className='w-5 h-5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity' />
          </div>
          <p className='text-gray-600'>
            Compare two different datasets side by side. Ideal for analyzing performance 
            differences between different versions of a page, or comparing performance 
            across different URLs.
          </p>
          <ul className='mt-4 text-sm text-gray-500 space-y-2'>
            <li>• Side-by-side metric comparison</li>
            <li>• Difference analysis</li>
            <li>• Performance impact visualization</li>
            <li>• Comparative statistical insights</li>
          </ul>
        </Link>
      </div>
    </div>
  );
}