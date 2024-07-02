'use client';

import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LogarithmicScale,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { CruxChart } from '@/lib/types';

type Props = {
  title: string;
  cruxChart: CruxChart;
};

ChartJS.register(CategoryScale, LinearScale, LogarithmicScale, BarElement, Title, Tooltip, Legend);

export const HistoricalCruxChart = ({ title, cruxChart }: Props) => {
  const options = {
    plugins: {
      title: {
        display: true,
        text: title,
        color: '#bbb',
        font: {
          size: 24,
        },
      },
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
        title: {
          text: 'Last day of rolling 28-day measurement window',
          display: true,
          color: '#bbb',
        },
      },
      y: {
        type: 'logarithmic' as const,
        stacked: true,
        title: {
          text: 'Percentage of users',
          display: true,
          color: '#bbb',
        },
      },
    },
  };

  return (
    <Bar
      options={options}
      data={cruxChart}
    />
  );
};
