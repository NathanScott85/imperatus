import { gql } from '@apollo/client';

export const GET_BRANDS = gql`
 query GetAllBrands($page: Int!, $limit: Int!) {
    getAllBrands(page: $page, limit: $limit) {
        totalCount
        totalPages
        currentPage
        brands {
            id
            name
            description
            img {
                id
                url
                key
                fileName
                contentType
                createdAt
            }
        }
    }
}
`;


export const CREATE_BRAND = gql`
  mutation CreateBrand($name: String!, $description: String!, $img: Upload) {
    createProductBrand(name: $name, description: $description, img: $img) {
      name
      description
      img {
        id
        url
        key
        fileName
        contentType
      }
    }
  }
`;

export const UPDATE_BRAND = gql`
  mutation UpdateProductBrand(
    $id: ID!
    $name: String!
    $description: String
    $img: Upload
  ) {
    updateProductBrand(
      id: $id
      name: $name
      description: $description
      img: $img
    ) {
      id
      name
      description
      img {
        id
        url
        key
        fileName
        contentType
        createdAt
      }
    }
  }
`;

export const DELETE_BRAND = gql`
  mutation DeleteBrand($id: ID!) {
    deleteBrand(id: $id) {
      message
    }
  }
`;

