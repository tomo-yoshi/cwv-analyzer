import Link from 'next/link';
import { ArrowRight, Globe, History } from 'lucide-react';

export default function CollectDataPage() {
  return (
    <div className='p-8'>
      <div className='mb-8'>
        <h1 className='text-2xl font-bold'>Collect Data</h1>
        <p className='text-gray-600 mt-2'>
          Choose how you want to collect PageSpeed data
        </p>
      </div>

      <div className='grid md:grid-cols-2 gap-6'>
        {/* Single URL Collection Card */}
        <Link
          href='/analysis/collect-data/scan-page'
          className='group border rounded-lg p-6 hover:border-primary-500 transition-colors'
        >
          <div className='flex items-center gap-4 mb-4'>
            <div className='p-3 rounded-lg bg-primary-50 text-primary-500'>
              <Globe className='w-6 h-6' />
            </div>
            <h2 className='text-xl font-semibold'>Single URL Collection</h2>
            <ArrowRight className='w-5 h-5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity' />
          </div>
          <p className='text-gray-600'>
            Collect PageSpeed data for a single URL. Run multiple tests to
            gather comprehensive performance metrics and ensure reliable results
            through repeated measurements.
          </p>
          <ul className='mt-4 text-sm text-gray-500 space-y-2'>
            <li>• Multiple test runs</li>
            <li>• Detailed performance metrics</li>
            <li>• Mobile and desktop testing</li>
          </ul>
        </Link>

        {/* Batch Collection Card */}
        <Link
          href='/analysis/collect-data/scan-website'
          className='group border rounded-lg p-6 hover:border-primary-500 transition-colors'
        >
          <div className='flex items-center gap-4 mb-4'>
            <div className='p-3 rounded-lg bg-primary-50 text-primary-500'>
              <History className='w-6 h-6' />
            </div>
            <h2 className='text-xl font-semibold'>Batch Collection</h2>
            <ArrowRight className='w-5 h-5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity' />
          </div>
          <p className='text-gray-600'>
            Test multiple URLs in a single batch. Perfect for analyzing entire
            websites or comparing performance across different pages
            simultaneously.
          </p>
          <ul className='mt-4 text-sm text-gray-500 space-y-2'>
            <li>• Multiple URL testing</li>
            <li>• Bulk data collection</li>
          </ul>
        </Link>
      </div>
    </div>
  );
}
