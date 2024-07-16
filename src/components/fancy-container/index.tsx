import React from 'react';
import styled from 'styled-components';

interface Variant {
    variant?: 'small' | 'medium' | 'filters' | 'login' | 'stock';
    size: 'small' | 'medium' | 'filters' | 'login' | 'stock';
}

export const FancyContainer = ({ children, variant, size }: any) => {
    return (
        <StyledContainer variant={variant} size={size}>
            <StyledRectTop size={size} />
            <StyledRectBottom size={size} />
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

const stockGradient = `
  linear-gradient(
    to left,
    rgba(172, 143, 255, 0.4) 0%,  /* #AC8FFF with 40% opacity */
    rgba(212, 176, 95, 0.9) 30%,   /* #D4B05F with 90% opacity */
    rgba(172, 143, 255, 0.4) 100% /* #AC8FFF with 40% opacity */
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
            case 'stock':
                return '2rem 2rem 2rem 2rem';
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
            case 'stock':
                return '1rem 0.5rem 0.5rem 0rem';
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
            case 'stock':
                return '225px';
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
            case 'stock':
                return '100px';
            default:
                return 'auto';
        }
    }};
    position: relative;
    border-radius: 36px;
    display: ${({ variant }) => {
        switch (variant) {
            case 'filters':
                return 'block';
            case 'stock':
                return 'block';
            default:
                return 'flex';
        }
    }};
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
            case 'stock':
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
        border-radius: ${({ size }) =>
            size === 'filters' || size === 'stock' ? '0px' : '36px'};
        padding: 2px;
        background: ${({ size }) => {
            switch (size) {
                case 'login':
                case 'small':
                case 'medium':
                    return gradient;
                case 'stock':
                    return stockGradient;
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

        z-index: ${({ variant }) => {
            switch (variant) {
                case 'login':
                    return 0;
                case 'small':
                    return 0;
                case 'medium':
                    return 2;
                case 'stock':
                    return -1;
                case 'filters':
                    return 0;
                default:
                    return 0;
            }
        }};
    }
    * > {
        z-index: 5;
    }
`;

const StyledRectTop = styled.div<Variant>`
    position: absolute;
    width: 15px;
    height: 15px;

    background: ${({ size }: any) => {
        switch (size) {
            case 'login':
                return '#130a30';
            case 'small':
                return '#130a30';
            case 'medium':
                return '#130a30';
            case 'stock':
                return 'white';
            case 'filters':
                return '#130a30';
            default:
                return '#130a30';
        }
    }};

    border: ${({ size }: any) => {
        switch (size) {
            case 'login':
                return '2px solid #ac8fff';
            case 'small':
                return '2px solid #ac8fff';
            case 'medium':
                return '2px solid #ac8fff';
            case 'stock':
                return '2px solid #d4b05f';
            case 'filters':
                return '2px solid #ac8fff';
            default:
                return '2px solid #ac8fff';
        }
    }};
    transform: rotate(45deg);
    top: -9px;
    z-index: 2; /* Ensure this is above the ::before element */
    left: calc(50% - 7.5px);
`;

const StyledRectBottom = styled.div<Variant>`
    position: absolute;
    width: 15px;
    height: 15px;
    background: ${({ size }: any) => {
        switch (size) {
            case 'login':
                return '#130a30';
            case 'small':
                return '#130a30';
            case 'medium':
                return '#130a30';
            case 'stock':
                return 'white';
            case 'filters':
                return '#130a30';
            default:
                return '#130a30';
        }
    }};

    border: ${({ size }: any) => {
        switch (size) {
            case 'login':
                return '2px solid #ac8fff';
            case 'small':
                return '2px solid #ac8fff';
            case 'medium':
                return '2px solid #ac8fff';
            case 'stock':
                return '2px solid #d4b05f';
            case 'filters':
                return '2px solid #ac8fff';
            default:
                return '#130a30';
        }
    }};
    transform: rotate(45deg);
    bottom: -9px;
    z-index: 2; /* Ensure this is above the ::before element */
    left: calc(50% - 7.5px);
`;
