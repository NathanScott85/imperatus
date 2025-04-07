import { Link, useLocation } from 'react-router-dom';
import { HomeIcon } from '../svg/home';
import { ChevronRight } from '../svg/chevron-right';
import { styled } from 'styled-components';

interface BreadCrumbProps {
    label?: string;
    text?: string;
    background?: boolean;
    hidden?: boolean;
}

const renderText = (text: string | undefined) => {
    if (text) {
        return <Text text={text}>{text}</Text>;
    }
    return null;
};

export const BreadCrumb = ({
    label,
    text,
    background,
    hidden,
}: BreadCrumbProps) => {
    const location = useLocation();
    const pathSegments = location.pathname.split('/').filter(Boolean);
    let fullPath = '';

    return (
        <>
            <BreadCrumbNav background={background}>
                <BreadcrumbList>
                    <BreadCrumbWrapper>
                        <StyledLink to="/" isActive={fullPath === location.pathname}>
                            <HomeIcon />
                        </StyledLink>
                    </BreadCrumbWrapper>
                    <BreadCrumbWrapper>
                        <ChevronRight stroke="white" />
                    </BreadCrumbWrapper>
                    {pathSegments.map((segment: string, index: number) => {
                        fullPath += `/${segment}`; // Always build full route for navigation

                        const displaySegment =
                            !['shop', 'account', 'category'].includes(segment.toLowerCase()) &&
                                isNaN(Number(segment)) // Removes numbers
                                ? decodeURIComponent(segment.replace(/-/g, ' '))
                                : null;

                        return displaySegment ? (
                            <BreadCrumbWrapper key={segment}>
                                <StyledLink to={fullPath} isActive={fullPath === location.pathname}>
                                    {displaySegment
                                        .split(' ')
                                        .map(word => word.replace(/^\w/, (c) => c.toUpperCase()))
                                        .join(' ')}
                                </StyledLink>
                                {index < pathSegments.length - 1 && <ChevronRight stroke="white" />}
                            </BreadCrumbWrapper>
                        ) : null;
                    })}
                </BreadcrumbList>
                {hidden && <Label>{label}</Label>}
                {renderText(text)}
            </BreadCrumbNav>
        </>
    );
};

const StyledLink = styled(Link) <{ isActive: boolean }>`
    font-weight: ${({ isActive }) => (isActive ? 'bold' : 'normal')};
    color: ${({ isActive }) => (isActive ? '#c79d0a' : 'white')};
    font-size: ${({ isActive }) => (isActive ? '1.2rem' : '1.2rem')};
    z-index: 10;
`;

const Text = styled.p<{ text: any }>`
    font-size: 1rem;
    font-weight: 500;
    padding: 1.5rem;
    color: #FFFFF;
    max-width: 720px;
    text-align: center;
    display: ${({ text }) => (!text ? 'none' : 'block')};
`;

const Label = styled.h1`
    font-size: 2rem;
    font-weight: 700;
    padding: 1.5rem;
    color: #c79d0a;
`;

const BreadCrumbNav = styled.nav<BreadCrumbProps>`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    color: white;
    width: 100%;
    padding: 1.5rem;
    ${(background) =>
        background ? 'background-color: #130A30' : 'background-color: none'};
        z-index: 25;
`;

const BreadcrumbList = styled.ul`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    padding: 0 0.5rem;
  
`;

const BreadCrumbWrapper = styled.li`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    text-align: center;
`;
