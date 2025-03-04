import { gql } from "@apollo/client";

export const GET_VARIANTS = gql`
  query GetAllVariants($page: Int, $limit: Int, $search: String) {
    getAllVariants(page: $page, limit: $limit, search: $search) {
      variants {
        id
        name
      }
      totalCount
      totalPages
      currentPage
    }
  }
`;

export const CREATE_VARIANT = gql`
  mutation CreateVariant($name: String!) {
    createVariant(name: $name) {
      id
      name
    }
  }
`;

export const UPDATE_VARIANT = gql`
  mutation UpdateVariant($id: Int!, $name: String!) {
    updateVariant(id: $id, name: $name) {
      id
      name
    }
  }
`;
