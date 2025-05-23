import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Product } from './product';
import { FancyContainer } from '../../../components/fancy-container';
import { Search } from '../../../components/search';
import { useProductsContext } from '../../../context/products';
import Pagination from '../../../components/pagination';

export const AdminProducts = () => {
    const {
        loading,
        error,
        search,
        setSearch,
        totalPages,
        page,
        setPage,
        products,
        fetchProducts,
    } = useProductsContext();

    const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

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

    const handleViewProduct = (product: any) => {
        setSelectedProduct(product);
    };

    const handleBackToList = () => {
        setSelectedProduct(null);
        fetchProducts();
    };

    if (selectedProduct) {
        return <Product product={selectedProduct} onBack={handleBackToList} />;
    }

    return (
        <ProductsContainer>
            <TitleRow>
                <ProductsTitle>Products</ProductsTitle>
                <SearchContainer>
                    <Search
                        type="text"
                        variant="small"
                        onSearch={triggerSearch}
                        search={search}
                        placeholder="Search Products"
                        onChange={(e) => setSearch(e.target.value)}
                        handleReset={handleReset}
                    />
                </SearchContainer>
            </TitleRow>

            {products?.length !== 0 ? (
                <ProductsWrapper>
                    <Table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Brand</th>
                                <th>Set</th>
                                <th>Preorder</th>
                                <th>Price</th>
                                <th>Stock</th>
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
                                products?.map((product, index) => (
                                    <TableRow
                                        key={product.id}
                                        isOdd={index % 2 === 1}
                                    >
                                        <td>{product.name}</td>
                                        <td>
                                            {product.category?.name || 'N/A'}
                                        </td>
                                        <td>{product?.brand?.name || 'N/A'}</td>
                                        <td>{product.set?.setName || 'N/A'}</td>
                                        <PreOrderCell
                                            $preorder={product.preorder}
                                        >
                                            {product.preorder ? 'YES' : 'NO'}
                                        </PreOrderCell>
                                        <td>£{product.price}</td>
                                        <td>
                                            {product.stock?.amount ?? 'N/A'}
                                        </td>
                                        <td>
                                            <ViewButton
                                                onClick={() =>
                                                    handleViewProduct(product)
                                                }
                                            >
                                                View
                                            </ViewButton>
                                        </td>
                                    </TableRow>
                                ))
                            )}
                        </tbody>
                    </Table>
                    {totalPages > 1 && (
                        <Pagination
                            currentPage={page}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    )}
                </ProductsWrapper>
            ) : (
                <ProductsContainer>
                    <FancyContainer>
                        <NoProductsMessage>
                            {search ? (
                                <p>No results found for &quot;{search}&quot;</p>
                            ) : (
                                <p>No Products added at the moment.</p>
                            )}
                        </NoProductsMessage>
                    </FancyContainer>
                </ProductsContainer>
            )}
        </ProductsContainer>
    );
};

const PreOrderCell = styled.td<{ $preorder: boolean }>`
    text-transform: uppercase;
    font-weight: bold;
    color: ${({ $preorder }) => ($preorder ? '#4CAF50' : '#FF4D4F')} !important;
`;

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

const ProductsTitle = styled.h2`
    font-family: Cinzel, serif;
    font-size: 24px;
    margin-bottom: 1rem;
    color: white;
`;

const ProductsContainer = styled.div`
    flex-direction: column;
    padding: 1rem;
    border: 1px solid #4d3c7b;
    p {
        font-size: 16px;
        color: white;
    }
`;

const ProductsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
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
    background-color: ${({ isOdd }) => (isOdd ? '#1e1245' : '#160d35')};
`;

const CenteredCell = styled.td`
    text-align: center;
    color: #999;
    font-size: 14px;
    padding: 2rem 0;
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
