'use client';

import { useState } from 'react';
import { XMLParser } from 'fast-xml-parser';
import Button from '@/components/atoms/buttons/Button';
import Input from '@/components/atoms/inputs/Input';
import { Loader2 } from 'lucide-react';
import { Switch } from '@/components/atoms/switches/Switch';

interface SitemapURL {
  loc: string;
  selected: boolean;
  result?: {
    loading: boolean;
    data?: any;
    error?: string;
  };
}

interface MetricThresholds {
  good: number;
  poor: number;
  unit: 'seconds' | 'score' | 'milliseconds' | 'raw';
}

const metricThresholds: Record<string, MetricThresholds> = {
  'first-contentful-paint': { good: 1.8, poor: 3.0, unit: 'seconds' },
  'largest-contentful-paint': { good: 2.5, poor: 4.0, unit: 'seconds' },
  'total-blocking-time': { good: 200, poor: 600, unit: 'milliseconds' },
  'cumulative-layout-shift': { good: 0.1, poor: 0.25, unit: 'raw' },
  'speed-index': { good: 3.4, poor: 5.8, unit: 'seconds' },
  performance: { good: 0.9, poor: 0.5, unit: 'score' },
};

const getMetricColor = (metricId: string, value: number): string => {
  const thresholds = metricThresholds[metricId];
  if (!thresholds) return '';

  // Convert value to the correct unit for comparison
  let normalizedValue = value;
  if (thresholds.unit === 'seconds' && value > 100) {
    // Assuming the value is in ms if > 100
    normalizedValue = value / 1000;
  }

  if (metricId === 'performance') {
    if (value >= thresholds.good) return 'text-green-600';
    if (value >= thresholds.poor) return 'text-yellow-600';
    return 'text-red-600';
  } else {
    if (normalizedValue <= thresholds.good) return 'text-green-600';
    if (normalizedValue <= thresholds.poor) return 'text-yellow-600';
    return 'text-red-600';
  }
};

const formatMetricValue = (metric: any) => {
  if (!metric) return '-';

  // Handle CLS separately as it doesn't need units
  if (metric.id === 'cumulative-layout-shift') {
    return metric.numericValue.toFixed(3);
  }

  // Convert milliseconds to seconds for timing metrics
  return `${(metric.numericValue / 1000).toFixed(2)}s`;
};

const chunkArray = <T,>(array: T[], size: number): T[][] => {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
};

