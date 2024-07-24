import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { PercentageIncrease } from '../percentage-increase';

interface AccountStatsProps {
    currentMonth: number;
    lastMonth: number;
}

export const AccountStats: React.FC<AccountStatsProps> = ({
    currentMonth,
    lastMonth,
}) => {
    const [increase, setIncrease] = useState<number | null>(null);
    const [percentageIncrease, setPercentageIncrease] = useState<number | null>(
        null,
    );

    useEffect(() => {
        if (lastMonth !== 0) {
            const increaseAmount = currentMonth - lastMonth;
            const percentageIncreaseValue = (increaseAmount / lastMonth) * 100;
            setIncrease(increaseAmount);
            setPercentageIncrease(percentageIncreaseValue);
        }
    }, [currentMonth, lastMonth]);

    return (
        <AccountStatsContainerCenter>
            <Title>Account Statistics</Title>
            <StatTitle>Accounts created </StatTitle>
            <Strong>{currentMonth}</Strong>
            {lastMonth !== 0 && (
                <>
                    <p>Compared to last month:</p>
                    <StatValue
                        increase={(
                            increase !== null && increase > 0
                        ).toString()}
                    >
                        {increase !== null && increase > 0
                            ? `Increase: +${increase}`
                            : `Decrease: ${increase}`}
                    </StatValue>
                    <PercentageIncrease
                        percentageIncrease={percentageIncrease as any}
                    />
                </>
            )}
        </AccountStatsContainerCenter>
    );
};

const Strong = styled.strong`
    color: white;
    font-family: Barlow;
    font-size: 48px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale; /* For Firefox (macOS) */
    text-align: center;
`;

const AccountStatsContainerCenter = styled.div`
    width: 300px;
    padding: 20px;
    border: 1px solid #4d3c7b;
    border-radius: 8px;
    margin: 20px auto;
    background-color: #130a30;
    text-align: center;
    p {
        font-size: 14px;
        padding: 0.5rem;
        margin: 0.5rem;
        color: white;
    }
`;

const Title = styled.h2`
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
`;

const StatTitle = styled.h3`
    color: white;
    font-family: Cinzel;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    margin-top: 0.5rem;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
`;

const StatValue = styled.div<{ increase: string }>`
    color: ${(props) => (props.increase === 'true' ? '#15B170' : '#E74949')};
    -webkit-font-smoothing: antialiased; /* For WebKit (macOS, iOS) */
    -moz-osx-font-smoothing: grayscale; /* For Firefox (macOS) */
    text-align: center;
    font-family: Barlow;
    font-size: 18px;
    font-style: normal;
    font-weight: bold;
    line-height: normal;
`;
