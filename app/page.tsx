import { HistoricalCruxChart } from '@/components/historical-crux-chart';
import MetricTrends from '@/components/metric-trends';
import QueryForm from '@/components/query-form';
import {
  getBinsForMetric,
  getCruxData,
  getTimeseriesForMetric,
  transformToChartData,
} from '@/lib/crux-data';

const default_url = 'https://vercel.com';

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const url = searchParams['url'];
  const formFactor = searchParams['formFactor'];
  const queryType = searchParams['queryType'];

  const res = await getCruxData(url || default_url, formFactor || 'DESKTOP', queryType || 'origin');

  let clsData;
  let ttfbData;
  let fcpData;
  let lcpData;
  let fipData;
  let itnpData;
  let timeSeries;

  if (res.error === undefined) {
    clsData = transformToChartData(res, 'cumulative_layout_shift');
    ttfbData = transformToChartData(res, 'experimental_time_to_first_byte');
    fcpData = transformToChartData(res, 'first_contentful_paint');
    lcpData = transformToChartData(res, 'largest_contentful_paint');
    fipData = transformToChartData(res, 'first_input_delay');
    itnpData = transformToChartData(res, 'interaction_to_next_paint');
  }

  return (
    <main className="p-12">
      <div className="w-2/3 max-w-[960px] mx-auto space-y-4">
        <section className="bg-red-200 text-red-800 rounded p-2">
          <p>
            ❗ Y-axes on these graphs are logarithmic. Bar size does not represent relative
            magnitude.
          </p>
        </section>
        <QueryForm />
        <h1 className="text-3xl mb-4">
          Historical CrUX Data for: <span className="text-blue-500">{url || default_url}</span>
        </h1>
        {formFactor && <p>Platform: {formFactor}</p>}
        {res.error ? (
          <pre>{JSON.stringify(res.error, null, 2)}</pre>
        ) : (
          <div className="space-y-8">
            <div className="flex">
              <div className="w-[85%]">
                <HistoricalCruxChart
                  title="Cumulative layout shift"
                  cruxChart={clsData}
                />
              </div>
              <div className="grow">
                <MetricTrends
                  data={getTimeseriesForMetric(res, 'cumulative_layout_shift')}
                  bins={getBinsForMetric(res, 'cumulative_layout_shift')}
                />
              </div>
            </div>
            <div className="flex">
              <div className="w-[85%]">
                <HistoricalCruxChart
                  title="Time to first byte (experimental)"
                  cruxChart={ttfbData}
                />
              </div>
              <div className="grow">
                <MetricTrends
                  data={getTimeseriesForMetric(res, 'experimental_time_to_first_byte')}
                  bins={getBinsForMetric(res, 'experimental_time_to_first_byte')}
                />
              </div>
            </div>
            <div className="flex">
              <div className="w-[85%]">
                <HistoricalCruxChart
                  title="First contentful paint"
                  cruxChart={fcpData}
                />
              </div>
              <div className="grow">
                <MetricTrends
                  data={getTimeseriesForMetric(res, 'first_contentful_paint')}
                  bins={getBinsForMetric(res, 'first_contentful_paint')}
                />
              </div>
            </div>
            <div className="flex">
              <div className="w-[85%]">
                <HistoricalCruxChart
                  title="Largest contentful paint"
                  cruxChart={lcpData}
                />
              </div>
              <div className="grow">
                <MetricTrends
                  data={getTimeseriesForMetric(res, 'largest_contentful_paint')}
                  bins={getBinsForMetric(res, 'largest_contentful_paint')}
                />
              </div>
            </div>
            <div className="flex">
              <div className="w-[85%]">
                <HistoricalCruxChart
                  title="First input delay"
                  cruxChart={fipData}
                />
              </div>
              <div className="grow">
                <MetricTrends
                  data={getTimeseriesForMetric(res, 'first_input_delay')}
                  bins={getBinsForMetric(res, 'first_input_delay')}
                />
              </div>
            </div>
            <div className="flex">
              <div className="w-[85%]">
                <HistoricalCruxChart
                  title="Interaction to next paint"
                  cruxChart={itnpData}
                />
              </div>
              <div className="grow">
                <MetricTrends
                  data={getTimeseriesForMetric(res, 'interaction_to_next_paint')}
                  bins={getBinsForMetric(res, 'interaction_to_next_paint')}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
