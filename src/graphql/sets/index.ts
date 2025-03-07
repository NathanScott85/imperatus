import { gql } from '@apollo/client';

export const GET_SETS = gql`
  query GetAllSets($page: Int!, $limit: Int!, $search: String) {
      getAllSets(page: $page, limit: $limit, search: $search) {
          totalCount
          totalPages
          currentPage
          sets {
              id
              setName
              setCode
              description
              brand {
                  id
                  name
              }
          }
      }
  }
`;


export const CREATE_SET = gql`
  mutation CreateProductSet($setName: String, $setCode: String, $description: String, $brandId: Int!) {
    createProductSet(setName: $setName, setCode: $setCode, description: $description, brandId: $brandId) {
      id
      setName
      setCode
      description
      brandId
      brand {
        id
        name
      }
    }
  }
`;

export const UPDATE_SET = gql`
    mutation UpdateProductSet(
      $id: ID!
      $setName: String!
      $setCode: String!
      $description: String
      $brandId: Int!
    ) {
      updateProductSet(
        id: $id
        setName: $setName
        setCode: $setCode
        description: $description
        brandId: $brandId
      ) {
        id
        setName
        setCode
        description
        brand {
          id
          name
        }
      }
    }
`;

export const DELETE_SET = gql`
  mutation DeleteSet($id: ID!) {
    deleteSet(id: $id) {
        message
    }
  }
`;