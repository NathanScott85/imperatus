import { gql } from '@apollo/client';

export const GET_CARDGAMES = gql`
  query GetCardGames {
    cardGames {
      id
      name
      price
      description
      img {
        id
        url
        key
        fileName
        contentType
        createdAt
      }
      stock {
        amount
        sold
        instock
        soldout
        preorder
      }
      preorder
      rrp
    }
  }
`;

export const GET_CARDGAME_BY_ID = gql`
  query GetCardGameById($id: ID!) {
    cardGame(id: $id) {
      id
      name
      price
      description
      img {
        id
        url
        key
        fileName
        contentType
        createdAt
      }
      stock {
        amount
        sold
        instock
        soldout
        preorder
      }
      preorder
      rrp
    }
  }
`;

export const CREATE_CARDGAME = gql`
  mutation CreateCardGame(
    $name: String!
    $price: Float!
    $description: String!
    $img: Upload!
    $categoryId: Int!
    $stock: StockInput!
    $preorder: Boolean!
    $rrp: Float!
  ) {
    createCardGame(
      name: $name
      price: $price
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
      description
      preorder
      rrp
      img {
        id
        url
      }
    }
  }
`;

export const UPDATE_CARDGAME = gql`
  mutation UpdateCardGame(
    $id: ID!
    $name: String
    $price: Float
    $description: String
    $img: Upload
    $categoryId: Int
    $stock: StockInput
    $preorder: Boolean
    $rrp: Float
  ) {
    updateCardGame(
      id: $id
      name: $name
      price: $price
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
      description
      preorder
      rrp
    }
  }
`;

export const DELETE_CARDGAME = gql`
  mutation DeleteCardGame($id: ID!) {
    deleteCardGame(id: $id) {
      message
    }
  }
`;
