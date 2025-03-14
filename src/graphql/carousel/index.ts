import { gql } from '@apollo/client';

export const GET_CAROUSEL_PAGES = gql`
  query GetCarouselPages($page: Int, $limit: Int, $search: String) {
    getCarouselPages(page: $page, limit: $limit, search: $search) {
      carouselPages {
        id
        createdAt
        updatedAt
        pages {
          id
          title
          description
          buttonText
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
          disabled
          product {
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
                description
                slug
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
      totalCount
      totalPages
      currentPage
    }
  }
`;

export const ADD_CAROUSEL_PAGE = gql`
    mutation CreateCarouselPage(
        $title: String!
        $description: String
        $buttonText: String
        $img: Upload!
        $brandId: ID
        $productId: ID
        $disabled: Boolean
    ) {
        createCarouselPage(
            title: $title
            description: $description
            buttonText: $buttonText
            img: $img
            brandId: $brandId
            productId: $productId
            disabled: $disabled
        ) {
            id
            title
            description
            buttonText
            img {
                id
                url
                fileName
            }
            brand {
                id
                name
            }
            disabled
        }
    }
`;

export const UPDATE_CAROUSEL_PAGE = gql`
    mutation UpdateCarouselPage(
        $id: ID!
        $title: String
        $description: String
        $buttonText: String
        $img: Upload
        $brandId: ID
        $productId: ID
        $disabled: Boolean
    ) {
        updateCarouselPage(
            id: $id
            title: $title
            description: $description
            buttonText: $buttonText
            img: $img
            brandId: $brandId
            productId: $productId
            disabled: $disabled
        ) {
            id
            title
            description
            buttonText
            img {
                id
                url
                fileName
            }
            brand {
                id
                name
            }
            disabled
        }
    }
`;

export const DELETE_CAROUSEL_PAGE = gql`
    mutation DeleteCarouselPage($id: ID!) {
        deleteCarouselPage(id: $id) {
            message
            deletedPage {
                id
                title
                description
            }
        }
    }
`;
