import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { Header, TopHeader } from '../../components/header';
import { Navigation } from '../../components/navigation';
import { BreadCrumb } from '../../components/breadcrumbs';
import { FancyContainer } from '../../components/fancy-container';
import { Footer } from '../../components/footer';
import { HomeIcon } from '../../components/svg/home';
import { MainContainer } from '../../components/styled';

export const FourOFour = ({
    isAuthenticated,
}: {
    isAuthenticated?: boolean;
}) => {
    const navigate = useNavigate();
    const [autoNavigate, setAutoNavigate] = useState(true);
    const [countdown, setCountdown] = useState(5);

    useEffect(() => {
        if (!isAuthenticated && autoNavigate && countdown > 0) {
            const timer = setInterval(() => {
                setCountdown((prevCountdown) => prevCountdown - 1);
            }, 1000);

            return () => clearInterval(timer);
        } else if (!isAuthenticated && autoNavigate && countdown === 0) {
            navigate('/account/login');
        }
    }, [isAuthenticated, autoNavigate, countdown, navigate]);

    const handleCheckboxChange = () => {
        setAutoNavigate(!autoNavigate);
    };

    return (
        <>
            <TopHeader />
            <Header background />
            <Navigation background />
            <BreadCrumb
                label={
                    isAuthenticated
                        ? '404 Error, Page not found'
                        : 'You must be logged in to view this page.'
                }
            />

            <MainContainer>
                {!isAuthenticated && (
                    <FancyContainer variant="login" size="login">
                        <FancyContainerSubWrapper>
                            <h1>You must be logged in to view this page.</h1>
                            {autoNavigate && (
                                <p>
                                    You will be redirected to the login page in{' '}
                                    {countdown} seconds.
                                </p>
                            )}
                            <CheckboxContainer>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={!autoNavigate}
                                        onChange={handleCheckboxChange}
                                    />
                                    Disable Auto-Navigate
                                </label>
                            </CheckboxContainer>
                        </FancyContainerSubWrapper>
                    </FancyContainer>
                )}

                {isAuthenticated && (
                    <FancyContainer variant="login" size="login">
                        <FancyContainerSubWrapper>
                            <h1>404 Error, Page not found</h1>
                            <p>Home</p>
                            <Link to="/" aria-label="Go to Home Page">
                                <HomeIcon aria-hidden="true" />
                            </Link>
                        </FancyContainerSubWrapper>
                    </FancyContainer>
                )}

                <FancyLinkContainer></FancyLinkContainer>
            </MainContainer>
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
    color: white;

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

const CheckboxContainer = styled.div`
    margin: 1rem;
    font-family: 'Barlow', sans-serif;
    font-size: 16px;
    color: white;

    label {
        display: flex;
        align-items: center;
    }

    input {
        margin-right: 0.5rem;
        cursor: pointer;
    }
`;

export default FourOFour;
