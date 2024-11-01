import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useCategoriesContext } from '../../../context/categories';
import { Category } from './category';

export const AdminCategories = () => {
    const {
        categories,
        loading,
        error,
        fetchCategories,
        page,
        nextPage,
        previousPage,
        totalCount,
        limit
    } = useCategoriesContext();
    const [selectedCategory, setSelectedCategory] = useState<any | null>( null );

    useEffect( () => {
        fetchCategories();
    }, [fetchCategories] );

    const handleViewCategory = ( category: any ) => {
        setSelectedCategory( category );
    };

    const handleBackToList = () => {
        setSelectedCategory( null );
    };

    if ( loading ) return <p>Loading...</p>;
    if ( error ) return <Span>Error loading categories: {error.message}</Span>;

    if ( selectedCategory ) {
        return (
            <Category category={selectedCategory} onBack={handleBackToList} />
        );
    }

    return (
        <CategoriesContainer>
            <CategoriesTitle>Categories</CategoriesTitle>
            <CategoriesWrapper>
                <Table>
                    <thead>
                        <tr>
                            <th>Category Name</th>
                            <th>Description</th>
                            <th>View</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.length > 0 ? (
                            categories.map( ( category: any ) => (
                                <tr key={category.id}>
                                    <td>{category.name}</td>
                                    <td>{category.description}</td>
                                    <td>
                                        <ViewButton
                                            onClick={() =>
                                                handleViewCategory( category )
                                            }
                                        >
                                            View
                                        </ViewButton>
                                    </td>
                                </tr>
                            ) )
                        ) : (
                            <tr>
                                <LoadingCell colSpan={3}>
                                    No categories available
                                </LoadingCell>
                            </tr>
                        )}
                    </tbody>
                </Table>
                <PaginationContainer>
                    <PaginationControls>
                        <PageButton onClick={previousPage} disabled={page === 1}>
                            Previous
                        </PageButton>
                        <span>Page {page} of {Math.ceil( totalCount / limit )}</span>
                        <PageButton onClick={nextPage} disabled={page >= Math.ceil( totalCount / limit )}>
                            Next
                        </PageButton>
                    </PaginationControls>
                </PaginationContainer>
            </CategoriesWrapper>
        </CategoriesContainer>
    );
};

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
    background-color: ${( { disabled } ) => ( disabled ? '#999' : '#4d3c7b' )};
    color: #fff;
    border: none;
    padding: 0.5rem 1rem;
    cursor: ${( { disabled } ) => ( disabled ? 'not-allowed' : 'pointer' )};
    font-family: Barlow, sans-serif;
    font-size: 14px;
    border-radius: 4px;
    &:hover {
        background-color: ${( { disabled } ) => ( disabled ? '#999' : '#2a1f51' )};
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

const Span = styled.span`
    color: #fff;
    font-family: Cinzel;
    font-size: 14px;
    font-style: normal;
    font-weight: bold;
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

const LoadingCell = styled.td`
    text-align: center;
    padding: 2rem;
    color: #999;
    font-size: 14px;
`;
