import styled from "@emotion/styled";
import HomeIMG from '../../components/svg/website-images/0_10.png';

export const MainContainer = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    min-height: 100vh;
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

export const ImageContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 7rem 0;
    background-image: url(${HomeIMG});
    background-repeat: no-repeat;
    background-size: cover;
    z-index: -1;
    background-position: top center;
`;

export const Container = styled.div`
    color: #10000E;
    height: auto;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 7.5rem;
`;