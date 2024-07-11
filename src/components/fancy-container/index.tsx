import React from 'react';
import styled from 'styled-components';
import { mediaQueries } from '../../styled/breakpoints';
interface Variant {
    variant: 'small' | 'login';
    size: 'small';
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

const StyledContainer = styled.div<Variant>`
    width: ${({ size }: any) => {
        switch (size) {
            case 'login':
                return '600px';
            case 'small':
                return '700px';
            case 'medium':
                return '762px';
            default:
                return '0 16px';
        }
    }};
    height: ${({ size }: any) => {
        switch (size) {
            case 'login':
                return '350px';
            case 'small':
                return '350px';
            case 'medium':
                return '450px';
            default:
                return '0 16px';
        }
    }};
    margin: ${({ size }: any) => {
        switch (size) {
            case 'login':
                return '2rem';
            case 'small':
                return '2rem';
            case 'medium':
                return '3rem';
            default:
                return '0 16px';
        }
    }};
    position: relative;
    border-radius: 36px;
    display: flex;
    flex-direction: row;
    justify-content: center;

    &::before {
        content: '';
        position: absolute;
        top: -2px;
        left: -2px;
        right: -2px;
        bottom: -2px;
        border-radius: 36px;
        padding: 2px;
        background: ${gradient};
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

    background: ${({ variant }: any) => {
        switch (variant) {
            case 'login':
                return 'linear-gradient(260.28deg, rgba(5, 3, 15, 0.9) 10.52%, rgba(19, 10, 48, 0.9) 93.33%)';
            case 'small':
                return 'linear-gradient(260.28deg, rgba(5, 3, 15, 0.9) 10.52%, rgba(19, 10, 48, 0.9) 93.33%)';
            case 'medium':
                return 'linear-gradient(260.28deg, rgba(5, 3, 15, 0.9) 10.52%, rgba(19, 10, 48, 0.9) 93.33%)';
            default:
                return 'linear-gradient(260.28deg, rgba(5, 3, 15, 0.9) 10.52%, rgba(19, 10, 48, 0.9) 93.33%)';
        }
    }};
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
