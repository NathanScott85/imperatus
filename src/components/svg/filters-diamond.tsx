import React from 'react';
import styled from 'styled-components';

export const ImperatusBanner = ({ children }: any) => {
  return (
    <StyledBorder>
      <StyledBanner>
        <BannerContent>
          {children}
        </BannerContent>
      </StyledBanner>
    </StyledBorder>
  );
}
const StyledBorder = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 1px;
  border: 1px solid transparent;
  border-radius: 15px;
  background-image: linear-gradient(transparent, transparent), 
                    linear-gradient(to right, #C79D0A 0%, #C79D0A 20%, #AC8FFF 40%, #AC8FFF 60%, #C79D0A 100%);
  background-origin: border-box;
  background-clip: content-box, border-box;
  margin: 2.5rem;
`;

const StyledBanner = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(270deg, rgba(19, 10, 48, 0.9) 10.52%, rgba(5, 3, 15, 0.9) 93.33%,  rgba(5, 3, 15, 0.9) 93.33%);
  border-radius: 15px;
`;

const BannerContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  color: #FFFFFF; /* Ensure text color is contrasting */
  padding: 2rem;
  box-sizing: border-box; /* Ensure padding is included in the element's total size */
`;