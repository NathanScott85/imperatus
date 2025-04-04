import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Search } from '../../../../components/search';
import { FancyContainer } from "../../../../components/fancy-container";
import { Rarity } from './rarity';
import { useRaritiesContext } from "../../../../context/card-rarity";

export const AdminRarities = () => {
    const { 
      rarities, 
      fetchRarities,
      loading,
      error,
      totalPages,
      setPage,
      search,
      page, 
      setSearch 
    } = useRaritiesContext();

    const [selectedRarity, setSelectedRarity] = useState<any | null>(null);

    useEffect(() => {
      fetchRarities();
    }, [fetchRarities, page]);

    const handlePageChange = (newPage: number) => {
      if (newPage >= 1 && newPage <= totalPages) {
        setPage(newPage);
      }
    };

    const handleViewRarity = (rarity: any) => {
      setSelectedRarity(rarity);
    };

    const triggerSearch = () => {
      setSearch(search);
    };

    const handleReset = () => {
      setSearch('');
      setPage(1);
    };

    const handleBackToList = () => {
      setSelectedRarity(null);
    };

    if (selectedRarity) {
      return (
        <Rarity rarity={selectedRarity} onBack={handleBackToList} />
      );
    }

    return (
      <RaritiesContainer>
        <TitleRow>
          <RaritiesTitle>Product Rarities</RaritiesTitle>
          <SearchContainer>
              <Search
                  type="text"
                  variant="small"
                  onSearch={triggerSearch}
                  search={search}
                  placeholder="Search Rarities"
                  onChange={(e) => setSearch(e.target.value)}
                  handleReset={handleReset}
              />
          </SearchContainer>
        </TitleRow>
        {rarities?.length !== 0 ? (
          <RaritiesWrapper>
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
                  rarities?.map((rarity: any, index: number) => (
                    <TableRow key={rarity.id} isOdd={index % 2 === 1}>
                      <td>{rarity.name}</td>
                      <td>
                        <ViewButton onClick={() => handleViewRarity(rarity)}>
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
          </RaritiesWrapper>
        ) : (
          <RaritiesContainer>
            <FancyContainer>
              <NoRaritiesMessage>
                {search ? (
                  <p>No results found for "{search}"</p>
                ) : (
                  <p>No Rarities added at the moment.</p>
                )}
              </NoRaritiesMessage>
            </FancyContainer>
          </RaritiesContainer>
        )}
      </RaritiesContainer>
    );
}

const SearchContainer = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    margin-left: auto;
    max-width: 325px;
    width: 100%;
`;

const RaritiesContainer = styled.div`
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

const RaritiesTitle = styled.h2`
    font-family: Cinzel, serif;
    font-size: 24px;
    margin-bottom: 1rem;
    color: white;
`;

const RaritiesWrapper = styled.div`
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

const TitleRow = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 0.75rem;
`;

const NoRaritiesMessage = styled.div`
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
    background-color: ${({ disabled }) => (disabled ? '#999' : '#4d3c7b')};
    color: #fff;
    border: none;
    padding: 0.5rem 1rem;
    margin: 0 0.5rem;
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
    font-family: Barlow, sans-serif;
    font-size: 14px;
    border-radius: 4px;
    &:hover {
        background-color: ${({ disabled }) => (disabled ? '#999' : '#2a1f51')};
    }
`;
