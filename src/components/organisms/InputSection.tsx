import clsx from 'clsx';
import { ChangeEvent, useEffect, useState } from 'react';

import Button from '@/components/atoms/buttons/Button';

interface DateTimeFormatOptions {
  localeMatcher?: 'best fit' | 'lookup';
  weekday?: 'narrow' | 'short' | 'long';
  era?: 'narrow' | 'short' | 'long';
  year?: 'numeric' | '2-digit';
  month?: 'numeric' | '2-digit' | 'narrow' | 'short' | 'long';
  day?: 'numeric' | '2-digit';
  hour?: 'numeric' | '2-digit';
  minute?: 'numeric' | '2-digit';
  second?: 'numeric' | '2-digit';
  timeZoneName?: 'short' | 'long';
  formatMatcher?: 'best fit' | 'basic';
  hour12?: boolean;
  timeZone?: string;
}

interface PagespeedApiRes {
  analysisUTCTimestamp: string;
  id: string; // Website URL
  lighthouseResult: {
    timing: number;
    audits: {
      'total-blocking-time': TbtResult;
    };
  };
}

interface TbtResult {
  description: 'Sum of all time periods between FCP and Time to Interactive, when task length exceeded 50ms, expressed in milliseconds. [Learn more about the Total Blocking Time metric](https://developer.chrome.com/docs/lighthouse/performance/lighthouse-total-blocking-time/).';
  displayValue: `${number} ms`;
  id: 'total-blocking-time';
  numericUnit: 'millisecond';
  numericValue: number;
  score: number;
  scoreDisplayMode: 'numeric';
  title: 'Total Blocking Time';
}

interface TbtItem {
  timeStamp: string;
  result: TbtResult;
}

export const InputSection = () => {
  const [url, setUrl] = useState('');
  const [tbts, setTbts] = useState<TbtItem[]>([]);
  const [timer, setTimer] = useState<number>(0);
  const [scan, setScan] = useState(false);
  const [numOfRecords, setNumOfRecords] = useState(1);
  const [showTimestamp, setShowTimestamp] = useState(true);

  const resetRecords = () => {
    setTbts([]);
    setTimer(0);
  };

  const changeNumOfRecords = (el: ChangeEvent<HTMLInputElement>) => {
    const inputNum = Number(el.target.value);
    if (inputNum > 0 && inputNum <= 100) {
      setNumOfRecords(inputNum);
    }
  };

  useEffect(() => {
    const getTbt = async () => {
      // console.log(`Scan start [${tbts.length + 1}/${numOfRecords}]`)
      const queryOptions = {
        url: 'https://canadiantrainvacations.com/',
        category: 'performance',
        strategy: 'mobile',
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

    let getTbtInterval: NodeJS.Timer | undefined = undefined;

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
  }, [tbts, scan, numOfRecords]);

  return (
    <section className='p-8'>
      <div className='mb-4'>
        <h2>TBT Inspector</h2>
        {/* <p className="text-red-500">* You can get a result about once in a minute.</p> */}
      </div>
      <div className='mb-4 grid gap-2'>
        <label htmlFor='urlInput'>URL:</label>
        <input
          id='urlInput'
          className='w-full'
          type='text'
          value={url}
          onChange={(el) => setUrl(el.target.value)}
          disabled={scan}
        />
        <label htmlFor='numOfRecords'>
          Number of Records (min=1, max=100):
        </label>
        <input
          id='numOfRecords'
          type='number'
          value={numOfRecords}
          onChange={changeNumOfRecords}
          disabled={scan}
        />
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
      </div>
      <div className='mb-4 border-2'>
        <table className='w-full'>
          <tbody>
            <tr
              className={clsx(
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
                className={clsx(
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
          <p>Scanning the page in {timer} sec</p>
        </div>
      )}
      {tbts.length > 0 && !scan && (
        <div className='grid justify-center gap-2 border-2 p-4'>
          <p>
            Took {timer} seconds to get{' '}
            {tbts.length > numOfRecords ? numOfRecords : tbts.length} records
          </p>
          <div className='text-center'>
            <Button variant='ghost' onClick={resetRecords}>
              Reset Records
            </Button>
          </div>
        </div>
      )}
    </section>
  );
};

export default InputSection;

// if (scan) {
//   (async () => {
//     let count = 0;
//     while (count < numOfRecords) {
//       console.log(`Scan start [${count + 1}/${numOfRecords}]`)
//       const options = {
//         url: "https://canadiantrainvacations.com/",
//         category: "performance",
//         strategy: "mobile",
//       };

//       const queryParams = new URLSearchParams(options);

//       try {
//         const result: PagespeedApiRes = await fetch(`https://www.googleapis.com/pagespeedonline/v5/runPagespeed?${queryParams}`).then(res => res.json());

//         console.log('result: ', result);

//         const tbtResult = {
//           timeStamp: result.analysisUTCTimestamp,
//           result: result.lighthouseResult.audits['total-blocking-time']
//         };

//         console.log('tbtResult: ', tbtResult);

//         setTbts((prev) => {
//           const isExist = prev.find((item) => item.timeStamp === tbtResult.timeStamp);
//           return isExist ? prev : [...prev, tbtResult]
//         })
//       } catch (error) {
//         console.error(error);
//         break;
//       }
//       count++;
//       console.log(`Scan completed [${count}/${numOfRecords}]`);
//     } // while loop end
//     setScan(false);
//   })()
// }
