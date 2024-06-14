import styled from "@emotion/styled";
import { ArrowUp } from '../svg/arrow';

interface PercentageIncreaseProps {
    percentageIncrease: number | null;
}

export const PercentageIncrease = ({ percentageIncrease }: PercentageIncreaseProps) => {
    const increase = percentageIncrease !== null && percentageIncrease > 0;
    
    return (
        <PercentageIncreaseContainer increase={increase}>
            {increase
                ? <><ArrowUp type='small' /> {percentageIncrease.toFixed(2)}%</>
                : `${percentageIncrease?.toFixed(2)}% `}
        </PercentageIncreaseContainer>
    );
}

const PercentageIncreaseContainer = styled.span<{ increase: boolean }>`
  font-size: 14px;
  color: ${(props) => (props.increase ? 'green' : 'red')};
`;
