import styled from 'styled-components';

export const MainContainer = styled.main`
    background-color: #130a30;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

export const ContactHeader = styled('header')`
    background-color: #05030f;
    display: flex;
    flex-direction: row;
    align-items: center;
    color: #c79d0a;
    height: 38px;
    width: 100%;
    padding: 0 1.75rem;
`;

export const ImageContainer = styled.div<{ img?: any }>`
    width: 100%;
    height: 100%;
    padding: 7rem 0;
    background-image: ${({ img }) => `url(${img})`};
    background-repeat: no-repeat;
    background-size: cover;
    z-index: -1;
    background-position: top center;
`;

export const Container = styled.div`
    color: #10000e;
    height: auto;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
