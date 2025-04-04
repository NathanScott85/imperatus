import React from 'react';
import styled from 'styled-components';
import { GrowthRate } from '../../../components/growth-rate';
import { salesData } from '../mock-data';
import { orders } from '../orders-mocks';
import { OrderList } from '../../../components/orders-per-month';
import { AccountStats } from '../../../components/account-stats';
import SalesGrowthChart from '../../../components/line';
import { LatestOrders } from '../orders/latest-orders';

const currentMonth = 'December';

// todo get data back from api
const currentMonthOrders = 120;
const lastMonthOrders = 100;
const previousMonthOrders = 90;

const accountsCreated = 350;
const lastMonthsCreatedAccounts = 450;

export const Overview = () => (
    <OverviewContainer>
        <OverviewTitle>Overview</OverviewTitle>
        <OverviewWrapper>
            <GrowthRateContainer>
                <GrowthRate
                    currentMonth={currentMonthOrders}
                    lastMonth={lastMonthOrders}
                    previousMonth={previousMonthOrders}
                />
            </GrowthRateContainer>
            <OrderListContainer>
                <OrderList orders={orders} currentMonth={currentMonth} />
            </OrderListContainer>
            <AccountStatsContainer>
                <AccountStats
                    currentMonth={accountsCreated}
                    lastMonth={lastMonthsCreatedAccounts}
                />
            </AccountStatsContainer>
        </OverviewWrapper>
        <OverviewSubWrapper>
            <SalesGrowthChart sales={salesData} />
            <LatestOrders />
        </OverviewSubWrapper>
    </OverviewContainer>
);

const OverviewTitle = styled.h2`
    font-family: Cinzel, serif;
    font-size: 24px;
    padding: 1rem 2rem 1rem 2rem;
    color: white;
`;

const OverviewContainer = styled.div`
    color: white;
    display: grid;
    flex-direction: column;
    padding: 2rem;

    border: 1px solid #4d3c7b;
    border-radius: 8px;
    width: 100%;
    margin: 0 auto;
`;

const OverviewSubWrapper = styled.div`
    display: flex;
    margin: 1rem 1rem 2rem 1rem;
    background-color: #130a30;

    justify-content: space-between;
    align-items: center;
`;

const OverviewWrapper = styled.div`
    display: flex;
    justify-content: space-around;
    padding: 1rem;
    background-color: #130a30;
    flex-wrap: wrap;
`;

const GrowthRateContainer = styled.div`
    flex: 1;
`;

const OrderListContainer = styled.div`
    flex: 1;
`;

const AccountStatsContainer = styled.div`
    flex: 1;
`;

export default Overview;
