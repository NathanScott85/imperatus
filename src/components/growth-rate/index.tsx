import styled from 'styled-components';
import { PercentageIncrease } from '../percentage-increase';

interface GrowthRateProps {
    currentMonth: number;
    lastMonth: number;
    previousMonth: number;
}

export const GrowthRate: React.FC<GrowthRateProps> = ({
    currentMonth,
    lastMonth,
    previousMonth,
}) => {
    const percentageIncrease =
        lastMonth !== 0 ? ((currentMonth - lastMonth) / lastMonth) * 100 : 0;

    const prevMonthPercentage =
        previousMonth !== 0
            ? ((lastMonth - previousMonth) / previousMonth) * 100
            : 0;

    const percentageDifference = percentageIncrease - prevMonthPercentage;

    return (
        <GrowthRateContainer>
            <GrowthRateTitle>Growth Rate</GrowthRateTitle>
            {lastMonth !== 0 && (
                <>
                    <p>Compared to last month:</p>
                    <GrowthRateStatValue increase={percentageDifference > 0}>
                        {percentageDifference.toFixed(2)}%
                    </GrowthRateStatValue>
                    <PercentageIncrease
                        percentageIncrease={percentageIncrease}
                    />
                    vs previous 30 days
                </>
            )}
        </GrowthRateContainer>
    );
};

const GrowthRateContainer = styled.div`
    padding: 20px;
    border: 1px solid #4d3c7b;
    border-radius: 8px;
    margin: 20px;
    background-color: #130a30;
    text-align: center;
    color: white;
    font-family: Cinzel;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    p {
        font-family: Cinzel;
        font-size: 18px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
    }
`;

const GrowthRateTitle = styled.h2`
    margin-bottom: 10px;
    color: white;
    font-family: Cinzel;
    font-size: 18px;
    font-style: normal;
    font-weight: bold;
    line-height: normal;
`;

const GrowthRateStatValue = styled.div<{ increase: boolean }>`
    font-size: 18px;
    font-family: Cinzel;
    font-size: 18px;
    font-style: normal;
    font-weight: bold;
    line-height: normal;
    color: ${(props) => (props.increase ? '#15B170' : '#E74949')};
`;
