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
            pointBackgroundColor?: string;
            pointBorderColor?: string;
        }[];
    };
}

const StyledChartContainer = styled.div`
    padding: 20px;
    border: 1px solid #4d3c7b;
    border-radius: 8px;
    background-color: #160d35;
    flex: 1;
    position: relative;
    height: 100%;
`;
const StyledNoSalesData = styled.div`
    padding: 20px;
    border: 1px solid #4d3c7b;
    border-radius: 8px;
    background-color: #160d35;
    display: flex;
    
    flex: 1;
    position: relative;
    height: 100%;
    color: white;
    justify-content: center;
    align-items: center;
     font-family: Cinzel;
        color: white;
    font-family: Cinzel;
    font-size: 18px;
    font-style: normal;
    font-weight: bold;
    line-height: normal;
    text-overflow: ellipsis;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
}
`;
const SalesGrowthChart: React.FC<SalesGrowthChartProps> = ({
    sales,
}: SalesGrowthChartProps) => {
    return (
        <>
            {sales.labels.length !== 0 ? (
                <StyledChartContainer>
                    <Line
                        data={sales}
                        options={options as ChartOptions<'line'>}
                    />
                </StyledChartContainer>
            ) : (
                <StyledNoSalesData>No sales data available</StyledNoSalesData>
            )}
        </>
    );
};

export default SalesGrowthChart;
