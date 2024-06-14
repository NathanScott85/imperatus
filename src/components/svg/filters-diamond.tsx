import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

export const DiamondSVGContainer = ({ children, second }: any) => {
    const svgRef = useRef<SVGSVGElement>(null);
  
    useEffect(() => {
      if (svgRef.current) {
        const newWidth = 1040;
        const newHeight = 415;
        svgRef.current.setAttribute("viewBox", `0 0 ${newWidth} ${newHeight}`);
      }
    }, []);
  
    return (
      <StyledSVG ref={svgRef} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="backgroundGradient" gradientTransform="rotate(90)">
            <stop offset="10.52%" stopColor="rgba(5, 3, 15, 0.9)" />
            <stop offset="93.33%" stopColor="rgba(19, 10, 48, 0.9)" />
          </linearGradient>
  
          <linearGradient id="borderGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4D3C7B" />
            <stop offset="100%" stopColor="#D4B05F" />
          </linearGradient>
  
          <linearGradient id="diamondGradient" gradientTransform="rotate(260.28)">
            <stop offset="10.52%" stopColor="rgba(5, 3, 15, 0.9)" />
            <stop offset="93.33%" stopColor="rgba(19, 10, 48, 0.9)" />
          </linearGradient>
        </defs>
  
        <StyledRect x="10" y="10" width="1020" height="395" rx="20" />
  
        <StyledPolygon points="510,0 520,10 510,20 500,10" />
        {second && <StyledPolygon points="510,415 520,405 510,395 500,405" />}
  
        {children}
      </StyledSVG>
    );
  };
  
  const StyledSVG = styled.svg`
    width: 800px;
    height: 415px;
  `;
  const StyledRect = styled.rect`
    fill: url(#backgroundGradient);
    stroke: url(#borderGradient);
    stroke-width: 1;
  `;
  const StyledPolygon = styled.polygon`
    fill: url(#diamondGradient);
    stroke: #AC8FFF;
    stroke-width: 1;
  `;