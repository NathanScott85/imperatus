import React, { useState } from 'react';
import styled from 'styled-components';
import { useCategoriesContext } from '../../../context/categories';
import { Category } from './category';
import { FancyContainer } from '../../../components/fancy-container';
import { Search } from '../../../components/search';
import { useDebouncedEffect } from '../../../lib';
import Pagination from '../../../components/pagination';

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
        search,
    } = useCategoriesContext();

    interface CategoryType {
        id: string;
        name: string;
        description: string;
    }

    const [selectedCategory, setSelectedCategory] =
        useState<CategoryType | null>(null);

    useDebouncedEffect(
        () => {
            fetchCategories();
        },
        [search, setSearch, fetchCategories],
        1500,
    );

    const handleViewCategory = (category: CategoryType) => {
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
        return (
            <Category category={selectedCategory} onBack={handleBackToList} />
        );
    }

    return (
        <CategoriesContainer>
            <TitleRow>
                <CategoriesTitle>Categories</CategoriesTitle>
                <SearchContainer>
                    <Search
                        type="text"
                        variant="small"
                        onSearch={triggerSearch}
                        search={search}
                        placeholder="Search"
                        onChange={(e) => setSearch(e.target.value)}
                        handleReset={handleReset}
                    />
                </SearchContainer>
            </TitleRow>
            {categories?.length !== 0 ? (
                <>
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
                                        <CenteredCell>
                                            Error: {error.message}
                                        </CenteredCell>
                                    </tr>
                                ) : (
                                    categories?.map(
                                        (
                                            category: CategoryType,
                                            index: number,
                                        ) => (
                                            <TableRow
                                                key={category.id}
                                                isOdd={index % 2 === 1}
                                            >
                                                <td>{category.name}</td>
                                                <td>{category.description}</td>
                                                <td>
                                                    <ViewButton
                                                        onClick={() =>
                                                            handleViewCategory(
                                                                category,
                                                            )
                                                        }
                                                    >
                                                        View
                                                    </ViewButton>
                                                </td>
                                            </TableRow>
                                        ),
                                    )
                                )}
                            </tbody>
                        </Table>
                    </CategoriesWrapper>
                    {totalPages > 1 && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    )}
                </>
            ) : (
                <ProductsContainer>
                    <FancyContainer>
                        <NoProductsMessage>
                            {search ? (
                                <p>No results found for &quot;{search}&quot;</p>
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
    background-color: ${({ isOdd }) => (isOdd ? '#1e1245' : '#160d35')};
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
    color: white;
    display: grid;
    flex-direction: column;
    padding: 2rem;
    background-color: #160d35;
    border: 1px solid #4d3c7b;

    width: 100%;
    margin: 0 auto;

    p {
        font-size: 16px;
        color: white;
    }
`;

const CategoriesWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center
    padding: 1rem;

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
