import React from 'react';
import styled from 'styled-components';
import Button from '../../button';

interface FormInformationProps {
    register?: boolean;
    login?: boolean;
}

export const FormInformation: React.FC<FormInformationProps> = ({
    register,
    login,
}) => {
    return (
        <>
            {register && (
                <StyledFormInformation>
                    <HeaderContainer>
                        <h1>Already a customer?</h1>
                        <p>Create an account with us and you'll be able to:</p>
                    </HeaderContainer>
                    <p>Check out faster</p>
                    <p>Save your shipping addresses</p>
                    <p>Access your order history</p>
                    <p>Track new orders</p>
                    {/* <p>Save items to your Wish List</p> */}
                    <ButtonContainer>
                        <Button
                            link
                            pathname="/account/login"
                            label="Sign In"
                            size="small"
                            variant="secondary"
                        />
                    </ButtonContainer>
                </StyledFormInformation>
            )}
            {login && (
                <StyledFormInformation>
                    <HeaderContainer>
                        <h1>New Customer?</h1>
                        <p>Create an account with us and you'll be able to:</p>
                    </HeaderContainer>
                    <p>Check out faster</p>
                    <p>Save your shipping address</p>
                    <p>Access your order history</p>
                    <p>Track new orders</p>
                    {/* <p>Save items to your Wish List</p> */}
                    <ButtonContainer>
                        <Button
                            link
                            pathname="/account/register"
                            label="Create Account"
                            size="small"
                            variant="secondary"
                        />
                    </ButtonContainer>
                </StyledFormInformation>
            )}
        </>
    );
};

const ButtonContainer = styled.div`
    padding: 1.25rem 0rem;
`;

const HeaderContainer = styled.div`
    h1 {
        color: #fff;
        font-family: Cinzel;
        font-size: 26px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
    }
`;

const StyledFormInformation = styled.div`
    font-family: Cinzel;
    margin: 2rem;
    p {
        color: #fff;
        font-family: Barlow;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        padding: 0.5rem 0;
    }
`;
