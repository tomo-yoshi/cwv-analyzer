import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

import Button from '@/components/atoms/buttons/Button';
import Select from '@/components/atoms/selects/Select'; 
import CombinedInput from '@/components/molecules/CombinedInput';

import type{ DateTimeFormatOptions } from '@/types';
import type { PagespeedApiRes, TbtItem } from '@/types/pagespeed';


interface TBTConfigProps {
  heading?: string;
}

export const TBTConfig = ({ heading }: TBTConfigProps) => {
  const [url, setUrl] = useState('');
  const [strategy, setStrategy] = useState<'mobile' | 'desktop'>('mobile');
  const [tbts, setTbts] = useState<TbtItem[]>([]);
  const [timer, setTimer] = useState(0);
  const [scan, setScan] = useState(false);
  const [numOfRecords, setNumOfRecords] = useState(1);
  const [showTimestamp, setShowTimestamp] = useState(true);

  const handleResetRecords = () => {
    if (window.confirm('Are you sure you want to reset all records?')) {
      setTbts([]);
      setTimer(0);
    }
  };

  useEffect(() => {
    if (!scan) {
      return;
    } else if (!numOfRecords) {
      alert('Invalid Number of Records');
      return;
    }

    const getTbt = async () => {
      // console.log(`Scan start [${tbts.length + 1}/${numOfRecords}]`)
      const queryOptions = {
        url: 'https://canadiantrainvacations.com/',
        category: 'performance',
        strategy: strategy,
      };

      const queryParams = new URLSearchParams(queryOptions);

      try {
        const result: PagespeedApiRes = await fetch(
          `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?${queryParams}`
        ).then((res) => res.json());

        const timestamp = result.analysisUTCTimestamp;

        // Convert the timestamp to a Date object
        const date = new Date(timestamp);

        // Format the date to Vancouver local time
        const timestampOptions: DateTimeFormatOptions = {
          weekday: undefined,
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          timeZone: 'America/Vancouver',
          timeZoneName: 'short',
        };
        const vancouverTime = date.toLocaleString('en-US', timestampOptions);

        const tbtResult = {
          timeStamp: vancouverTime,
          result: result.lighthouseResult.audits['total-blocking-time'],
        };

        // console.log('tbtResult: ', tbtResult);

        setTbts((prev) => {
          const isExist = prev.find(
            (item) => item.timeStamp === tbtResult.timeStamp
          );
          return isExist ? prev : [...prev, tbtResult];
        });
      } catch (error) {
        // console.error(error);
      }
      // console.log(`Scan completed [${tbts.length + 1}/${numOfRecords}]`);
    };

    let getTbtInterval: NodeJS.Timeout | undefined = undefined;

    if (scan) {
      getTbt();
      getTbtInterval = setInterval(getTbt, 63000);
    }

    const initTimer = () => {
      setTimer((prev) => (prev += 1));
    };
    const timerInterval = scan ? setInterval(initTimer, 1000) : undefined;

    if (!scan || tbts.length === numOfRecords) {
      clearInterval(getTbtInterval);
      clearInterval(timerInterval);
      setScan(false);
      return;
    }

    return () => {
      clearInterval(getTbtInterval);
      clearInterval(timerInterval);
    };
  }, [tbts, scan, numOfRecords, strategy]);

  return (
    <div className='p-4'>
      {heading && (
        <h2 className='text-xl font-semibold mb-4'>{heading}</h2>
      )}
      <div className='mb-4 grid gap-1'>
        <CombinedInput
          label="URL Input"
          placeholder="Enter a URL"
          value={url}
          onChange={(value) => setUrl(String(value))}
          type="text"
        />
        <div className='grid grid-cols-2 gap-4'>  {/* New wrapper div */}
          <CombinedInput
            label="Number Records (1-100)"
            placeholder="Enter a number"
            value={numOfRecords}
            onChange={(value) => setNumOfRecords(Number(value))}
            type="number"
            min={1}
            max={100}
          />
          <Select
            label="Strategy"
            value={strategy}
            onChange={(value) => setStrategy(value as 'mobile' | 'desktop')}
            options={[
              { value: 'mobile', label: 'Mobile' },
              { value: 'desktop', label: 'Desktop' }
            ]}
          />
        </div>
      </div>
      <div className='mb-4 flex gap-4'>
        <Button
          variant='primary'
          isLoading={scan}
          disabled={scan}
          onClick={() => setScan(true)}
        >
          Start the Scan
        </Button>
        <Button
          variant='outline'
          disabled={!scan}
          onClick={() => setScan(false)}
        >
          Stop the Scan
        </Button>
        <Button
          variant='outline'
          disabled={tbts.length === 0}
          onClick={handleResetRecords}
        >
          Reset Records
        </Button>
      </div>
      <div className='mb-4 border-2'>
        <table className='w-full'>
          <tbody>
            <tr
              className={cn(
                'border-b-2 grid',
                showTimestamp ? 'grid-cols-2' : 'grid-cols-1'
              )}
            >
              {showTimestamp && <th>Timestamp</th>}
              <th>TBT (ms)</th>
            </tr>
            {tbts.slice(0, numOfRecords).map((item) => (
              <tr
                key={item?.timeStamp}
                className={cn(
                  'border-b-2 grid',
                  showTimestamp ? 'grid-cols-2' : 'grid-cols-1'
                )}
              >
                {showTimestamp && (
                  <td className='text-center'>{item?.timeStamp}</td>
                )}
                <td className='text-center'>
                  {Math.floor(item?.result.numericValue)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Button
          variant='ghost'
          onClick={() => setShowTimestamp((prev) => !prev)}
        >
          {showTimestamp ? 'Hide Timestamp' : 'Show Timestamp'}
        </Button>
      </div>
      {scan && (
        <div>
          <p>Scan Progress...{`[${tbts.length}/${numOfRecords}]`}</p>
          <p>Scanning the page for {timer} sec</p>
        </div>
      )}
      {tbts.length > 0 && !scan && (
        <div className='grid justify-center gap-2 border-2 p-4'>
          <p>
            Took {timer} seconds to get{' '}
            {tbts.length > numOfRecords ? numOfRecords : tbts.length} records
          </p>
        </div>
      )}
    </div>
  );
};

export default TBTConfig;
