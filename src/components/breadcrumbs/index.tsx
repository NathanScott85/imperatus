import { Link, useLocation } from "react-router-dom";
import { HomeIcon } from "../svg/home";
import { ChevronRight } from "../svg/chevron-right";
import { styled } from "@mui/material";

interface BreadCrumbProps {
  label?: string;
  text?: string; 
}

const renderText = (text: string | undefined) => {
  if(text) {
    return <Text text={text}>{text}</Text>;
  }
  return null;
}

export const BreadCrumb = ({ label, text }: BreadCrumbProps) => {
  const location = useLocation();
  const segments = location.pathname.split('/').filter(Boolean).map(segment => segment.replace(/-/g, ' ')
    .replace(/^\w/, c => c.toUpperCase())).filter((value) => value !== 'Shop' && value !== 'Account');

  return (
    <>
      <BreadCrumbNav>
        <BreadCrumbWrapper>
          <BreadcrumbList>
            <Link to="/"><HomeIcon /></Link>
          </BreadcrumbList>
          <ChevronRight />
          {segments.map((segment: string) => (
            <BreadcrumbList key={segment}>
              <Link to={location.pathname}>{segment}</Link>
              {segments.indexOf(segment) < segments.length - 2 && <ChevronRight />}
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
    display: ${({text }) => !text ? 'none' : 'block'}
`;

const Label = styled('h1')`
    font-size: 2rem;
    font-weight: 700;
    padding: 1.5rem;
    color: #D4B05F;
`;

const BreadCrumbNav = styled('nav')`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    color: #10000E;
    width: 100%;
    padding: 5rem 1.75rem;
    color: white;
    padding: 1.5rem;
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
