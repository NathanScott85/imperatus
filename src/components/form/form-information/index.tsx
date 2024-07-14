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
                        <h1>New Customer?</h1>
                        <p>Create an account with us and you'll be able to:</p>
                    </HeaderContainer>
                    <p>Check out faster</p>
                    <p>Save multiple shipping addresses</p>
                    <p>Access your order history</p>
                    <p>Track new orders</p>
                    <p>Save items to your Wish List</p>
                    <Button
                        link
                        pathname="/account/login"
                        label="Sign In"
                        size="small"
                        variant="secondary"
                    />
                </StyledFormInformation>
            )}
            {login && (
                <StyledFormInformation>
                    <HeaderContainer>
                        <h1>New Customer?</h1>
                        <p>Create an account with us and you'll be able to:</p>
                    </HeaderContainer>
                    <p>Check out faster</p>
                    <p>Save multiple shipping addresses</p>
                    <p>Access your order history</p>
                    <p>Track new orders</p>
                    <p>Save items to your Wish List</p>
                    <Button
                        link
                        pathname="/account/register"
                        label="Create Account"
                        size="small"
                        variant="secondary"
                    />
                </StyledFormInformation>
            )}
        </>
    );
};

const HeaderContainer = styled.div`
    max-width: 350px;
`;

const StyledFormInformation = styled.div`
    align-content: flex-start;
    color: #fff;
    font-family: Cinzel;
    margin-left: 2rem;

    h1 {
        color: #fff;
        font-family: Cinzel;
        font-size: 26px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        padding-left: 0.5rem;
    }

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
