import { Link, useLocation } from 'react-router-dom';
import { HomeIcon } from '../svg/home';
import { ChevronRight } from '../svg/chevron-right';
import { styled } from 'styled-components';

interface BreadCrumbProps {
    label?: string;
    text?: string;
    background?: boolean;
}

const renderText = (text: string | undefined) => {
    if (text) {
        return <Text text={text}>{text}</Text>;
    }
    return null;
};

export const BreadCrumb = ({ label, text, background }: BreadCrumbProps) => {
    const location = useLocation();
    const segments = location.pathname
        .split('/')
        .filter(Boolean)
        .map((segment) =>
            segment.replace(/-/g, ' ').replace(/^\w/, (c) => c.toUpperCase()),
        )
        .filter((value) => value !== 'Shop' && value !== 'Account');

    return (
        <>
            <BreadCrumbNav background={background}>
                <BreadCrumbWrapper>
                    <BreadcrumbList>
                        <Link to="/">
                            <HomeIcon />
                        </Link>
                    </BreadcrumbList>
                    <ChevronRight stroke="white" />
                    {segments.map((segment: string) => (
                        <BreadcrumbList key={segment}>
                            <Link to={location.pathname}>{segment}</Link>
                            {segments.indexOf(segment) <
                                segments.length - 2 && <ChevronRight />}
                        </BreadcrumbList>
                    ))}
                </BreadCrumbWrapper>
                <Label>{label}</Label>
                {renderText(text)}
            </BreadCrumbNav>
        </>
    );
};

const Text = styled('p')<{ text: any }>`
    font-size: 1rem;
    font-weight: 500;
    padding: 1.5rem;
    color: #FFFFF;
    max-width: 720px;
    text-align: center;
    display: ${({ text }) => (!text ? 'none' : 'block')};
`;

const Label = styled('h1')`
    font-size: 2rem;
    font-weight: 700;
    padding: 1.5rem;
    color: #d4b05f;
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
`;

const BreadcrumbList = styled('ul')`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    padding: 0 0.5rem;
    a {
        font-size: 1rem;
    }
`;

const BreadCrumbWrapper = styled('ul')`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
`;
