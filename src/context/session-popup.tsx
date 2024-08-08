import React from 'react';
import styled from 'styled-components';
import Button from '../components/button';
import { FancyContainer } from '../components/fancy-container';

interface SessionExpiryPopupProps {
    onExtendSession: () => void;
    onLogout: () => void;
    show: boolean;
    loading: boolean;
}

const SessionExpiryPopup: React.FC<SessionExpiryPopupProps> = ({
    onExtendSession,
    onLogout,
    loading,
    show,
}) => {
    // Check if the popup should be displayed
    if (!show) return null;

    return (
        <Overlay>
            <FancyContainer size="modal" variant="modal">
                <PopupContent>
                    <Message>
                        Your session is about to expire. Would you like to
                        extend it?
                    </Message>
                    {loading ? (
                        <p>Extending session...</p>
                    ) : (
                        <ButtonContainer>
                            <Button
                                variant="primary"
                                label="Extend Session"
                                size="small"
                                onClick={onExtendSession}
                            />
                            <Button
                                variant="primary"
                                label="Logout"
                                size="small"
                                onClick={onLogout}
                            />
                        </ButtonContainer>
                    )}
                </PopupContent>
            </FancyContainer>
        </Overlay>
    );
};

export default SessionExpiryPopup;

// Styled-components for styling the popup
const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const PopupContent = styled.div`
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    text-align: center;
    color: white;
    font-family: Cinzel;
`;

const Message = styled.p`
    margin: 0;
    margin-bottom: 20px;
    font-size: 16px;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 10px;
`;
