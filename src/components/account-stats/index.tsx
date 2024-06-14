import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { PercentageIncrease } from '../percentage-increase';

interface AccountStatsProps {
    currentMonth: number;
    lastMonth: number;
}

export const AccountStats: React.FC<AccountStatsProps> = ({ currentMonth, lastMonth }) => {
    const [increase, setIncrease] = useState<number | null>(null);
    const [percentageIncrease, setPercentageIncrease] = useState<number | null>(null);

    useEffect(() => {
        if (lastMonth !== 0) {
            const increaseAmount = currentMonth - lastMonth;
            const percentageIncreaseValue = (increaseAmount / lastMonth) * 100;
            setIncrease(increaseAmount);
            setPercentageIncrease(percentageIncreaseValue);
        }
    }, [currentMonth, lastMonth]);

    return (
        <AccountStatsContainer>
            <StatTitle>Account Statistics</StatTitle>
            <StatTitle>
                Accounts created this month: <strong>{currentMonth}</strong>
            </StatTitle>
            {lastMonth !== 0 && (
                <p>
                    Compared to last month:{' '}
                    <StatValue increase={(increase !== null && increase > 0).toString()}>
                        {increase !== null && increase > 0 ? `Increase: +${increase}` : `Decrease: ${increase}`}
                    </StatValue>
                    {' '}
                    <PercentageIncrease percentageIncrease={percentageIncrease as any} />
                </p>
            )}
        </AccountStatsContainer>
    );
};

const AccountStatsContainer = styled.div`
    width: 300px;
    padding: 20px;
    border: 1px solid #4D3C7B;
    border-radius: 8px;
    margin: 20px auto;
    background-color: #fff;
`;

const StatTitle = styled.h2`
    margin-bottom: 10px;
    color: black;
`;

const StatValue = styled.div<{ increase: string }>`
    font-size: 18px;
    color: ${(props) => (props.increase === 'true' ? 'green' : 'red')};
`;
