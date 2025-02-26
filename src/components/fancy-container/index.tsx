import React from 'react';
import styled from 'styled-components';

interface Variant {
    variant?:
        | 'small'
        | 'medium'
        | 'filters'
        | 'login'
        | 'stock'
        | 'account'
        | 'modal';
    size:
        | 'small'
        | 'medium'
        | 'filters'
        | 'login'
        | 'stock'
        | 'account'
        | 'modal';
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
    #C79D0A 0%,
    #AC8FFF 17.5%,
    #AC8FFF 76.5%,
    #C79D0A 100%
  )
`;

const reversedGradient = `
  linear-gradient(
    to left,
    #AC8FFF 0%,
    #C79D0A 17.5%,
    #C79D0A 76.5%,
    #AC8FFF 100%
  )
`;

const stockGradient = `
  linear-gradient(
    to left,
    rgba(172, 143, 255, 0.4) 0%,
    rgba(212, 176, 95, 0.9) 30%,
    rgba(172, 143, 255, 0.4) 100%
  )
`;

const StyledContainer = styled.div<Variant>`
    padding: ${({ size }) => {
        switch (size) {
            case 'login':
                return '2rem';
            case 'filters':
            case 'account':
                return '1rem';
            case 'small':
                return '1.5rem';
            case 'medium':
                return '2rem';
            case 'stock':
                return '2rem 2rem 2rem 2rem';
            case 'modal':
                return '2rem';
            default:
                return '1rem';
        }
    }};
    margin: ${({ size }) => {
        switch (size) {
            case 'login':
            case 'filters':
            case 'account':
                return '2rem';
            case 'small':
                return '2rem';
            case 'medium':
                return '2rem';
            case 'stock':
                return '1rem 0.5rem 0.5rem 0rem';
            case 'modal':
                return '0';
            default:
                return '1rem';
        }
    }};
    width: ${({ size }) => {
        switch (size) {
            case 'login':
                return '600px';
            case 'filters':
            case 'account':
                return '257px';
            case 'small':
                return '700px';
            case 'medium':
                return '762px';
            case 'stock':
                return '200px';
            case 'modal':
                return 'auto';
            default:
                return 'auto';
        }
    }};
    height: ${({ size }) => {
        switch (size) {
            case 'login':
            case 'small':
                return '350px';
            case 'medium':
                return '450px';
            case 'stock':
                return '100px';
            case 'modal':
                return 'auto';
            default:
                return 'auto';
        }
    }};
    position: ${({ variant }) => (variant === 'modal' ? 'fixed' : 'relative')};
    top: ${({ variant }) => (variant === 'modal' ? '50%' : 'auto')};
    left: ${({ variant }) => (variant === 'modal' ? '50%' : 'auto')};
    transform: ${({ variant }) =>
        variant === 'modal' ? 'translate(-50%, -50%)' : 'none'};
    z-index: ${({ variant }) => (variant === 'modal' ? 1001 : 'auto')};
    border-radius: ${({ size }) =>
        size === 'filters' || size === 'account' || size === 'stock'
            ? '0px'
            : '36px'};
    display: ${({ variant }) => {
        switch (variant) {
            case 'filters':
            case 'account':
            case 'stock':
                return 'block';
            case 'modal':
                return 'flex';
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
            case 'small':
            case 'medium':
            case 'account':
            case 'modal':
                return 'linear-gradient(260.28deg, rgba(5, 3, 15, 0.9) 10.52%, rgba(19, 10, 48, 0.9) 93.33%)';
            case 'filters':
                return null;
            case 'stock':
                return null;
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
            size === 'filters' || size === 'account' || size === 'stock'
                ? '0px'
                : '36px'};
        padding: 2px;
        background: ${({ size }) => {
            switch (size) {
                case 'login':
                case 'small':
                case 'medium':
                case 'modal':
                    return gradient;
                case 'stock':
                    return stockGradient;
                case 'filters':
                case 'account':
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
        z-index: ${({ variant }) => (variant === 'modal' ? -1 : 0)};
    }
    * > {
        z-index: 5;
    }
`;

const StyledRectTop = styled.div<Variant>`
    position: absolute;
    width: 15px;
    height: 15px;
    background: ${({ size }) => {
        switch (size) {
            case 'login':
            case 'small':
            case 'medium':
            case 'modal':
                return '#130a30';
            case 'stock':
                return 'white';
            case 'filters':
            case 'account':
                return '#130a30';
            default:
                return '#130a30';
        }
    }};
    border: ${({ size }) => {
        switch (size) {
            case 'login':
            case 'small':
            case 'medium':
            case 'modal':
                return '1px solid #ac8fff';
            case 'stock':
                return '1px solid #C79D0A';
            case 'filters':
            case 'account':
                return '1px solid #ac8fff';
            default:
                return '2px solid #ac8fff';
        }
    }};
    transform: rotate(45deg);
    top: -9px;
    z-index: 2;
    left: calc(50% - 7.5px);
`;

const StyledRectBottom = styled.div<Variant>`
    position: absolute;
    width: 15px;
    height: 15px;
    background: ${({ size }) => {
        switch (size) {
            case 'login':
            case 'small':
            case 'medium':
            case 'modal':
                return '#130a30';
            case 'stock':
                return 'white';
            case 'filters':
            case 'account':
                return '#130a30';
            default:
                return '#130a30';
        }
    }};
    border: ${({ size }) => {
        switch (size) {
            case 'login':
            case 'small':
            case 'medium':
            case 'modal':
                return '1px solid #ac8fff';
            case 'stock':
                return '1px solid #C79D0A';
            case 'filters':
            case 'account':
                return '1px solid #ac8fff';
            default:
                return '1px solid #ac8fff';
        }
    }};
    transform: rotate(45deg);
    bottom: -9px;
    left: calc(50% - 7.5px);
`;
