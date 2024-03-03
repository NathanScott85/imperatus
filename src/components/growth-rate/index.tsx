import styled from "@emotion/styled";
import { ArrowUp } from '../svg/arrow';
import { PercentageIncrease } from "../percentage-increase";


interface GrowthRateProps {
  currentMonth: number;
  lastMonth: number;
  previousMonth: number;
}

export const GrowthRate: React.FC<GrowthRateProps> = ({ currentMonth, lastMonth, previousMonth }) => {
  const percentageIncrease = ((currentMonth - lastMonth)) * 100;
  const PrevMonthPercentage = ((lastMonth - previousMonth) / previousMonth) * 100;
  const percentage = percentageIncrease - PrevMonthPercentage;

  return (
    <GrowthRateContainer>
      <GrowthRateTitle>Growth Rate</GrowthRateTitle>
      {lastMonth !== 0 && (
        <>
          <p>
            Compared to last month:</p>
          <GrowthRateStatValue isIncrease={percentageIncrease && percentageIncrease > 0}>
            <>{percentage.toFixed(2)}%</>
          </GrowthRateStatValue>
          <PercentageIncrease percentageIncrease={percentageIncrease as any} />
          vs previous 30 days
        </>
      )}
    </GrowthRateContainer>
  );
};


const GrowthRateContainer = styled.div`
    width: 150px;
    padding: 20px;
    border: 1px solid #4D3C7B;
    border-radius: 8px;
    margin: 20px auto;
    background-color: #fff;
`;

const GrowthRateTitle = styled.h2`
    margin-bottom: 10px;
    color: black;
`;

const GrowthRateStatValue = styled.div<{ isIncrease: number | boolean }>`
    font-size: 18px;
    color: ${(props) => (props.isIncrease ? 'green' : 'red')};
`;