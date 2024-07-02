import { CruxData, CruxChart, FormFactor, CruxTimeseries, CruxMetricBins } from './types';

export async function getCruxData(
  url: string,
  formFactor: FormFactor,
  queryType: 'page' | 'origin' | string
): Promise<CruxData> {
  const body: any = {
    formFactor,
  };

  if (queryType === 'origin') {
    body.origin = url;
  } else if (queryType === 'page') {
    body.url = url;
  } else {
    return { error: 'Invalid query type' };
  }

  const res = await fetch(
    `https://chromeuxreport.googleapis.com/v1/records:queryHistoryRecord?key=${process.env.GOOGLE_API_KEY}`,
    {
      method: 'POST',
      body: JSON.stringify(body),
    }
  );

  return await res.json();
}

export function transformToChartData(data: CruxData, metric: string): CruxChart {
  if (!data.record) {
    throw new Error('Cannot transform data for graphing');
  }

  const labels = data.record.collectionPeriods.map(
    p => `${p.lastDate.year}-${p.lastDate.month}-${p.lastDate.day}`
  );

  const dataForMetric = data.record.metrics[metric];
  const datasets = [
    {
      label: dataForMetric.histogramTimeseries[2].end
        ? `${dataForMetric.histogramTimeseries[2].start}-${dataForMetric.histogramTimeseries[2].end}`
        : `>${dataForMetric.histogramTimeseries[2].start}`,
      data: dataForMetric.histogramTimeseries[2].densities,
      backgroundColor: 'rgb(255, 2, 90)',
    },
    {
      label: dataForMetric.histogramTimeseries[1].end
        ? `${dataForMetric.histogramTimeseries[1].start}-${dataForMetric.histogramTimeseries[1].end}`
        : `>${dataForMetric.histogramTimeseries[1].start}`,
      data: dataForMetric.histogramTimeseries[1].densities,
      backgroundColor: 'rgb(255, 200, 0)',
    },
    {
      label: dataForMetric.histogramTimeseries[0].end
        ? `${dataForMetric.histogramTimeseries[0].start}-${dataForMetric.histogramTimeseries[0].end}`
        : `>${dataForMetric.histogramTimeseries[0].start}`,
      data: dataForMetric.histogramTimeseries[0].densities,
      backgroundColor: 'rgb(0, 128, 64)',
    },
  ];

  return {
    labels,
    datasets,
  };
}

export function getTimeseriesForMetric(data: CruxData, metric: string): CruxTimeseries {
  return data.record?.collectionPeriods.map((period, i) => ({
    period,
    p75: data.record?.metrics[metric].percentilesTimeseries.p75s[i],
  }))!;
}

export function getBinsForMetric(data: CruxData, metric: string): CruxMetricBins {
  const dataForMetric = data.record?.metrics[metric];
  return {
    good: [dataForMetric.histogramTimeseries[0].start, dataForMetric.histogramTimeseries[0].end],
    ok: [dataForMetric.histogramTimeseries[1].start, dataForMetric.histogramTimeseries[1].end],
    bad: [dataForMetric.histogramTimeseries[2].start, Infinity],
  };
}

export function getBinForValue(bins: CruxMetricBins, value: number): 'good' | 'ok' | 'bad' {
  if (value <= bins.good[1]) return 'good';
  if (value > bins.ok[0] && value <= bins.ok[1]) return 'ok';

  return 'bad';
}
