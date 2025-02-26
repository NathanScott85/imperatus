import { gql } from '@apollo/client';

export const GET_CATEGORIES = gql`
  query GetAllCategories($page: Int, $limit: Int, $search: String, $filters: CategoryFilters) {
    getAllCategories(page: $page, limit: $limit, search: $search, filters: $filters) {
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
                slug
                preorder
                stock {
                    id
                    amount
                    sold
                    instock
                    soldout
                    preorder
                }
                brand {
                    id
                    name
                    description
                }
                img {
                    id
                    url
                    key
                    fileName
                    contentType
                    createdAt
                }
                type {
                    id
                    name
                }
                set {
                    id
                    setName
                    setCode
                    description
                }
                variant {
                    id
                    name
                }
                cardType {
                    id
                    name
                    brandId
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
            type {
                id
                name
            }
        }
        totalCount
        totalPages
        currentPage
    }
  }
`;

export const GET_CATEGORY_BY_ID = gql`
    query GetCategoryById($id: ID!, $page: Int, $limit: Int) {
        getCategoryById(id: $id, page: $page, limit: $limit) {
            id
            name
            description
            products {
                id
                name
                price
                rrp
                description
                slug
                preorder
                stock {
                    id
                    amount
                    sold
                    instock
                    soldout
                    preorder
                }
                set {
                    id
                    setName
                    setCode
                    description
                }
                variant {
                    id
                    name
                }
                cardType {
                    id
                    name
                    brandId
            }
            img {
                id
                url
                key
                fileName
                contentType
                createdAt
           }
            brand {
              id
              name
              description
          }
        }
      totalCount
      totalPages
      currentPage
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
