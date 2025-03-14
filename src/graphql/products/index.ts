import { gql } from '@apollo/client';

export const GET_ALL_PRODUCTS = gql`
    query GetAllProducts($page: Int, $limit: Int, $search: String) {
        getAllProducts(page: $page, limit: $limit, search: $search) {
            totalCount
            totalPages
            currentPage
            products {
                id
                name
                price
                slug
                type {
                    id
                    name
                }
                rrp
                description
                preorder
                category {
                    id
                    name
                    description
                }
                brand {
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
                set {
                    id
                    setName
                    setCode
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
                stock {
                    id
                    amount
                    sold
                    instock
                    soldout
                    preorder
                }
            }
        }
    }
`;

export const GET_PRODUCT_BY_ID = gql`
  query GetProductById($id: ID!) {
    getProductById(id: $id) {
      id
      name
      price
      rrp
      description
      slug
      preorder
      category {
        id
        name
        slug
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
    }
  }
`;


export const CREATE_PRODUCT = gql`
    mutation CreateProduct(
        $name: String!
        $price: Float!
        $productTypeId: Int!
        $cardTypeId: Int
        $brandId: Int!
        $setId: Int!
        $description: String
        $img: Upload
        $categoryId: Int!
        $stock: StockInput!
        $preorder: Boolean!
        $rrp: Float
    ) {
        createProduct(
            name: $name
            price: $price
            productTypeId: $productTypeId
            cardTypeId: $cardTypeId
            brandId: $brandId
            setId: $setId
            description: $description
            img: $img
            categoryId: $categoryId
            stock: $stock
            preorder: $preorder
            rrp: $rrp
        ) {
            id
            name
            price
            rrp
            description
            preorder
            type {
                id
                name
            }
            cardType {
                id
                name
            }
            stock {
                id
                amount
                sold
                instock
                soldout
                preorder
            }
            category {
                name
            }
        }
    }
`;

export const UPDATE_PRODUCT = gql`
    mutation UpdateProduct(
        $id: ID!
        $name: String
        $price: Float
        $productTypeId: Int!
        $categoryId: Int
        $description: String
        $img: Upload
        $stockAmount: Int
        $stockSold: Int
        $stockInstock: String
        $stockSoldout: String
        $stockPreorder: Boolean
        $preorder: Boolean
        $rrp: Float
    ) {
        updateProduct(
            id: $id
            name: $name
            price: $price
            productTypeId: $productTypeId
            categoryId: $categoryId
            description: $description
            img: $img
            stockAmount: $stockAmount
            stockSold: $stockSold
            stockInstock: $stockInstock
            stockSoldout: $stockSoldout
            stockPreorder: $stockPreorder
            preorder: $preorder
            rrp: $rrp
        ) {
            id
            name
            price
            type {
                id
                name
            }
            description
            preorder
            rrp
            img {
                id
                url
                fileName
            }
            stock {
                amount
                sold
                instock
                soldout
                preorder
            }
            category {
                id
                name
                description
            }
        }
    }
`;

export const DELETE_PRODUCT = gql`
    mutation DeleteProduct($id: ID!) {
        deleteProduct(id: $id) {
            message
        }
    }
`;

export const GET_ALL_PRODUCT_TYPES = gql`
  query GetAllProductTypes($page: Int!, $limit: Int!, $search: String) {
    getAllProductTypes(page: $page, limit: $limit, search: $search) {
      totalCount
      totalPages
      currentPage
      types {
        id
        name
      }
    }
  }
`;

export const CREATE_PRODUCT_TYPE = gql`
  mutation CreateProductType($input: ProductTypeInput!) {
    createProductType(input: $input) {
      id
      name
    }
  }
`;

export const UPDATE_PRODUCT_TYPE = gql`
  mutation UpdateProductType($id: Int!, $name: String!) {
    updateProductType(id: $id, name: $name) {
      id
      name
    }
  }
`;
