import RunPageSpeedTest from '@/app/analysis/collect-data/RunPageSpeedTest';

export default async function TbtPage() {
  return (
    <div className='p-8'>
      <div className='mb-6'>
        <h1 className='text-2xl font-bold mb-2'>Collect Data</h1>
        <p>
          🚨 If you <span className='font-bold'>leave</span> or{' '}
          <span className='font-bold'>refresh</span> this page before saving
          your data or while a test is in progress,{' '}
          <span className='font-bold'>your test results will be lost.</span>
        </p>
      </div>
      <RunPageSpeedTest />
    </div>
  );
}
