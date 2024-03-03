import styled from "@emotion/styled";
import { ArrowUp } from '../svg/arrow';

interface PercentageIncrease {
    percentageIncrease: number;
}

export const PercentageIncrease = ({ percentageIncrease }: PercentageIncrease) => {
    return (
        <PercentageIncreaseContainer isIncrease={percentageIncrease && percentageIncrease > 0 as any}>
            {percentageIncrease && percentageIncrease > 0
                ? <><ArrowUp type='small' /> {percentageIncrease.toFixed(2)}%</>
                : `${percentageIncrease?.toFixed(2)}% `}
        </PercentageIncreaseContainer>
    );
}

const PercentageIncreaseContainer = styled.span<{ isIncrease: boolean }>`
  font-size: 14px;
  color: ${(props) => (props.isIncrease ? 'green' : 'red')};
`;
