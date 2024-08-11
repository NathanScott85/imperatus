import React, { useState, ChangeEvent, FormEvent } from 'react';
import styled from 'styled-components';
import { Input } from '../../../components/input';
import Button from '../../../components/button';
import { useAppContext } from '../../../context'; // Import the context

export const PasswordChange = () => {
    const { user, changeUserPassword } = useAppContext(); // Access user from context
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        oldPassword: '',
        password: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState({
        oldPassword: '',
        password: '',
        confirmPassword: '',
    });

    const [success, setSuccess] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: '' });
    };

    const validateForm = () => {
        const newErrors = { ...errors };
        let valid = true;

        if (!formData.oldPassword) {
            newErrors.oldPassword = 'Current password is required';
            valid = false;
        }

        if (!formData.password || formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters long';
            valid = false;
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSaveClick = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        if (!user) {
            setError('You must be logged in to change your password.');
            return;
        }

        if (validateForm()) {
            try {
                // Pass the correct user ID to the mutation
                const result = await changeUserPassword(
                    user.id,
                    formData.oldPassword,
                    formData.password,
                );

                if (result && result.message) {
                    setSuccess(result.message);
                    setIsEditing(false);
                } else {
                    setError('Failed to change password. Please try again.');
                }
            } catch (err) {
                console.error('Password change failed:', err);
                setError('Failed to change password. Please try again.');
            }
        }
    };
    const handleEditClick = () => {
        setIsEditing(true);
        setError(null);
        setSuccess(null);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        setFormData({
            oldPassword: '',
            password: '',
            confirmPassword: '',
        });
        setError(null);
        setSuccess(null);
    };

    return (
        <AccountDetailsSection>
            <h3>Change Password</h3>
            <StyledDeliveryWrapper>
                {isEditing ? (
                    <Form onSubmit={handleSaveClick}>
                        <Label>Current Password</Label>
                        <Input
                            name="oldPassword"
                            value={formData.oldPassword}
                            onChange={handleInputChange}
                            variant="secondary"
                            type="password"
                        />
                        {errors.oldPassword && (
                            <StyledParagraph>
                                {errors.oldPassword}
                            </StyledParagraph>
                        )}
                        <Label>New Password</Label>
                        <Input
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            variant="secondary"
                            type="password"
                        />
                        {errors.password && (
                            <StyledParagraph>{errors.password}</StyledParagraph>
                        )}
                        <Label>Confirm New Password</Label>
                        <Input
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            variant="secondary"
                            type="password"
                        />
                        {errors.confirmPassword && (
                            <StyledParagraph>
                                {errors.confirmPassword}
                            </StyledParagraph>
                        )}
                        {error && <StyledParagraph>{error}</StyledParagraph>}
                        {success && <SuccessMessage>{success}</SuccessMessage>}
                        <ButtonWrapper>
                            <Button
                                variant="primary"
                                size="small"
                                type="submit"
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
                        <strong>Password:</strong>
                        <PersonalDetail>
                            Click edit to change password
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
        </AccountDetailsSection>
    );
};

// Styled components definitions
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

const Label = styled.label`
    display: flex;
    flex-direction: column;
    margin-bottom: 0.5rem;
    margin-top: 0.5rem;
    color: white;
    font-family: Barlow;
    font-size: 18px;
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

const StyledParagraph = styled.p`
    color: red;
    font-size: 10px;
    margin: 0.5rem 0rem 0rem 0rem;
`;

const SuccessMessage = styled.p`
    color: green;
    font-size: 10px;
    margin: 0.5rem 0rem 0rem 0rem;
`;

export default PasswordChange;
