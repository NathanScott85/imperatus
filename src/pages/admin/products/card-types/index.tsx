import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAdminContext } from '../../../../context/admin';
import { FancyContainer } from '../../../../components/fancy-container';
import { CardType } from './card-type';
import { Search } from '../../../../components/search';

export const AdminCardTypes = () => {
    const {
      cardTypes,
      loading,
      error,
      fetchCardTypes,
      search,
      totalPages,
      page,
      setPage,
      setSearch,
    } = useAdminContext();

    const [selectedType, setSelectedType] = useState<any | null>(null);

    useEffect(() => {
      fetchCardTypes();
    }, [setSearch, fetchCardTypes]);

    const handlePageChange = (newPage: number) => {
      if (newPage >= 1 && newPage <= totalPages) {
        setPage(newPage);
      }
    };

    const triggerSearch = () => {
        setSearch(search);
    };
    
    const handleReset = () => {
      setSearch('');
      setPage(1);
    };

    const handleViewType = (type: any) => {
      setSelectedType(type);
    };

    const handleBackToList = () => {
      setSelectedType(null);
    };

    if (selectedType) {
      return <CardType type={selectedType} onBack={handleBackToList} />;
    }

    return (
      <TypesContainer>
        <TitleRow>
          <TypesTitle>Card Types</TypesTitle>
          <SearchContainer>
            <Search
              type="text"
              variant="small"
              onSearch={triggerSearch}
              search={search}
              placeholder="Search Card Types"
              onChange={(e) => setSearch(e.target.value)}
              handleReset={handleReset}
            />   
          </SearchContainer>
        </TitleRow>

        {cardTypes?.length !== 0 ? (
          <TypesWrapper>
            <Table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Card Game</th>
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
                  cardTypes?.map((type, index) => (
                    <TableRow key={type.id} isOdd={index % 2 === 1}>
          
                      <td>{type.name}</td>
                      <td>{type.brand.name}</td>
                      <td>
                        <ViewButton onClick={() => handleViewType(type)}>
                          View
                        </ViewButton>
                      </td>
                    </TableRow>
                  ))
                )}
              </tbody>
            </Table>
            {totalPages > 1 && (
              <PaginationContainer>
                <PaginationControls>
                  <PageButton
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                  >
                    Previous
                  </PageButton>
                  <span>
                    Page {page} of {totalPages}
                  </span>
                  <PageButton
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page >= totalPages}
                  >
                    Next
                  </PageButton>
                </PaginationControls>
              </PaginationContainer>
            )}
          </TypesWrapper>
        ) : (
          <TypesContainer>
            <FancyContainer>
              <NoTypesMessage>
                {search ? (
                  <p>No results found for "{search}"</p>
                ) : (
                  <p>No Card Types added at the moment.</p>
                )}
              </NoTypesMessage>
            </FancyContainer>
          </TypesContainer>
        )}
      </TypesContainer>
    );
};

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
   background-color: ${({ isOdd }) => (isOdd ? '#1e1245' : '#160d35')};
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
