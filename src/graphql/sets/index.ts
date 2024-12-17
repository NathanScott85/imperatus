import { gql } from '@apollo/client';

export const GET_SETS = gql`
 query GetAllBrands($page: Int!, $limit: Int!, $search: String) {
    getAllSets(page: $page, limit: $limit, search: $search) {
        totalCount
        totalPages
        currentPage
        sets {
            id
            setName
            setCode
            description
        }
    }
}
`;

export const CREATE_SET = gql`
  mutation CreateProductSet($setName: String, $setCode: String, $description: String) {
    createProductSet(setName: $setName, setCode: $setCode, description: $description) {
      id
      setName
      setCode
      description
    }
  }
`;

export const UPDATE_SET = gql`
  mutation UpdateProductSet($id: ID!, $setName: String!, $setCode: String!, $description: String) {
      updateProductSet(
        id: $id
        setName: $setName
        setCode: $setCode
        description: $description
      ) {
        id
        setName
        setCode
        description
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