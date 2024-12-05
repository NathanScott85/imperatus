import React from 'react';
import styled from 'styled-components';

export interface TypeDetailProps {
  type: {
    name: string;
  };
  onBack: () => void;
}

export const TypeDetail: React.FC<TypeDetailProps> = ( { type, onBack } ) => {
  return (
    <TypeDetailContainer>
      <FormTitle>Edit Product Type</FormTitle>
      <BackButton onClick={onBack}>Back to Product Types</BackButton>
      <TypeWrapper>
        <TypeDetailsWrapper>
          <FormGroup>
            <Label htmlFor="name">Product Type Name</Label>
            <Value>{type.name}</Value>
          </FormGroup>
        </TypeDetailsWrapper>
      </TypeWrapper>
    </TypeDetailContainer>
  );
};

const TypeDetailContainer = styled.div`
  color: white;
  width: 100%;
`;

const TypeWrapper = styled.div`
  border: 1px solid #ac8fff;
  border-radius: 4px;
  background-color: #160d35;
  padding: 1.5rem;
  display: flex;
  align-items: flex-start;
`;

const TypeDetailsWrapper = styled.div`
  font-family: Barlow;
  font-size: 16px;
  color: white;
  margin-right: 0.5rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  font-family: Barlow, sans-serif;
  font-size: 14px;
  margin-bottom: 0.5rem;
  display: block;
  color: #c79d0a;
  font-weight: bold;
`;

const Value = styled.p`
  font-family: Barlow, sans-serif;
  font-size: 16px;
  color: white;
  margin: 0;
`;

const BackButton = styled.button`
  background-color: #4d3c7b;
  color: #fff;
  border: none;
  margin-bottom: 1.5rem;
  cursor: pointer;
  font-family: Barlow, sans-serif;
  font-size: 14px;
  border-radius: 4px;
  padding: 0.75rem;
  &:hover {
    background-color: #2a1f51;
  }
`;

const FormTitle = styled.h2`
  font-family: Cinzel, serif;
  font-size: 24px;
  margin-bottom: 1rem;
  color: white;
`;
