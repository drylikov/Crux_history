export type FormFactor = 'PHONE' | 'DESKTOP' | string;

export type CruxMetric = {
  histogramTimeseries: {
    start: number;
    end?: number;
    densities: number[];
  }[];
  percentilesTimeseries: {
    p75s: number[];
  };
};

export type CruxCollectionPeriod = {
  firstDate: {
    year: number;
    month: number;
    day: number;
  };
  lastDate: {
    year: number;
    month: number;
    day: number;
  };
};

export type CruxData = {
  record?: {
    key: {
      formFactor?: string;
      origin: string;
    };
    metrics: {
      cumulative_layout_shift?: CruxMetric;
      experimental_time_to_first_byte?: CruxMetric;
      first_contentful_paint?: CruxMetric;
      first_input_delay?: CruxMetric;
      interaction_to_next_paint?: CruxMetric;
      largest_contentful_paint?: CruxMetric;
    };
    collectionPeriods: CruxCollectionPeriod[];
  };
  error?: any;
};

export type CruxChart = {
  title?: string;
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
  }[];
};

export type CruxTimeseries = {
  period: CruxCollectionPeriod;
  p75: string;
}[];

export type CruxMetricBins = {
  good: number[];
  ok: number[];
  bad: number[];
};
