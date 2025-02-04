import React, { useDeferredValue, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useCategoriesContext } from '../../../context/categories';
import { Category } from './category';
import { FancyContainer } from '../../../components/fancy-container';
import { Input } from '../../../components/input';
import { Search } from '../../../components/search';

export const AdminCategories = () => {
    const {
        categories,
        loading,
        error,
        fetchCategories,
        currentPage,
        totalPages,
        setSearch,
        setPage,
        search
    } = useCategoriesContext();

    const [selectedCategory, setSelectedCategory] = useState<any | null>(null);


    useEffect(() => {
        fetchCategories();
    }, [search, setSearch, fetchCategories,])

    const handleViewCategory = (category: any) => {
        setSelectedCategory(category);
    };

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

    const handleBackToList = () => {
        setSelectedCategory(null);
    };

    if (selectedCategory) {
        return <Category category={selectedCategory} onBack={handleBackToList} />;
    }

    return (
        <CategoriesContainer>
            <TitleRow>
                <CategoriesTitle>Categories</CategoriesTitle>
                <SearchContainer>
                    <Search
                        type="text"
                        variant='small'
                        onSearch={triggerSearch}
                        search={search}
                        placeholder='Search'
                        onChange={(e) => setSearch(e.target.value)}
                        handleReset={handleReset}
                    />
                </SearchContainer>

            </TitleRow>
            {categories?.length !== 0 ? (
                <CategoriesWrapper>
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
                                categories?.map((category: any, index: number) => (
                                    <TableRow key={category.id} isOdd={index % 2 === 1}>
                                        <td>{category.name}</td>
                                        <td>{category.description}</td>
                                        <td>
                                            <ViewButton onClick={() => handleViewCategory(category)}>
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
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                >
                                    Previous
                                </PageButton>
                                <span>
                                    Page {currentPage} of {totalPages}
                                </span>
                                <PageButton
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage >= totalPages}
                                >
                                    Next
                                </PageButton>
                            </PaginationControls>
                        </PaginationContainer>
                    )}
                </CategoriesWrapper>
            ) : (
                <ProductsContainer>
                    <FancyContainer>
                        <NoProductsMessage>
                            {search ? (
                                <p>No results found for "{search}"</p>
                            ) : (
                                <p>No categories added at the moment.</p>
                            )}
                        </NoProductsMessage>
                    </FancyContainer>
                </ProductsContainer>
            )}
        </CategoriesContainer>
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

const TableRow = styled.tr<{ isOdd: boolean }>`
    background-color: ${({ isOdd }) => (isOdd ? '#160d35' : 'transparent')};
`;


const CenteredCell = styled.td`
    text-align: center;
    color: #999;
    font-size: 14px;
    padding: 2rem 0;
`;

const ProductsContainer = styled.div`
    flex-direction: column;
    p {
        font-size: 16px;
        color: white;
    }
`;

const TitleRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
`;

const NoProductsMessage = styled.div`
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
    padding: 1rem;
    margin-left: 26rem;
`;

const PaginationControls = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 1rem;
    
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
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
    font-family: Barlow, sans-serif;
    font-size: 14px;
    border-radius: 4px;
    &:hover {
        background-color: ${({ disabled }) => (disabled ? '#999' : '#2a1f51')};
    }
`;

const CategoriesTitle = styled.h2`
    font-family: Cinzel, serif;
    font-size: 24px;
    margin-bottom: 1rem;
    color: white;
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

const CategoriesContainer = styled.div`
         flex-direction: column;
    p {
        font-size: 16px;
        color: white;
    }
`;

const CategoriesWrapper = styled.div`
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

        span {
            color: white;
            font-family: Barlow;
            font-size: 14px;
            font-style: normal;
        }
    }
    td:hover {
        background-color: #2a1f51;
        color: #c79d0a;
    }
    tr:hover {
        background-color: #2a1f51;
        color: #c79d0a;
    }
`;
