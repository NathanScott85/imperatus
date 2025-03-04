import { gql } from '@apollo/client';

export const GET_ALL_CARD_TYPES = gql`
  query GetAllCardTypes {
    getAllCardTypes {
        totalCount
        totalPages
        currentPage
        cardTypes {
            id
            name
            brand {
                id
                name
            }
        }
    }
  }
`;

export const CREATE_CARD_TYPE = gql`
  mutation CreateCardType($name: String!, $brandId: Int!) {
    createCardType(name: $name, brandId: $brandId) {
      id
      name
      brandId
    }
  }
`;

export const UPDATE_CARD_TYPE = gql`
  mutation UpdateCardType($id: Int!, $name: String!, $brandId: Int!) {
    updateCardType(id: $id, name: $name, brandId: $brandId) {
      id
      name
      brandId
    }
  }
`;
