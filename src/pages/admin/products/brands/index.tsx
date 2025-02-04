import React, { useDeferredValue, useEffect, useState } from 'react';
import styled from 'styled-components';
import { FancyContainer } from '../../../../components/fancy-container';
import { useBrandsContext } from '../../../../context/brands';
import { Brand } from './brand';
import { Input } from '../../../../components/input';
import { Search } from '../../../../components/search';

export const AdminBrands = () => {
      const {
        brands,
        fetchBrands,
        loading,
        error,
        search,
        totalPages,
        setPage,
        currentPage,
        setCurrentPage, setSearch } = useBrandsContext();

      const [selectedBrand, setSelectedBrand] = useState<any | null>( null );

      useEffect( () => {
        fetchBrands();
      }, [fetchBrands] );

      const handlePageChange = ( newPage: number ) => {
        if ( newPage >= 1 && newPage <= totalPages ) {
          setCurrentPage( newPage );
          setPage( newPage );
        }
      };

      const handleReset = () => {
        setSearch('');
        setPage(1);
      };

      const triggerSearch = () => {
        setSearch(search);
      };

      const handleViewBrand = ( brand: any ) => {
        setSelectedBrand( brand );
      };

      const handleBackToList = () => {
        setSelectedBrand( null );
      };

      if ( selectedBrand ) {
        return (
          <Brand brand={selectedBrand} onBack={handleBackToList} />
        )
      }

  return (
    <BrandsContainer>
      <TitleRow>
        <BrandsTitle>Product Brands</BrandsTitle>
        <SearchContainer>
          <Search
              type="text"
              variant="small"
              onSearch={triggerSearch}
              search={search}
              placeholder="Search Brands"
              onChange={(e) => setSearch(e.target.value)}
              handleReset={handleReset}
          />             
        </SearchContainer>
      </TitleRow>
      {brands?.length !== 0 ? (
        <BrandsWrapper>
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
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
                brands?.map( ( brand: any, index: number ) => (
                  <TableRow key={brand.id} isOdd={index % 2 === 1}>
                    <td>{brand.name}</td>
                    <td>{brand.description}</td>
                    <td>
                      <ViewButton onClick={() => handleViewBrand( brand )}>
                        View
                      </ViewButton>
                    </td>
                  </TableRow>
                ) )
              )}
            </tbody>
          </Table>
          {totalPages > 1 && (
            <PaginationContainer>
              <PaginationControls>
                <PageButton
                  onClick={() => handlePageChange( currentPage - 1 )}
                  disabled={currentPage === 1}
                >
                  Previous
                </PageButton>
                <span>
                  Page {currentPage} of {totalPages}
                </span>
                <PageButton
                  onClick={() => handlePageChange( currentPage + 1 )}
                  disabled={currentPage >= totalPages}
                >
                  Next
                </PageButton>
              </PaginationControls>
            </PaginationContainer>
          )}
        </BrandsWrapper>
      ) : (
        <ProductsContainer>
          <FancyContainer>
            <NoBrandsMessage>
              {search ? (
                <p>No results found for "{search}"</p>
              ) : (
                <p>No Brands added at the moment.</p>
              )}
            </NoBrandsMessage>
          </FancyContainer>
        </ProductsContainer>
      )}

    </BrandsContainer>
  )
}

const SearchContainer = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    margin-left: auto;
    max-width: 325px;
    width: 100%;

`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.75rem;
`;

const NoBrandsMessage = styled.div`
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

const StyledInput = styled( Input )`
  margin-left: auto;
  max-width: 300px;
  border-radius: 3px;
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

const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    margin-left: 26rem;
`;

const PaginationControls = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 1rem 0rem 1rem 1rem;
    
    span {
        color: white;
        text-align: center;
        margin: 0 1rem;
    }
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
