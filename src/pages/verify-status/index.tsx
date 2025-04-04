import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_VERIFICATION_STATUS } from '../../graphql/verification-status';
import styled from 'styled-components';
import { Header, TopHeader } from '../../components/header';
import { Navigation } from '../../components/navigation';
import { BreadCrumb } from '../../components/breadcrumbs';
import { FancyContainer } from '../../components/fancy-container';
import { Footer } from '../../components/footer';
import { HomeIcon } from '../../components/svg/home';
import { useAppContext } from '../../context';
import { Unauthorized } from '../404/unauthorized';

export const VerificationStatus = () => {
    const { user, isAuthenticated } = useAppContext();

    const userId = user ? user.id : null;

    const { data, loading, error } = useQuery(GET_VERIFICATION_STATUS, {
        variables: { userId },
        skip: !userId,
    });

    if (!isAuthenticated) {
        return <Unauthorized />;
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const verificationStatus = data?.getVerificationStatus;

    const { emailVerified, message } = verificationStatus || {};

    return (
        <>
            <TopHeader />
            <Header background />
            <Navigation background />
            <BreadCrumb label="Verification Status" />
            <VerifyEmailMain>
                <Section>
                    <FancyContainer variant="login" size="login">
                        <FancyContainerSubWrapper>
                            <h1>Verification Status</h1>
                            {message ? (
                                <p>{message}</p>
                            ) : (
                                <p>No verification status available.</p>
                            )}
                            {!emailVerified && (
                                <p>
                                    Please verify your email address to access
                                    your account.
                                </p>
                            )}
                            <FancyLinkContainer>
                                <p>Home</p>
                                <Link to="/" aria-label="Go to Home Page">
                                    <HomeIcon aria-hidden="true" />
                                </Link>
                            </FancyLinkContainer>
                        </FancyContainerSubWrapper>
                    </FancyContainer>
                </Section>
            </VerifyEmailMain>
            <Footer />
        </>
    );
};

const FancyLinkContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;

    a {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0.5rem;
        font-family: 'Barlow', sans-serif;
        font-size: 16px;
        text-decoration: none;
        color: inherit;

        &:hover {
            text-decoration: underline;
        }
    }
`;

const FancyContainerSubWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;

    p {
        margin: 0.5rem;
        font-family: 'Barlow', sans-serif;
        font-size: 16px;
    }

    h1 {
        margin: 1rem;
        font-family: Cinzel;
        font-size: 24px;
    }
    z-index: 50;
`;

const VerifyEmailMain = styled.main`
    background-color: #130a30;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding-bottom: 5.5rem;
`;

const Section = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #130a30;
    width: 100%;
    height: 100%;
    color: white;
    font-size: 1.5rem;
`;
