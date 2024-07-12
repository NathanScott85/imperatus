import React from 'react';
import styled from 'styled-components';

interface Variant {
    variant: 'small' | 'medium' | 'filters' | 'login';
    size: 'small' | 'medium' | 'filters' | 'login';
}

export const FancyContainer = ({ children, variant, size }: any) => {
    return (
        <StyledContainer variant={variant} size={size}>
            <StyledRectTop />
            <StyledRectBottom />
            {children}
        </StyledContainer>
    );
};

const gradient = `
  linear-gradient(
    to right,
    #D4B05F 0%,
    #AC8FFF 17.5%,
    #AC8FFF 76.5%,
    #D4B05F 100%
  )
`;

const reversedGradient = `
  linear-gradient(
    to left,
    #AC8FFF 0%,
    #D4B05F 17.5%,
    #D4B05F 76.5%,
    #AC8FFF 100%
  )
`;

const StyledContainer = styled.div<Variant>`
    padding: ${({ size }) => {
        switch (size) {
            case 'login':
                return '2rem';
            case 'filters':
                return '1rem';
            case 'small':
                return '1.5rem';
            case 'medium':
                return '2rem';
            default:
                return '1rem';
        }
    }};
    margin: ${({ size }) => {
        switch (size) {
            case 'login':
            case 'filters':
                return '2rem';
            case 'small':
                return '2rem';
            case 'medium':
                return '2rem';
            default:
                return '1rem';
        }
    }};

    width: ${({ size }) => {
        switch (size) {
            case 'login':
                return '600px';
            case 'filters':
                return '257px';
            case 'small':
                return '700px';
            case 'medium':
                return '762px';
            default:
                return 'auto';
        }
    }};
    height: ${({ size }) => {
        switch (size) {
            case 'login':
                return '350px';
            case 'small':
                return '350px';
            case 'medium':
                return '450px';
            default:
                return 'auto';
        }
    }};
    position: relative;
    border-radius: 36px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background: ${({ variant }) => {
        switch (variant) {
            case 'login':
                return 'linear-gradient(260.28deg, rgba(5, 3, 15, 0.9) 10.52%, rgba(19, 10, 48, 0.9) 93.33%)';
            case 'small':
                return 'linear-gradient(260.28deg, rgba(5, 3, 15, 0.9) 10.52%, rgba(19, 10, 48, 0.9) 93.33%)';
            case 'medium':
                return 'linear-gradient(260.28deg, rgba(5, 3, 15, 0.9) 10.52%, rgba(19, 10, 48, 0.9) 93.33%)';
            case 'filters':
                return 'none';
            default:
                return 'linear-gradient(260.28deg, rgba(5, 3, 15, 0.9) 10.52%, rgba(19, 10, 48, 0.9) 93.33%)';
        }
    }};

    &::before {
        content: '';
        position: absolute;
        top: -2px;
        left: -2px;
        right: -2px;
        bottom: -2px;
        border-radius: ${({ size }) => (size === 'filters' ? '0px' : '36px')};
        padding: 2px;
        background: ${({ size }) => {
            switch (size) {
                case 'login':
                case 'small':
                case 'medium':
                    return gradient;
                case 'filters':
                    return reversedGradient;
                default:
                    return gradient;
            }
        }};
        -webkit-mask:
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
        mask:
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
        -webkit-mask-composite: destination-out;
        mask-composite: exclude;
        z-index: 1;
    }

    > * {
        z-index: 2;
    }
`;

const StyledRectTop = styled.div`
    position: absolute;
    width: 15px;
    height: 15px;
    background: #130a30;
    border: 2px solid #ac8fff;
    transform: rotate(45deg);
    top: -9px;
    z-index: 3;
    left: calc(50% - 7.5px);
`;

const StyledRectBottom = styled.div`
    position: absolute;
    width: 15px;
    height: 15px;
    background: #130a30;
    border: 2px solid #ac8fff;
    transform: rotate(45deg);
    bottom: -9px;
    left: calc(50% - 7.5px);
`;
