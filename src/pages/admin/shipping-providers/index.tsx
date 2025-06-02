import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useShippingContext } from '../../../context/shipping';
import { Search } from '../../../components/search';
import Pagination from '../../../components/pagination';
import { FancyContainer } from '../../../components/fancy-container';
import moment from 'moment';
import { ShippingProviderDetail } from './update-provider';

export const ShippingProviders = () => {
    const {
        loadingProviders,
        errorProviders,
        providerSearch,
        setProviderSearch,
        totalPagesProviders,
        providerPage,
        setProviderPage,
        shippingProviders,
        fetchShippingProviders,
    } = useShippingContext();

    const [selectedProvider, setSelectedProvider] = useState<any | null>(null);

    useEffect(() => {
        fetchShippingProviders();
    }, [providerSearch, setProviderSearch, fetchShippingProviders]);

    const triggerSearch = () => {
        setProviderSearch(providerSearch);
    };
    const handleReset = () => {
        setProviderSearch('');
        setProviderPage(1);
    };
    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPagesProviders) {
            setProviderPage(newPage);
        }
    };

    const handleView = (provider: any) => setSelectedProvider(provider);

    const handleBack = () => {
        setSelectedProvider(null);
        fetchShippingProviders();
    };

    if (selectedProvider) {
        return (
            <ShippingProviderDetail
                provider={selectedProvider}
                onBack={handleBack}
            />
        );
    }

    return (
        <>
            <TitleRow>
                <Title>Shipping Providers</Title>
                <SearchContainer>
                    <Search
                        type="text"
                        variant="small"
                        onSearch={triggerSearch}
                        search={providerSearch}
                        placeholder="Search Providers..."
                        onChange={(e: any) => setProviderSearch(e.target.value)}
                        handleReset={handleReset}
                    />
                </SearchContainer>
            </TitleRow>
            <ShippingContainer>
                {shippingProviders?.length !== 0 ? (
                    <TableWrapper>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Created</th>
                                    <th>Updated</th>
                                    <th>View</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loadingProviders ? (
                                    <tr>
                                        <CenteredCell colSpan={4}>
                                            Loading...
                                        </CenteredCell>
                                    </tr>
                                ) : errorProviders ? (
                                    <tr>
                                        <CenteredCell colSpan={4}>
                                            Error: {errorProviders.message}
                                        </CenteredCell>
                                    </tr>
                                ) : (
                                    shippingProviders.map(
                                        (provider: any, index: number) => (
                                            <TableRow
                                                key={provider.id}
                                                isOdd={index % 2 === 1}
                                            >
                                                <td>{provider.name}</td>
                                                <td>
                                                    {provider.createdAt &&
                                                    moment(
                                                        Number(
                                                            provider.createdAt,
                                                        ),
                                                    ).isValid()
                                                        ? moment(
                                                              Number(
                                                                  provider.createdAt,
                                                              ),
                                                          ).format('DD-MM-YYYY')
                                                        : '—'}
                                                </td>
                                                <td>
                                                    {provider.updatedAt &&
                                                    moment(
                                                        Number(
                                                            provider.updatedAt,
                                                        ),
                                                    ).isValid()
                                                        ? moment(
                                                              Number(
                                                                  provider.updatedAt,
                                                              ),
                                                          ).format('DD-MM-YYYY')
                                                        : '—'}
                                                </td>
                                                <td>
                                                    <ViewButton
                                                        onClick={() =>
                                                            handleView(provider)
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
                        <Pagination
                            currentPage={providerPage}
                            totalPages={totalPagesProviders}
                            onPageChange={handlePageChange}
                        />
                    </TableWrapper>
                ) : (
                    <FancyContainer type="small" size="small">
                        <NoResults>
                            {providerSearch ? (
                                <p>No results found for “{providerSearch}”</p>
                            ) : (
                                <p>No shipping providers added.</p>
                            )}
                        </NoResults>
                    </FancyContainer>
                )}
            </ShippingContainer>
        </>
    );
};

const ShippingContainer = styled.div`
    color: white;
    display: grid;
    padding: 2rem;
    background-color: #160d35;
    border: 1px solid #4d3c7b;
    border-radius: 8px;
    width: 100%;
    margin: 0 auto;
`;

const TitleRow = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 0.75rem;
`;

const Title = styled.h2`
    font-family: Cinzel, serif;
    font-size: 24px;
    color: white;
`;

const SearchContainer = styled.div`
    margin-left: auto;
    max-width: 325px;
    width: 100%;
`;

const TableWrapper = styled.div`
    margin-top: 1rem;
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
    }

    th {
        background-color: #4d3c7b;
        color: #fff;
        font-family: Cinzel;
        font-size: 14px;
    }

    td {
        font-family: Barlow;
        font-size: 14px;
    }

    td:hover,
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
    justify-content: center;
    align-items: center;
    font-size: 24px;
    color: white;
    font-family: Cinzel;
    padding: 6rem;
    text-align: center;
    font-weight: 700;
`;
