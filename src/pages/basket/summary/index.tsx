import React from 'react';
import styled from 'styled-components';
import Button from '../../../components/button';

interface OrderSummaryProps {
    basketProductsLength: number;
    calculateSubtotal: () => string;
    calculatePriceWithoutVAT: () => string;
    calculateTotal: () => string;
    renderTabContent: () => JSX.Element | null; // Updated type to allow null
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
    basketProductsLength,
    calculateSubtotal,
    calculatePriceWithoutVAT,
    calculateTotal,
    renderTabContent,
    activeTab,
    setActiveTab,
}) => {
    return (
        <SummaryContainer>
            <h2>Order Summary</h2>
            <Tabs>
                <Tab
                    isActive={activeTab === 'Delivery'}
                    onClick={() => setActiveTab('Delivery')}
                >
                    Delivery
                </Tab>
                <Tab
                    isActive={activeTab === 'Click & Collect'}
                    onClick={() => setActiveTab('Click & Collect')}
                >
                    Click & Collect
                </Tab>
            </Tabs>
            {renderTabContent()}
            <Details>
                <p>Total Items: {basketProductsLength}</p>
                <p>Subtotal: ${calculateSubtotal()}</p>
                <p>Delivery: $5.00</p>
                <p>Price without VAT: ${calculatePriceWithoutVAT()}</p>
                <p>Total (inc VAT): ${calculateTotal()}</p>
                <Button label="Checkout" size="small" variant="primary" />
            </Details>
        </SummaryContainer>
    );
};

const SummaryContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
    font-family: Barlow, sans-serif;
    font-weight: bold;
    padding: 2rem;
    border-radius: 8px;
    background-color: white;
    color: black;
    height: 600px;
    h2 {
        margin-bottom: 10px;
        font-weight: bold;
        font-size: 20px;
        line-height: 23px;
    }
    p {
        margin: 5px 0;
        font-size: 12px;
    }
`;

const Tabs = styled.div`
    display: flex;
    justify-content: flex-start;
    margin-bottom: 1rem;
    width: 100%;
`;

interface TabProps {
    isActive: boolean;
}

const Tab = styled.span<TabProps>`
    display: flex;
    flex-direction: row;
    align-items: center;
    border-bottom: ${({ isActive }) =>
        isActive ? '2px solid #d4b05f' : ' none'};
    color: ${({ isActive }) => (isActive ? 'black' : '#bdbdbd')};
    font-size: 14px;
    padding: 10px 10px 10px 10px;
    width: 120px;
    justify-content: center;
    cursor: pointer;
    font-weight: bold;
    margin-right: 10px;
    border-radius: 10px;
    text-align: center;
    &:hover {
        color: black;
        background: #d4b05f;
    }
`;

const Details = styled.div`
    margin-top: auto;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    p {
        padding-bottom: 0.5rem;
    }
`;
