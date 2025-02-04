import { gql } from '@apollo/client';

export const GET_CATEGORIES = gql`
  query GetAllCategories($page: Int, $limit: Int, $search: String) {
    getAllCategories(page: $page, limit: $limit, search: $search) {
      categories {
        id
        name
        description
        products {
          id
          name
          price
          rrp
          description
          preorder
          img {
            id
            url
            key
            fileName
            contentType
            createdAt
          }
          stock {
            id
            amount
            sold
            instock
            soldout
            preorder
          }
        }
        img {
          id
          url
          key
          fileName
          contentType
          createdAt
        }
      }
      totalCount
      totalPages
      currentPage
    }
  }
`;

export const GET_CATEGORY_BY_ID = gql`
  query GetCategoryById ($id: ID!) {
    getCategoryById(id: $id) {
      id
      name
      description
      img {
        url
        fileName
        contentType
      }
      products {
        id
        name
        price
        rrp
        img {
          url
          fileName
          contentType
        }
        description
        stock {
          amount
          sold
          instock
          soldout
        }
        preorder
      }
    }
  }
`;

export const CREATE_CATEGORY = gql`
mutation CreateCategory($name: String!, $description: String!, $img: Upload!) {
  createCategory(name: $name, description: $description, img: $img) {
    name
    description
    img {
      id
      url
      fileName
    }
  }
}
`;



export const UPDATE_CATEGORY = gql`
  mutation UpdateCategory(
    $id: ID!
    $name: String!
    $description: String!
    $img: Upload
  ) {
    updateCategory(
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
        fileName
      }
    }
  }
`;

export const DELETE_CATEGORY = gql`
  mutation DeleteCategory($id: ID!) {
    deleteCategory(id: $id) {
      message
    }
  }
`;
