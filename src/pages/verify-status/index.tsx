import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Header, TopHeader } from '../../components/header';
import { Navigation } from '../../components/navigation';
import { BreadCrumb } from '../../components/breadcrumbs';
import { FancyContainer } from '../../components/fancy-container';
import { Footer } from '../../components/footer';
import { HomeIcon } from '../../components/svg/home';
import { useAppContext } from '../../context';
import { Unauthorized } from '../404/unauthorized';
import { useVerificationContext } from '../../context/verification';

export const VerificationStatus = () => {
    const { user, isAuthenticated } = useAppContext();
    const { getVerificationStatus, loading } = useVerificationContext();
    const hasFetched = useRef(false);

    useEffect(() => {
        if (user?.id && !hasFetched.current) {
            hasFetched.current = true;
            getVerificationStatus(user.id);
        }
    }, [user, getVerificationStatus]);

    if (!isAuthenticated) {
        return <Unauthorized />;
    }

    if (loading) return <p>Loading...</p>;

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
                            {user?.emailVerified ? (
                                <SuccessParagraph>Your email is already verified.</SuccessParagraph>
                            ) : (
                                <ErrorParagraph>
                                    Your email is not verified. Please check your inbox or request a new verification email.
                                </ErrorParagraph>
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

const SuccessParagraph = styled.p`
    color: #4caf50;
    font-size: 14px;
    font-family: 'Barlow', sans-serif;
    margin: 1rem 0;
`;

const ErrorParagraph = styled.p`
    color: #f44336;
    font-size: 14px;
    font-family: 'Barlow', sans-serif;
    margin: 1rem 0;
`;
