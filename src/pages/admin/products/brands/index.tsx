import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FancyContainer } from '../../../../components/fancy-container';
import { useBrandsContext } from '../../../../context/brands';
import { Brand } from './brand';

export const AdminBrands = () => {
  const [selectedBrand, setSelectedBrand] = useState<any | null>( null );
  const {
    brands,
    fetchBrands,
    loading,
    error,
    totalPages,
    setPage,
    currentPage,
    setCurrentPage } = useBrandsContext();

  useEffect( () => {
    fetchBrands();
  }, [fetchBrands] );

  const handleViewBrand = ( brand: any ) => {
    setSelectedBrand( brand );
  };

  const handlePageChange = ( newPage: number ) => {
    if ( newPage >= 1 && newPage <= totalPages ) {
      setCurrentPage( newPage );
      setPage( newPage );
    }
  };

  const handleBackToList = () => {
    setSelectedBrand( null );
  };

  if ( loading ) return <p>Loading...</p>;
  if ( error ) return <Span>Error loading categories: {error.message}</Span>;

  if ( selectedBrand ) {
    return (
      <Brand brand={selectedBrand} onBack={handleBackToList} />
    )
  }
  return (
    <BrandsContainer>
      <BrandsTitle>Product Brands</BrandsTitle>
      {brands?.length !== 0 ? <BrandsWrapper>
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody>
            {brands?.map( ( brand: any, index: any ) => {
              return (
                <TableRow key={brand.id} isOdd={index % 2 === 1}>
                  <td>{brand.name}</td>
                  <td>{brand.description}</td>
                  <td>
                    <ViewButton onClick={() => handleViewBrand( brand )}>
                      View
                    </ViewButton>
                  </td>
                </TableRow>
              )
            } )}

          </tbody>
        </Table>
        {totalPages > 1 && (
          <Pagination>
            <PageButton
              onClick={() => handlePageChange( currentPage - 1 )}
              disabled={currentPage === 1}
            >
              Previous
            </PageButton>
            <PageButton
              onClick={() => handlePageChange( currentPage + 1 )}
              disabled={currentPage >= totalPages}
            >
              Next
            </PageButton>
          </Pagination>
        )}
      </BrandsWrapper> : <ProductsContainer>
        <FancyContainer>
          <NoTypesMessage>
            <p>No Brands added at the moment.</p>
          </NoTypesMessage>
        </FancyContainer>
      </ProductsContainer>
      }
    </BrandsContainer>
  )
}

const Span = styled.span`
    color: #fff;
    font-family: Cinzel;
    font-size: 14px;
    font-style: normal;
    font-weight: bold;
`;

const BrandsContainer = styled.div`
    flex-direction: column;
    p {
        font-size: 16px;
        color: white;
    }
`;

const BrandsTitle = styled.h2`
    font-family: Cinzel, serif;
    font-size: 24px;
    margin-bottom: 1rem;
    color: white;
`;


const BrandsWrapper = styled.div`
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


const NoTypesMessage = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    color: #777;
    text-align: center;
    width: 100%;
    p {
        height: 100%;
        color: white;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 50;
        font-family: Cinzel, serif;
        font-size: 24px;
        font-weight: 700;
        line-height: 1.5;
        letter-spacing: 0.02em;
        padding: 6rem;
    }
`;

const ProductsContainer = styled.div`
    flex-direction: column;
    p {
        font-size: 16px;
        color: white;
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



const BrandDetailContainer = styled.div`
    color: white;
`;
