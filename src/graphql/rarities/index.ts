import { gql } from "@apollo/client";

export const GET_RARITIES = gql`
  query GetAllRarity($page: Int, $limit: Int, $search: String) {
    getAllRarity(page: $page, limit: $limit, search: $search) {
      rarities {
        id
        name
      }
      totalCount
      totalPages
      currentPage
    }
  }
`;

export const CREATE_RARITY = gql`
  mutation CreateRarity($name: String!) {
    createRarity(name: $name) {
      id
      name
    }
  }
`;

export const UPDATE_RARITY = gql`
  mutation UpdateRarity($id: Int!, $name: String!) {
    updateRarity(id: $id, name: $name) {
      id
      name
    }
  }
`;

