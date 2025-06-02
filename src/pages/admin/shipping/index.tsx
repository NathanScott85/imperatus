import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FancyContainer } from '../../../components/fancy-container';
import { Search } from '../../../components/search';
import { useShippingContext } from '../../../context/shipping';
import Pagination from '../../../components/pagination';
import { ShippingOptionDetail } from './update-shipping';

export const Shipping = () => {
    const {
        shippingOptions,
        page,
        totalPagesOptions,
        setPage,
        loadingOptions,
        errorOptions,
        search,
        setSearch,
        fetchShippingOptions,
    } = useShippingContext();

    const [selectedShipping, setSelectedShipping] = useState<any | null>(null);

    useEffect(() => {
        fetchShippingOptions();
    }, [search, setSearch, fetchShippingOptions]);

    const triggerSearch = () => {
        setSearch(search);
        setPage(1);
        fetchShippingOptions();
    };

    const handleReset = () => {
        setSearch('');
        setPage(1);
    };

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPagesOptions) {
            setPage(newPage);
        }
    };

    const handleView = (option: any) => setSelectedShipping(option);

    const handleBack = () => {
        setSelectedShipping(null);
        fetchShippingOptions();
    };

    if (selectedShipping) {
        return (
            <ShippingOptionDetail
                option={selectedShipping}
                onBack={handleBack}
            />
        );
    }

    return (
        <>
            <TitleRow>
                <Title>Shipping Options</Title>
                <SearchContainer>
                    <Search
                        type="text"
                        variant="small"
                        onSearch={triggerSearch}
                        search={search}
                        placeholder="Search Shipping Options"
                        onChange={(e) => setSearch(e.target.value)}
                        handleReset={handleReset}
                    />
                </SearchContainer>
            </TitleRow>
            <Container>
                {shippingOptions?.length !== 0 ? (
                    <Wrapper>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Provider</th>
                                    <th>Cost</th>
                                    <th>Estimated Days</th>
                                    <th>Description</th>
                                    <th>View</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loadingOptions ? (
                                    <tr>
                                        <CenteredCell>Loading...</CenteredCell>
                                    </tr>
                                ) : errorOptions ? (
                                    <tr>
                                        <CenteredCell>
                                            Error: {errorOptions.message}
                                        </CenteredCell>
                                    </tr>
                                ) : (
                                    shippingOptions.map((option, index) => (
                                        <TableRow
                                            key={option.id}
                                            isOdd={index % 2 === 1}
                                        >
                                            <td>{option.name}</td>
                                            <td>{option.provider.name}</td>
                                            <td>£{option.cost}</td>
                                            <td>{option.estimatedDays}</td>
                                            <td>
                                                {option.description || 'N/A'}
                                            </td>
                                            <td>
                                                <ViewButton
                                                    onClick={() =>
                                                        handleView(option)
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
                        {totalPagesOptions > 1 && (
                            <Pagination
                                currentPage={page}
                                totalPages={totalPagesOptions}
                                onPageChange={handlePageChange}
                            />
                        )}
                    </Wrapper>
                ) : (
                    <FancyContainer>
                        <NoResults>
                            {search ? (
                                <p>No results found for "{search}"</p>
                            ) : (
                                <p>No Shipping Options added yet.</p>
                            )}
                        </NoResults>
                    </FancyContainer>
                )}
            </Container>
        </>
    );
};

const Container = styled.div`
    flex-direction: column;
    padding: 1rem;
    border: 1px solid #4d3c7b;
    p {
        font-size: 16px;
        color: white;
    }
`;

const Title = styled.h2`
    font-family: Cinzel, serif;
    font-size: 24px;
    margin-bottom: 1rem;
    color: white;
`;

const TitleRow = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 0.75rem;
`;

const SearchContainer = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    margin-left: auto;
    max-width: 325px;
    width: 100%;
`;

const Wrapper = styled.div`
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

const NoResults = styled.div`
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
