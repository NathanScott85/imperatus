import React, { useState } from 'react';
import styled from 'styled-components';
import { Input } from '../../../components/input';
import Button from '../../../components/button';
import { PasswordChange } from '../password-change';

export const PersonalDetails = () => {
    const [isEditing, setIsEditing] = useState(false);
    // Hard coded for now till API is connected up
    const [formData, setFormData] = useState({
        fullname: 'Nathan Scott',
        email: 'nathan.scott@example.com',
        day: '15',
        month: '08',
        year: '1987',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        setIsEditing(false);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
    };

    return (
        <AccountDetailsSection>
            <h3>Personal Details</h3>
            <StyledDeliveryWrapper>
                {isEditing ? (
                    <Form>
                        <Label>Full Name</Label>
                        <Input
                            name="fullname"
                            value={formData.fullname}
                            onChange={handleInputChange}
                            variant="secondary"
                        />
                        <Label>Email Address</Label>
                        <Input
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            variant="secondary"
                        />
                        <BirthdayContainer>
                            <Label>Birthday</Label>
                            <BirthdayWrapper>
                                <Input
                                    variant="birthday"
                                    name="day"
                                    value={formData.day}
                                    onChange={handleInputChange}
                                    placeholder="DD"
                                />
                                <Input
                                    variant="birthday"
                                    name="month"
                                    value={formData.month}
                                    onChange={handleInputChange}
                                    placeholder="MM"
                                />
                                <Input
                                    variant="birthday"
                                    name="year"
                                    value={formData.year}
                                    onChange={handleInputChange}
                                    placeholder="YYYY"
                                />
                            </BirthdayWrapper>
                        </BirthdayContainer>
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
                    </Form>
                ) : (
                    <PersonalDetailsWrapper>
                        <strong>Full Name:</strong>
                        <PersonalDetail>{formData.fullname}</PersonalDetail>
                        <strong>Email Address:</strong>
                        <PersonalDetail>{formData.email}</PersonalDetail>
                        <strong>Birthday:</strong>
                        <PersonalDetail>
                            {`${formData.day}/${formData.month}/${formData.year}`}
                        </PersonalDetail>
                        <ButtonWrapper>
                            <Button
                                variant="primary"
                                size="small"
                                onClick={handleEditClick}
                            >
                                Edit
                            </Button>
                        </ButtonWrapper>
                    </PersonalDetailsWrapper>
                )}
            </StyledDeliveryWrapper>
            <PasswordChange />
        </AccountDetailsSection>
    );
};

const StyledDeliveryWrapper = styled.div`
    border: 1px solid #ac8fff;
    padding: 1.5rem;
    margin: 1rem 0;
    border-radius: 5px;
    color: white;
    display: flex;
    flex-direction: column;
`;

const AccountDetailsSection = styled.div`
    padding: 0rem 2rem 2rem 2rem;

    h3 {
        padding-bottom: 1rem;
        font-family: Cinzel;
        font-size: 20px;
        font-weight: 400;
        line-height: 35.05px;
        text-align: left;
        color: white;
    }
`;

const BirthdayContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const BirthdayWrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 1.6rem;
    justify-content: space-evenly;
`;

const Label = styled.label`
    display: flex;
    flex-direction: column;
    margin-bottom: 0.5rem;
    margin-top: 0.5rem;
    color: white;
    font-family: Barlow;
    font-size: 16px;
    font-weight: 400;
`;

const Form = styled.form`
    color: white;
    display: flex;
    flex-direction: column;
    text-align: left;
`;

const ButtonWrapper = styled.div`
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
`;

const PersonalDetailsWrapper = styled.div`
    color: white;
    display: flex;
    flex-direction: column;
    strong {
        color: #c79d0a;
        font-size: 16px;
    }
    font-family: Barlow, sans-serif;
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    color: white;
    display: flex;
    flex-direction: column;
    margin-bottom: 0.5rem;
    width: 325px;
`;

const PersonalDetail = styled.div`
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
