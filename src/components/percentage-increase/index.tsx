import styled from 'styled-components';
import { ArrowDown, ArrowUp } from '../svg/arrow';

interface PercentageIncreaseProps {
    percentageIncrease: number | null;
}

export const PercentageIncrease = ({
    percentageIncrease,
}: PercentageIncreaseProps) => {
    const increase = percentageIncrease !== null && percentageIncrease > 0;

    return (
        <PercentageIncreaseContainer increase={increase}>
            {increase ? (
                <Container>
                    <ArrowUp type="small" fill="#15B170" />
                    <span>{percentageIncrease.toFixed(2)}%</span>
                </Container>
            ) : (
                <Container>
                    <ArrowDown type="small" fill="red" />
                    <span>{percentageIncrease?.toFixed(2)}%</span>
                </Container>
            )}
        </PercentageIncreaseContainer>
    );
};

const PercentageIncreaseContainer = styled.span<{ increase: boolean }>`
    font-size: 14px;
    color: ${(props) => (props.increase ? '#15b170' : '#E74949')};
`;

const Container = styled.span`
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    span {
        font-size: 18px;
        font-family: Cinzel;
        font-size: 18px;
        font-style: normal;
        font-weight: bold;
        line-height: normal;
    }
    margin: 0.5rem;
    gap: 5px;
`;
