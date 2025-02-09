import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Header, TopHeader } from '../../components/header';
import { Navigation } from '../../components/navigation';
import { FancyContainer } from '../../components/fancy-container';
import { Footer } from '../../components/footer';
import { MainContainer } from '../../components/styled';

export const Unauthorized = () => {
    const navigate = useNavigate();
    const [autoNavigate, setAutoNavigate] = useState(true);
    const [countdown, setCountdown] = useState(5);

    useEffect(() => {
        if (autoNavigate && countdown > 0) {
            const timer = setInterval(() => {
                setCountdown((prevCountdown) => prevCountdown - 1);
            }, 1000);

            return () => clearInterval(timer);
        } else if (autoNavigate && countdown === 0) {
            navigate('/account/login');
        }
    }, [autoNavigate, countdown, navigate]);

    const handleCheckboxChange = () => {
        setAutoNavigate(!autoNavigate);
    };

    return (
        <>
            <TopHeader />
            <Header background />
            <Navigation background />
            <MainContainer>
                <FancyContainer variant="login" size="login">
                    <FancyContainerSubWrapper>
                        <h1>You must be logged in to view this page.</h1>
                        {autoNavigate && (
                            <p>
                                You will be redirected to the login page in {countdown} seconds.
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
            </MainContainer>
            <Footer />
        </>
    );
};

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
