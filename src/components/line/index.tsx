import React from 'react';
import { Line } from 'react-chartjs-2';
import styled from 'styled-components';
import { Chart, registerables } from 'chart.js';
import { ChartOptions } from 'chart.js';
import { options } from './options';

Chart.register(...registerables);

interface SalesGrowthChartProps {
  sales: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      fill?: boolean;
      borderColor?: string;
    }[];
  };
}

const StyledChartContainer = styled.div`
  width: 50%;
  margin: auto;
  padding: 20px;
  border: 1px solid #4D3C7B;
  border-radius: 8px;
  background-color: #fff;
`;

const SalesGrowthChart: React.FC<SalesGrowthChartProps> = ({ sales }: SalesGrowthChartProps) => {
  return (
    <StyledChartContainer>
      <Line data={sales} options={options as ChartOptions<"line">} />
    </StyledChartContainer>
  );
};

export default SalesGrowthChart;