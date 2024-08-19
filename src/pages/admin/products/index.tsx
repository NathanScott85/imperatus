import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useAdminContext } from '../../../context/admin';

export const AdminProducts = () => {
    const {
        products,
        loading,
        error,
        fetchProducts,
        currentPage,
        totalPages,
        setPage,
    } = useAdminContext();

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts, currentPage]);

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    return (
        <ProductsContainer>
            <ProductsWrapper>
                <Table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Stock Amount</th>
                            <th>Stock Status</th>
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
                            products?.map((product, index) => (
                                <TableRow
                                    key={product.id}
                                    isOdd={index % 2 === 1}
                                >
                                    <td>{product.name}</td>
                                    <td>{product.category.name}</td>
                                    <td>£{product.price}</td>
                                    <td>{product.stock.amount}</td>
                                    <td>
                                        {product.stock.amount > 0 ? (
                                            <span>{product.stock.instock}</span>
                                        ) : (
                                            <span>{product.stock.soldout}</span>
                                        )}
                                    </td>
                                </TableRow>
                            ))
                        )}
                    </tbody>
                </Table>
                <Pagination>
                    <PageButton
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </PageButton>
                    <PageButton
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </PageButton>
                </Pagination>
            </ProductsWrapper>
        </ProductsContainer>
    );
};

const ProductsContainer = styled.div`
    flex-direction: column;
    p {
        font-size: 16px;
        color: white;
    }
`;

const ProductsWrapper = styled.div`
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

    tr:hover {
        background-color: #2a1f51;
        color: #c79d0a;
    }
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

const Pagination = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 1rem;
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
