import React, { useState } from 'react';
import styled from 'styled-components';
import { Input } from '../../../components/input';
import Button from '../../../components/button'; // Assuming you have a Button component

export const PaymentDetails = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        cardNumber: '123456789',
        cardHolder: 'Mr N Scott',
        expiryDate: '07/27',
        cvv: '087',
    });

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSaveClick = () => {
        setIsEditing(false);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
    };

    const obscureCardNumber = (number: string) => {
        return number.replace(/\d(?=\d{4})/g, '*');
    };

    const obscureCVV = (cvv: string) => {
        return cvv.replace(/./g, '*');
    };

    return (
        <PaymentDetailsSection>
            <h1>Payment Details</h1>
            <StyledPaymentContainer>
                {isEditing ? (
                    <>
                        <InputWrapper>
                            <Label>Card Number</Label>
                            <Input
                                variant="secondary"
                                name="cardNumber"
                                value={formData.cardNumber}
                                onChange={handleInputChange}
                            />
                        </InputWrapper>
                        <InputWrapper>
                            <Label>Card Holder</Label>
                            <Input
                                variant="secondary"
                                name="cardHolder"
                                value={formData.cardHolder}
                                onChange={handleInputChange}
                            />
                        </InputWrapper>
                        <InputWrapper>
                            <Label>Expiry Date</Label>
                            <Input
                                variant="secondary"
                                name="expiryDate"
                                value={formData.expiryDate}
                                onChange={handleInputChange}
                            />
                        </InputWrapper>
                        <InputWrapper>
                            <Label>CVV</Label>
                            <Input
                                variant="secondary"
                                name="cvv"
                                value={formData.cvv}
                                onChange={handleInputChange}
                            />
                        </InputWrapper>
                        <ButtonWrapper>
                            <Button
                                variant="primary"
                                size="small"
                                onClick={handleSaveClick}
                            >
                                Save
                            </Button>
                            <Button
                                variant="secondary"
                                size="small"
                                onClick={handleCancelClick}
                            >
                                Cancel
                            </Button>
                        </ButtonWrapper>
                    </>
                ) : (
                    <CardDetailsWrapper>
                        <strong>Card Number:</strong>
                        <DetailItem>
                            {obscureCardNumber(formData.cardNumber)}
                        </DetailItem>
                        <strong>Card Holder:</strong>
                        <DetailItem>{formData.cardHolder}</DetailItem>
                        <strong>Expiry Date:</strong>
                        <DetailItem>{formData.expiryDate}</DetailItem>
                        <strong>CVV:</strong>
                        <DetailItem>{obscureCVV(formData.cvv)}</DetailItem>
                        <ButtonWrapper>
                            <Button
                                variant="primary"
                                size="small"
                                onClick={handleEditClick}
                            >
                                Edit
                            </Button>
                        </ButtonWrapper>
                    </CardDetailsWrapper>
                )}
            </StyledPaymentContainer>
        </PaymentDetailsSection>
    );
};

const CardDetailsWrapper = styled.div`
    color: white;
    display: flex;
    flex-direction: column;
    font-family: Barlow, sans-serif;
    font-size: 16px;
    font-weight: 400;
    line-height: 20px;
    color: white;
    width: 325px;
    strong {
        font-family: Barlow;
        color: #c79d0a;
        font-size: 16px;
    }
`;
const PaymentDetailsSection = styled.div`
    padding: 0rem 2rem 2rem 2rem;
    h1 {
        text-align: left;
        padding-bottom: 1rem;
        font-family: Cinzel;
        font-size: 20px;
        font-weight: 400;
        line-height: 35.05px;
        text-align: left;
        color: white;
    }
`;

const StyledPaymentContainer = styled.div`
    border: 1px solid #ac8fff;
    padding: 1.5rem;
    margin: 1rem 0;
    border-radius: 5px;
    color: white;
    display: flex;
    flex-direction: column; /* Stack elements vertically */
`;

const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
`;

const Label = styled.label`
    color: white;
    font-family: Barlow;
    font-size: 16px;
    margin-bottom: 0.5rem;
`;

const ButtonWrapper = styled.div`
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
`;

const DetailItem = styled.div`
    font-family: Barlow;
    font-size: 16px;
    list-style-type: none;
    padding-bottom: 1rem;
    color: white;
    margin-right: 0.5rem;
    font-size: 16px;
    flex: 1;
    margin-bottom: 1rem;
    font-family: Barlow, serif;
    width: 325px;
`;
