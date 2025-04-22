import React from 'react';
import styled from 'styled-components';
import { Modal } from '../../../../components/modal';

export const DeliveryModal = ({
    delivery,
    onClose,
}: {
    delivery: any;
    onClose: () => void;
}) => {
    if (!delivery) return null;

    return (
        <FancyContainerWrapper>
            <Modal
                preview
                title="Delivery Information"
                handleCloseModal={onClose}
                content={
                    <StyledModalContent>
                        <DeliveryContainer>
                            <DeliveryColumn>
                                <LabelText>Name</LabelText>
                                <ValueText>{delivery.name}</ValueText>
                            </DeliveryColumn>
                            <DeliveryColumn>
                                <LabelText>Phone</LabelText>
                                <ValueText>{delivery.phone}</ValueText>
                            </DeliveryColumn>
                        </DeliveryContainer>

                        <DeliveryContainer>
                            <DeliveryColumn>
                                <LabelText>Address</LabelText>
                                <ValueText>{delivery.address}</ValueText>
                            </DeliveryColumn>
                            <DeliveryColumn>
                                <LabelText>Postcode</LabelText>
                                <ValueText>{delivery.postcode}</ValueText>
                            </DeliveryColumn>
                        </DeliveryContainer>

                        <DeliveryContainer>
                            <DeliveryColumn>
                                <LabelText>City</LabelText>
                                <ValueText>{delivery.city}</ValueText>
                            </DeliveryColumn>
                            <DeliveryColumn>
                                <LabelText>Email</LabelText>
                                <ValueText>{delivery.email}</ValueText>
                            </DeliveryColumn>
                        </DeliveryContainer>
                    </StyledModalContent>
                }
            />
        </FancyContainerWrapper>
    );
};

const FancyContainerWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 3rem 0;
`;

const StyledModalContent = styled.div`
    padding: 1.5rem;
    border-radius: 8px;
    color: white;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const DeliveryTitle = styled.h3`
    font-family: Cinzel;
    font-size: 24px;
    color: white;
    margin-bottom: 1rem;
`;

const DeliveryContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 2rem;
    margin-bottom: 0.75rem;

    @media (max-width: 600px) {
        flex-direction: column;
    }
`;

const DeliveryColumn = styled.div`
    flex: 1;
`;

const LabelText = styled.div`
    font-family: Cinzel, serif;
    font-size: 16px;
    color: #c79d0a;
    margin-bottom: 0.25rem;
`;

const ValueText = styled.div`
    font-family: Barlow, sans-serif;
    font-size: 16px;
    color: white;
`;
