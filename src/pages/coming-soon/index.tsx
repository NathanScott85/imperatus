import React from 'react';
import styled from 'styled-components';
import { LogoDragon } from '../../components/svg/logo';

export const ComingSoon: React.FC = () => {
    return (
        <Wrapper>
            <LogoDragon />
            <Title>Website Coming Soon</Title>
            <Subtitle>
                We’re working hard to bring something epic to life.
            </Subtitle>
            <Subtitle>
                For updates or questions, contact us at{' '}
                <a href="mailto:support@imperatusgames.co.uk">
                    support@imperatusgames.co.uk
                </a>
                .
            </Subtitle>
            <Subtitle>In the meantime, check out our socials:</Subtitle>
            <Socials>
                <a
                    href="https://www.facebook.com/profile.php?id=61574767299854"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Facebook
                </a>
                <a
                    href="https://x.com/ImperatusGames"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Twitter
                </a>
                <a
                    href="https://www.instagram.com/imperatus_games/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Instagram
                </a>
            </Socials>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #130a30;
    color: white;
    font-family: 'Cinzel', serif;
    text-align: center;
    padding: 2rem;
`;

const Title = styled.h1`
    font-size: 2.5rem;
    margin-bottom: 1rem;
`;

const Subtitle = styled.p`
    font-size: 1.25rem;
    margin-bottom: 0.75rem;

    a {
        color: #d4b05f;
        font-family: Barlow, sans-serif;
        font-size: 1.25rem;
        text-decoration: underline;
    }
`;

const Socials = styled.div`
    display: flex;
    gap: 1.5rem;
    margin-top: 1rem;

    a {
        color: #d4b05f;
        font-family: Barlow, sans-serif;
        font-size: 1.25rem;
        text-decoration: underline;
    }
`;

export default ComingSoon;
