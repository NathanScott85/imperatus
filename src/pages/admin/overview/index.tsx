import React from 'react';
import styled from 'styled-components';
import { GrowthRate } from '../../../components/growth-rate';
import { salesData } from '../mock-data';
import { orders } from '../orders-mocks';
import { OrderList } from '../../../components/orders-per-month';
import { AccountStats } from '../../../components/account-stats';
import SalesGrowthChart from '../../../components/line';
import { LatestOrders } from '../orders';

const currentMonth = 'December';

// todo get data back from api
const currentMonthOrders = 120;
const lastMonthOrders = 100;
const previousMonthOrders = 90;

const accountsCreated = 350;
const lastMonthsCreatedAccounts = 450;

export const Overview = () => (
    <OverviewContainer>
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

const OverviewContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`;

const OverviewSubWrapper = styled.div`
    display: flex;
    padding: 1rem;
    background-color: #130a30;
    flex-wrap: wrap;
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
