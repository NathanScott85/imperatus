import styled from "@emotion/styled";
import HomeIMG from '../../components/svg/website-images/0_10.png';

export const MainContainer = styled('main')`
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #10000E;
    height: calc(100vh - 80px);
    padding: 2.5rem;
`;

export const ContactHeader = styled('header')`
    background-color: #05030F;    
    display: flex;
    flex-direction: row;
    align-items: center;
    color: #D4B05F;
    height: 38px;
    width: 100%;
    padding: 0 1.75rem;
`;

export const Container = styled('div')`
    color: #10000E;
    height: 625px;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -2;
    background-image: linear-gradient(to bottom, black, #05030F);
`;

export const ImageContainer = styled('div')`
    background-image: url(${HomeIMG});
    background-repeat: no-repeat;
    background-size: cover;
    height: 100%;
    width: 100%;
`;