// Helper function for delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default function ScanWebsitePage() {
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [sitemapUrls, setSitemapUrls] = useState<SitemapURL[]>([]);
  const [overrideBaseUrl, setOverrideBaseUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isConcurrentMode, setIsConcurrentMode] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  const [abortController, setAbortController] =
    useState<AbortController | null>(null);
  const [completedTests, setCompletedTests] = useState(0);

  const stopTests = () => {
    if (abortController) {
      abortController.abort();
      setAbortController(null);
      setIsRunning(false);
      setCompletedTests(0);
    }
  };

  const fetchSitemap = async () => {
    setLoading(true);
    setError('');
    try {
      // Construct sitemap URL
      const url = new URL(websiteUrl);
      const sitemapUrl = `${url.protocol}//${url.hostname}/sitemap.xml`;

      const response = await fetch(sitemapUrl);
      if (!response.ok) throw new Error('Failed to fetch sitemap');

      const xmlText = await response.text();
      const parser = new XMLParser();
      const result = parser.parse(xmlText);

      // Handle different sitemap structures
      const urls = result.urlset?.url || [];
      const formattedUrls: SitemapURL[] = (
        Array.isArray(urls) ? urls : [urls]
      ).map((url: any) => ({
        loc: url.loc,
        selected: false,
        result: undefined,
      }));

      setSitemapUrls(formattedUrls);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch sitemap');
    } finally {
      setLoading(false);
    }
  };

  const toggleUrlSelection = (index: number) => {
    setSitemapUrls((urls) =>
      urls.map((url, i) =>
        i === index ? { ...url, selected: !url.selected } : url
      )
    );
  };

  const runPageSpeedTests = async () => {
    const selectedUrls = sitemapUrls.filter((url) => url.selected);
    const controller = new AbortController();
    setAbortController(controller);
    setIsRunning(true);
    setCompletedTests(0);

    try {
      if (isConcurrentMode) {
        const urlChunks = chunkArray(selectedUrls, 10);

        for (const chunk of urlChunks) {
          if (controller.signal.aborted) {
            break;
          }

          const chunkPromises = chunk.map(async (url) => {
            const baseUrl = overrideBaseUrl
              ? overrideBaseUrl.endsWith('/')
                ? overrideBaseUrl.slice(0, -1)
                : overrideBaseUrl
              : new URL(url.loc).origin;
            const finalUrl = new URL(url.loc).pathname;
            const testUrl = `${baseUrl}${
              finalUrl.startsWith('/') ? finalUrl : `/${finalUrl}`
            }`;

            // Update URL status to loading
            setSitemapUrls((urls) =>
              urls.map((u) =>
                u.loc === url.loc ? { ...u, result: { loading: true } } : u
              )
            );

            try {
              const response = await fetch(
                `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(
                  testUrl
                )}&strategy=mobile`,
                { signal: controller.signal }
              );

              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }

              const data = await response.json();

              // Validate that we have the required data
              if (!data.lighthouseResult || !data.lighthouseResult.categories) {
                throw new Error('Invalid PageSpeed response data');
              }

              // Update URL with result
              setSitemapUrls((urls) =>
                urls.map((u) =>
                  u.loc === url.loc
                    ? { ...u, result: { loading: false, data } }
                    : u
                )
              );
              setCompletedTests((prev) => prev + 1);
            } catch (err: unknown) {
              if (err instanceof Error && err.name === 'AbortError') {
                setSitemapUrls((urls) =>
                  urls.map((u) =>
                    u.loc === url.loc
                      ? {
                          ...u,
                          result: {
                            loading: false,
                            error: 'Test cancelled',
                          },
                        }
                      : u
                  )
                );
              } else {
                setSitemapUrls((urls) =>
                  urls.map((u) =>
                    u.loc === url.loc
                      ? {
                          ...u,
                          result: {
                            loading: false,
                            error:
                              err instanceof Error
                                ? err.message
                                : 'Test failed',
                          },
                        }
                      : u
                  )
                );
              }
              setCompletedTests((prev) => prev + 1);
            }
          });

          // Wait for current chunk to complete
          await Promise.all(chunkPromises);

          // If there are more chunks, wait 5 seconds before processing the next chunk
          if (urlChunks.indexOf(chunk) < urlChunks.length - 1) {
            await delay(5000);
          }
        }
      } else {
        // Sequential mode remains the same
        for (const url of selectedUrls) {
          if (controller.signal.aborted) {
            break;
          }

          const baseUrl = overrideBaseUrl || new URL(url.loc).origin;
          const finalUrl = new URL(url.loc).pathname;
          const testUrl = `${baseUrl}${finalUrl}`;

          setSitemapUrls((urls) =>
            urls.map((u) =>
              u.loc === url.loc ? { ...u, result: { loading: true } } : u
            )
          );

          try {
            const response = await fetch(
              `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(
                testUrl
              )}&strategy=mobile`,
              { signal: controller.signal }
            );

            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            // Validate that we have the required data
            if (!data.lighthouseResult || !data.lighthouseResult.categories) {
              throw new Error('Invalid PageSpeed response data');
            }

            setSitemapUrls((urls) =>
              urls.map((u) =>
                u.loc === url.loc
                  ? { ...u, result: { loading: false, data } }
                  : u
              )
            );
            setCompletedTests((prev) => prev + 1);
          } catch (err: unknown) {
            if (err instanceof Error && err.name === 'AbortError') {
              setSitemapUrls((urls) =>
                urls.map((u) =>
                  u.loc === url.loc
                    ? {
                        ...u,
                        result: {
                          loading: false,
                          error: 'Test cancelled',
                        },
                      }
                    : u
                )
              );
            } else {
              setSitemapUrls((urls) =>
                urls.map((u) =>
                  u.loc === url.loc
                    ? {
                        ...u,
                        result: {
                          loading: false,
                          error:
                            err instanceof Error ? err.message : 'Test failed',
                        },
                      }
                    : u
                )
              );
            }
            setCompletedTests((prev) => prev + 1);
          }

          if (!controller.signal.aborted) {
            await delay(1000);
          }
        }
      }
    } finally {
      // Only reset if not aborted
      if (!controller.signal.aborted) {
        setIsRunning(false);
        setAbortController(null);
      }
    }
  };

  const getDisplayUrl = (originalUrl: string) => {
    if (!overrideBaseUrl) return originalUrl;

    try {
      const originalUrlObj = new URL(originalUrl);
      const baseUrl = overrideBaseUrl.endsWith('/')
        ? overrideBaseUrl.slice(0, -1)
        : overrideBaseUrl;
      const pathname = originalUrlObj.pathname.startsWith('/')
        ? originalUrlObj.pathname
        : `/${originalUrlObj.pathname}`;
      return `${baseUrl}${pathname}${originalUrlObj.search}${originalUrlObj.hash}`;
    } catch (err) {
      return originalUrl;
    }
  };

  const selectedCount = sitemapUrls.filter((url) => url.selected).length;

  return (
    <div className='flex-1'>
      <div className='w-full max-w-7xl mx-auto p-8'>
        <div className='space-y-6'>
          <div className='space-y-4'>
            <div className='flex gap-4'>
              <Input
                placeholder='Enter website URL'
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                className='flex-1'
              />
              <Button onClick={fetchSitemap} disabled={loading || !websiteUrl}>
                {loading ? (
                  <>
                    <Loader2 className='animate-spin mr-2' />
                    Loading...
                  </>
                ) : (
                  'Fetch Sitemap'
                )}
              </Button>
            </div>

            {error && <div className='text-red-500 text-sm'>{error}</div>}

            {sitemapUrls.length > 0 && (
              <div className='space-y-4'>
                <Input
                  placeholder='Override base URL (optional)'
                  value={overrideBaseUrl}
                  onChange={(e) => setOverrideBaseUrl(e.target.value)}
                />

                <div className='flex justify-between items-center'>
                  <div className='space-x-4 flex items-center'>
                    <div className='text-sm text-gray-600'>
                      {selectedCount} of {sitemapUrls.length} URLs selected
                    </div>
                    <div className='flex items-center space-x-2'>
                      <Switch
                        checked={isConcurrentMode}
                        onChange={setIsConcurrentMode}
                        aria-label='Scan mode toggle'
                      />
                      <span className='text-sm text-gray-600'>
                        {isConcurrentMode
                          ? 'Concurrent Mode'
                          : 'Sequential Mode'}
                      </span>
                    </div>
                  </div>
                  <Button
                    onClick={isRunning ? stopTests : runPageSpeedTests}
                    disabled={!sitemapUrls.some((url) => url.selected)}
                    variant={isRunning ? 'outline' : 'primary'}
                  >
                    {isRunning ? (
                      <>
                        {/* <Loader2 className="animate-spin mr-2 h-4 w-4" /> */}
                        Stop Tests
                      </>
                    ) : (
                      'Run PageSpeed Tests'
                    )}
                  </Button>
                </div>

                {isRunning && (
                  <div className='flex items-center justify-between bg-gray-50 p-4 rounded-lg'>
                    <div className='flex items-center gap-2'>
                      <Loader2 className='animate-spin h-4 w-4' />
                      <span className='text-sm text-gray-600'>
                        Testing in progress: {completedTests} of {selectedCount}{' '}
                        URLs completed
                      </span>
                    </div>
                    <div className='w-64 h-2 bg-gray-200 rounded-full overflow-hidden'>
                      <div
                        className='h-full bg-blue-500 transition-all duration-300'
                        style={{
                          width: `${(completedTests / selectedCount) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                )}

                <div className='flex gap-4 mb-2 text-sm'>
                  <div className='flex items-center gap-1'>
                    <div className='w-3 h-3 rounded-full bg-green-600'></div>
                    <span>Good</span>
                  </div>
                  <div className='flex items-center gap-1'>
                    <div className='w-3 h-3 rounded-full bg-yellow-600'></div>
                    <span>Needs Improvement</span>
                  </div>
                  <div className='flex items-center gap-1'>
                    <div className='w-3 h-3 rounded-full bg-red-600'></div>
                    <span>Poor</span>
                  </div>
                </div>

                <div className='border rounded-lg overflow-hidden overflow-x-auto'>
                  <table className='w-full'>
                    <thead className='bg-gray-50'>
                      <tr>
                        <th className='px-4 py-2 text-left w-8'>
                          <input
                            type='checkbox'
                            onChange={(e) => {
                              setSitemapUrls((urls) =>
                                urls.map((url) => ({
                                  ...url,
                                  selected: e.target.checked,
                                }))
                              );
                            }}
                          />
                        </th>
                        <th className='px-4 py-2 text-left'>URL</th>
                        <th className='px-4 py-2 text-left'>Status</th>
                        <th className='px-4 py-2 text-left whitespace-nowrap'>
                          Performance
                        </th>
                        <th className='px-4 py-2 text-left whitespace-nowrap'>
                          FCP
                        </th>
                        <th className='px-4 py-2 text-left whitespace-nowrap'>
                          LCP
                        </th>
                        <th className='px-4 py-2 text-left whitespace-nowrap'>
                          TBT
                        </th>
                        <th className='px-4 py-2 text-left whitespace-nowrap'>
                          CLS
                        </th>
                        <th className='px-4 py-2 text-left whitespace-nowrap'>
                          Speed Index
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {sitemapUrls.map((url, index) => {
                        const metrics =
                          url.result?.data?.lighthouseResult?.audits;
                        const performanceScore =
                          url.result?.data?.lighthouseResult?.categories
                            ?.performance?.score;
                        const displayUrl = getDisplayUrl(url.loc);

                        return (
                          <tr key={url.loc} className='border-t'>
                            <td className='px-4 py-2'>
                              <input
                                type='checkbox'
                                checked={url.selected}
                                onChange={() => toggleUrlSelection(index)}
                              />
                            </td>
                            <td className='px-4 py-2 font-mono text-sm'>
                              {overrideBaseUrl ? (
                                <>
                                  <div>{displayUrl}</div>
                                  {/* <div className="text-xs text-gray-500 mt-1">
                                    Original: {url.loc}
                                  </div> */}
                                </>
                              ) : (
                                displayUrl
                              )}
                            </td>
                            <td className='px-4 py-2'>
                              {url.result?.loading ? (
                                <span className='text-yellow-500'>
                                  Testing...
                                </span>
                              ) : url.result?.error ? (
                                <span className='text-red-500'>
                                  {url.result.error}
                                </span>
                              ) : url.result?.data?.lighthouseResult?.categories
                                  ?.performance?.score !== undefined ? (
                                <span className='text-green-500'>Complete</span>
                              ) : (
                                <span className='text-gray-500'>
                                  Not tested
                                </span>
                              )}
                            </td>
                            <td
                              className={`px-4 py-2 text-center ${getMetricColor(
                                'performance',
                                performanceScore
                              )}`}
                            >
                              {performanceScore
                                ? `${Math.round(performanceScore * 100)}%`
                                : '-'}
                            </td>
                            <td
                              className={`px-4 py-2 ${getMetricColor(
                                'first-contentful-paint',
                                metrics?.['first-contentful-paint']
                                  ?.numericValue
                              )}`}
                            >
                              {formatMetricValue(
                                metrics?.['first-contentful-paint']
                              )}
                            </td>
                            <td
                              className={`px-4 py-2 ${getMetricColor(
                                'largest-contentful-paint',
                                metrics?.['largest-contentful-paint']
                                  ?.numericValue
                              )}`}
                            >
                              {formatMetricValue(
                                metrics?.['largest-contentful-paint']
                              )}
                            </td>
                            <td
                              className={`px-4 py-2 ${getMetricColor(
                                'total-blocking-time',
                                metrics?.['total-blocking-time']?.numericValue
                              )}`}
                            >
                              {formatMetricValue(
                                metrics?.['total-blocking-time']
                              )}
                            </td>
                            <td
                              className={`px-4 py-2 ${getMetricColor(
                                'cumulative-layout-shift',
                                metrics?.['cumulative-layout-shift']
                                  ?.numericValue
                              )}`}
                            >
                              {formatMetricValue(
                                metrics?.['cumulative-layout-shift']
                              )}
                            </td>
                            <td
                              className={`px-4 py-2 ${getMetricColor(
                                'speed-index',
                                metrics?.['speed-index']?.numericValue
                              )}`}
                            >
                              {formatMetricValue(metrics?.['speed-index'])}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
