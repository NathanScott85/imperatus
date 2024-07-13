import React from 'react';
import styled from '@emotion/styled';
import { Header, TopHeader } from '../../components/header';
import { Navigation } from '../../components/navigation';
import { BreadCrumb } from '../../components/breadcrumbs';
import { Footer } from '../../components/footer';
import { FancyContainer } from '../../components/fancy-container';
import { Input } from '../../components/input';
import { mediaQueries } from '../../styled/breakpoints';
import Button from '../../components/button';

export const Login = () => (
    <>
        <TopHeader />
        <Header background />
        <Navigation background />
        <BreadCrumb label="Login" />
        <MainContainer>
            <Section>
                <FancyContainer variant="login" size="login">
                    <Form>
                        <FormContents>
                            <label> Email Address</label>
                            <Input variant="secondary" />
                            <label>Password</label>
                            <Input variant="secondary" />
                            <StyledFormWrapper>
                                <Button
                                    label="Login"
                                    variant="primary"
                                    size="small"
                                />
                                <Button
                                    label="Forgot Password?"
                                    variant="text"
                                    pathname="/account/forgot-password"
                                />
                            </StyledFormWrapper>
                        </FormContents>
                    </Form>
                </FancyContainer>
                <FormInformation>
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
                </FormInformation>
            </Section>
        </MainContainer>
        <Footer />
    </>
);

const MainContainer = styled.main`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    justify-content: center;
    flex: 1;
    width: 100%;
    height: 100%;
    margin: 0;
    background-color: #130a30;
`;

const Section = styled.section`
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
    min-height: 650px;
    color: black;
    font-size: 1.5rem;
    margin-bottom: 10rem;
    ${mediaQueries('sm')`
         flex-direction: column;
         align-items: center;
    `};
    ${mediaQueries('sm')`
        flex-direction: row;
        align-items: center;
   `};
`;

const HeaderContainer = styled.div`
    max-width: 350px;
`;

const FormInformation = styled.div`
    align-content: flex-start;
    color: white;
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
        padding: 0.5rem 0.5rem 0.5rem 0.5rem;
    }
`;

const FormContents = styled.div`
    display: flex;
    flex-direction: column;
    label {
        font-family: Barlow;
        font-size: 16px;
        font-weight: 400;
        line-height: 24px;
        text-align: left;
        margin-bottom: 0.5rem;
        margin-top: 0.5rem;
    }
`;

const StyledFormWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 1rem;
`;

const Form = styled.form`
    color: white;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 350px;
`;
