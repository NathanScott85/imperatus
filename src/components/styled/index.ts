import styled from '@emotion/styled';

export const MainContainer = styled.main`
    background-color: #130A30;
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
    color: #d4b05f;
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
