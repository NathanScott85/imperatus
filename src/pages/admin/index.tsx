import styled from '@emotion/styled';
import { Header, TopHeader } from '../../components/header';
import { Navigation } from '../../components/navigation';
import { BreadCrumb } from '../../components/breadcrumbs';
import { Footer } from '../../components/footer';
import {
    ImageContainer,
    MainContainer,
    Container,
} from '../../components/styled';
import SalesGrowthChart from '../../components/line';
import { GrowthRate } from '../../components/growth-rate';
import { OrderList } from '../../components/orders-per-month';
import { AccountStats } from '../../components/account-stats';
import { salesData, orders } from './mock-data';

interface AdminProps {
    user: any;
}

const currentMonth = 'Dec';
export const Admin = ({ user }: AdminProps) => {
    const { role } = user;
    return (
        <>
            <TopHeader />
            <Header background />
            <Navigation background />
            <BreadCrumb label="Admin" />
            <Container>
                {role === 'admin' ? <ImageContainer /> : <Background />}
            </Container>
            <MainContainer>
                <Section>
                    <GrowthRate
                        currentMonth={3}
                        lastMonth={2}
                        previousMonth={1}
                    />
                    <SalesGrowthChart sales={salesData} />
                    <AccountStats currentMonth={500} lastMonth={450} />
                    <OrderList orders={orders} currentMonth={currentMonth} />
                </Section>
            </MainContainer>
            <Footer />
        </>
    );
};

const Background = styled('div')`
    background: #130a30;
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -2;
`;

const Section = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    width: 100%;
    height: 100%;
    padding: 2rem 0;
    color: black;
    font-size: 1.5rem;
`;
