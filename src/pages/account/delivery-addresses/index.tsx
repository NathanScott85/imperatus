import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../../../components/button';
import { Input } from '../../../components/input';
import { useAppContext } from '../../../context';
import { UPDATE_USER_ADDRESS } from '../../../graphql/update-address';
import { useMutation } from '@apollo/client';

export const DeliveryInformation = () => {
    const [isEditing, setIsEditing] = useState(false);
    const { user, setUser } = useAppContext();
    const [formData, setFormData] = useState({
        address: user?.address || '',
        city: user?.city || '',
        postcode: user?.postcode || '',
        phone: user?.phone || '',
    });

    const [updateUserAddress] = useMutation(UPDATE_USER_ADDRESS, {
        onCompleted: (data) => {
            setIsEditing(false);
            setUser({
                ...user,
                address: data.updateUserAddress.address,
                city: data.updateUserAddress.city,
                postcode: data.updateUserAddress.postcode,
                phone: data.updateUserAddress.phone,
            });
        },
        onError: (error) => {
            console.error('Error updating address:', error);
        },
    });

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSaveClick = async (e: any) => {
        e.preventDefault();
        try {
            const userDetails = await updateUserAddress({
                variables: {
                    id: user?.id,
                    phone: formData.phone,
                    address: formData.address,
                    city: formData.city,
                    postcode: formData.postcode,
                },
            });
            console.log('User address updated successfully:', userDetails);
        } catch (error) {
            console.error('Error updating address:', error);
        }
    };

    const handleCancelClick = () => {
        setIsEditing(false);
    };

    return (
        <DeliveryInformationContainer>
            <h3>Delivery Address</h3>
            <StyledAddressContainer>
                <StyledAddressWrapper>
                    {isEditing ? (
                        <>
                            <InputWrapper>
                                <Label>Address</Label>
                                <Input
                                    variant="secondary"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                />
                            </InputWrapper>
                            <InputWrapper>
                                <Label>City</Label>
                                <Input
                                    variant="secondary"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleInputChange}
                                />
                            </InputWrapper>
                            <InputWrapper>
                                <Label>Postal Code</Label>
                                <Input
                                    variant="secondary"
                                    name="postcode"
                                    value={formData.postcode}
                                    onChange={handleInputChange}
                                />
                            </InputWrapper>
                            <InputWrapper>
                                <Label>Phone Number</Label>
                                <Input
                                    variant="secondary"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                />
                            </InputWrapper>
                            <ButtonWrapper>
                                <Button
                                    variant="primary"
                                    size="small"
                                    onClick={handleSaveClick}
                                    label="Save"
                                />
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
                        <DeliveryAddressDetails>
                            <strong>Name</strong>
                            <StyledAddress>{user?.fullname}</StyledAddress>{' '}
                            <strong>Street Number / Name</strong>
                            <StyledAddress>{formData.address}</StyledAddress>
                            <strong>City</strong>
                            <StyledAddress>{formData.city}</StyledAddress>
                            <strong>Postcode</strong>
                            <StyledAddress>{formData.postcode}</StyledAddress>
                            <strong>Phone number</strong>
                            <StyledAddress>{formData.phone}</StyledAddress>
                            <Button
                                variant="primary"
                                size="small"
                                onClick={handleEditClick}
                                label="Edit"
                            />
                        </DeliveryAddressDetails>
                    )}
                </StyledAddressWrapper>
            </StyledAddressContainer>
        </DeliveryInformationContainer>
    );
};

interface StyledAddressContainerProps {
    dashed?: boolean;
}

const DeliveryAddressDetails = styled.div`
    color: white;
    display: flex;
    flex-direction: column;

    font-family: Barlow, sans-serif;
    font-size: 16px;
    font-weight: 400;
    line-height: 20px;
    color: white;
    display: flex;
    flex-direction: column;
    width: 325px;
    strong {
        color: #c79d0a;
        font-size: 16px;
    }
`;

const ButtonWrapper = styled.div`
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
`;

const Name = styled.span`
    font-weight: 700;
    font-size: 16px;
    padding-bottom: 1rem;
`;

const StyledAddressWrapper = styled.ul`
    display: flex;
    flex-direction: column;
`;

const StyledAddress = styled.li`
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

const StyledAddressContainer = styled.div<StyledAddressContainerProps>`
    border: ${({ dashed }) =>
        dashed ? '1px dashed #c79d0a' : '1px solid #ac8fff'};
    padding: 1.5rem;
    margin: 1rem 0;
    border-radius: 5px;
    color: white;
    display: flex;
    flex-direction: column; /* Stack elements vertically */

    /* Align the button (assumed to be the last child) to the left */
    &:last-child {
        align-self: flex-start; /* Align the button to the left */
    }
`;
const DeliveryInformationContainer = styled.div`
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
