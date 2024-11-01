import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAdminContext } from '../../../../context/admin';

export const AdminProductTypes = () => {
  const {
    productTypes,
    loading,
    error,
    fetchProductTypes,
    currentPage,
    totalPages,
    setPage,
  } = useAdminContext(); // Ensure this method is defined in your context

  const [selectedType, setSelectedType] = useState<any | null>( null );

  useEffect( () => {
    fetchProductTypes(); // Fetch product types when component mounts
  }, [fetchProductTypes] );

  const handlePageChange = ( newPage: number ) => {
    if ( newPage >= 1 && newPage <= totalPages ) {
      setPage( newPage );
    }
  };

  const handleViewType = ( type: any ) => {
    setSelectedType( type );
  };

  const handleBackToList = () => {
    setSelectedType( null );
  };

  if ( selectedType ) {
    // Render a detailed view if a type is selected
    return (
      <TypeDetailContainer>
        <h2>{selectedType.name}</h2>
        <p>{selectedType.description}</p>
        <button onClick={handleBackToList}>Back to List</button>
      </TypeDetailContainer>
    );
  }

  return (
    <TypesContainer>
      <TypesTitle>Product Types</TypesTitle>
      <TypesWrapper>
        <Table>
          <thead>
            <tr>
              <th>Name</th>
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
                <CenteredCell>Error: {error.message}</CenteredCell>
              </tr>
            ) : (
              productTypes?.map( ( type, index ) => (
                <TableRow key={type.id} isOdd={index % 2 === 1}>
                  <td>{type.name}</td>
                  <td>
                    <ViewButton onClick={() => handleViewType( type )}>
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
            onClick={() => handlePageChange( currentPage - 1 )}
            disabled={currentPage === 1}
          >
            Previous
          </PageButton>
          <PageButton
            onClick={() => handlePageChange( currentPage + 1 )}
            disabled={currentPage === totalPages}
          >
            Next
          </PageButton>
        </Pagination>
      </TypesWrapper>
    </TypesContainer>
  );
};

const TypesContainer = styled.div`
    flex-direction: column;
    p {
        font-size: 16px;
        color: white;
    }
`;

const TypesTitle = styled.h2`
    font-family: Cinzel, serif;
    font-size: 24px;
    margin-bottom: 1rem;
    color: white;
`;

const TypesWrapper = styled.div`
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
        font-style: normal;
        font-weight: bold;
    }

    td {
        color: white;
        font-family: Barlow;
        font-size: 14px;
        font-style: normal;
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

const TypeDetailContainer = styled.div`
    // Add your styling for the product type detail view here
    color: white;
`;
