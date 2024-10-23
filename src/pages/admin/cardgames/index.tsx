import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useCardGamesContext } from '../../../context/cardgames';
import { CardGame } from './cardgame';
// import { CardGame } from './cardgame'; // Assuming this is similar to Product component in AdminProducts

export const AdminCardGames = () => {
  // const {
  //   cardGames,
  //   loading,
  //   error,
  //   fetchCardGames,
  //   currentPage,
  //   totalPages,
  //   setPage,
  // } = useCardGamesContext();

  const [selectedCardGame, setSelectedCardGame] = useState<any | null>( null );

  // useEffect( () => {
  //   fetchCardGames();
  // }, [fetchCardGames, currentPage] );

  // const handlePageChange = ( newPage: number ) => {
  //   if ( newPage >= 1 && newPage <= totalPages ) {
  //     setPage( newPage );
  //   }
  // };

  const handleViewCardGame = ( cardGame: any ) => {
    setSelectedCardGame( cardGame );
  };

  const handleBackToList = () => {
    setSelectedCardGame( null );
  };

  if ( selectedCardGame ) {
    return <CardGame cardGame={selectedCardGame} onBack={handleBackToList} />;
  }
  const loading = false;
  const error = false;
  const cardGames: any = []
  return (
    <CardGamesContainer>
      <CardGamesTitle>Card Games</CardGamesTitle>
      <CardGamesWrapper>
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock Amount</th>
              <th>Stock Status</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <CenteredCell>Loading...</CenteredCell>
              </tr>
            ) : error ? (
              <tr>
                <CenteredCell>
                  {/* Error: {error.message} */}
                </CenteredCell>
              </tr>
            ) : (
              cardGames?.map( ( cardGame: any, index: any ) => (
                <TableRow
                  key={cardGame.id}
                  isOdd={index % 2 === 1}
                >
                  <td>{cardGame.name}</td>
                  <td>{cardGame.category.name}</td>
                  <td>£{cardGame.price}</td>
                  <td>{cardGame.stock.amount}</td>
                  <td>
                    {cardGame.stock.amount > 0 ? (
                      <span>{cardGame.stock.instock}</span>
                    ) : (
                      <span>{cardGame.stock.soldout}</span>
                    )}
                  </td>
                  <td>
                    <ViewButton
                      onClick={() =>
                        handleViewCardGame( cardGame )
                      }
                    >
                      View
                    </ViewButton>
                  </td>
                </TableRow>
              ) )
            )}
          </tbody>
        </Table>
        <Pagination>
          <PageButton
            onClick={
              // () => handlePageChange( currentPage - 1 )
              () => null
            }
          // disabled={currentPage === 1}
          >
            Previous
          </PageButton>
          <PageButton
            onClick={

              // () => handlePageChange( currentPage + 1 )
              () => null
            }
          // disabled={currentPage === totalPages}
          >
            Next
          </PageButton>
        </Pagination>
      </CardGamesWrapper>
    </CardGamesContainer>
  );
};

// Styled components

const CardGamesTitle = styled.h2`
    font-family: Cinzel, serif;
    font-size: 24px;
    margin-bottom: 1rem;
    color: white;
`;

const CardGamesContainer = styled.div`
    flex-direction: column;
    p {
        font-size: 16px;
        color: white;
    }
`;

const CardGamesWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    padding: 1rem;
    border-radius: 8px;
    border: 1px solid #4d3c7b;
    width: 100%;
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    border: 1px solid #4d3c7b;

    background-color: #160d35;
    th,
    td {
        padding: 1rem;
        text-align: left;
        border-bottom: 1px solid #4d3c7b;
        line-height: normal;
    }

    th {
        background-color: #4d3c7b;
        color: #fff;
        font-family: Cinzel;
        font-size: 14px;
        font-weight: bold;
    }

    td {
        color: white;
        font-family: Barlow;
        font-size: 14px;
        font-style: normal;

        span {
            color: white;
            font-family: Barlow;
            font-size: 14px;
            font-style: normal;
        }
    }

    tr:hover {
        background-color: #2a1f51;
        color: #c79d0a;
    }
`;

const TableRow = styled.tr<{ isOdd: boolean }>`
    background-color: ${( { isOdd } ) => ( isOdd ? '#160d35' : 'transparent' )};
`;

const CenteredCell = styled.td`
    text-align: center;
    color: #999;
    font-size: 14px;
    padding: 2rem 0;
`;

const Pagination = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 1rem;
`;

const PageButton = styled.button<{ disabled?: boolean }>`
    background-color: ${( { disabled } ) => ( disabled ? '#999' : '#4d3c7b' )};
    color: #fff;
    border: none;
    padding: 0.5rem 1rem;
    margin: 0 0.5rem;
    cursor: ${( { disabled } ) => ( disabled ? 'not-allowed' : 'pointer' )};
    font-family: Barlow, sans-serif;
    font-size: 14px;
    border-radius: 4px;
    &:hover {
        background-color: ${( { disabled } ) => ( disabled ? '#999' : '#2a1f51' )};
    }
`;

const ViewButton = styled.button`
    background-color: #4d3c7b;
    color: #fff;
    border: none;
    padding: 0.5rem 1rem;
    cursor: pointer;
    font-family: Barlow, sans-serif;
    font-size: 14px;
    border-radius: 5px;
    &:hover {
        background-color: #2a1f51;
    }
`;