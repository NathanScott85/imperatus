import React, { useEffect, useState, useDeferredValue } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { FancyContainer } from '../../../components/fancy-container';
import { usePromotionsContext } from '../../../context/promotions';
import { Promotion } from './promotion';
import { Input } from '../../../components/input';
import Pagination from '../../../components/pagination';

export const AdminPromotions = () => {
    const {
        promotions,
        fetchPromotions,
        loading,
        error,
        totalPages,
        setPage,
        page,
        setSearch,
        limit,
    } = usePromotionsContext();

    const [selectedPromotion, setSelectedPromotion] = useState<any | null>(
        null,
    );
    const [searchQuery, setSearchQuery] = useState<string>('');

    const deferredSearchQuery = useDeferredValue(searchQuery);

    useEffect(() => {
        setSearch(deferredSearchQuery);
        fetchPromotions();
    }, [deferredSearchQuery, fetchPromotions, setSearch, limit]);

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    const handleViewPromotion = (promotion: any) => {
        setSelectedPromotion(promotion);
    };

    const handleBackToList = () => {
        setSelectedPromotion(null);
    };

    if (selectedPromotion) {
        return (
            <Promotion
                promotion={selectedPromotion}
                onBack={handleBackToList}
            />
        );
    }

    return (
        <PromotionsContainer>
            <TitleRow>
                <PromotionsTitle>Promotions</PromotionsTitle>
                <SearchContainer>
                    <StyledInput
                        variant="secondary"
                        size="small"
                        placeholder="Search promotions..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {searchQuery && (
                        <ClearButton onClick={() => setSearchQuery('')}>
                            ✕
                        </ClearButton>
                    )}
                </SearchContainer>
            </TitleRow>
            {promotions?.length !== 0 ? (
                <PromotionsWrapper>
                    <Table>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Start Date</th>
                                <th>End Date</th>
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
                                promotions?.map(
                                    (promotion: any, index: number) => (
                                        <TableRow
                                            key={promotion.id}
                                            isOdd={index % 2 === 1}
                                        >
                                            <td>{promotion.title}</td>
                                            <td>{promotion.description}</td>
                                            <td>
                                                {moment(
                                                    promotion.startDate,
                                                ).format('DD/MM/YYYY')}
                                            </td>
                                            <td>
                                                {moment(
                                                    promotion.endDate,
                                                ).format('DD/MM/YYYY')}
                                            </td>
                                            <td>
                                                <ViewButton
                                                    onClick={() =>
                                                        handleViewPromotion(
                                                            promotion,
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
                    {totalPages > 1 && (
                        <Pagination
                            currentPage={page}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    )}
                </PromotionsWrapper>
            ) : (
                <ProductsContainer>
                    <FancyContainer>
                        <NoPromotionsMessage>
                            {searchQuery ? (
                                <p>
                                    No results found for &quot;{searchQuery}
                                    &quot;
                                </p>
                            ) : (
                                <p>No promotions available at the moment.</p>
                            )}
                        </NoPromotionsMessage>
                    </FancyContainer>
                </ProductsContainer>
            )}
        </PromotionsContainer>
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

const ClearButton = styled.button`
    position: absolute;
    right: 1rem;
    background: none;
    border: none;
    color: white;
    z-index: 999;
    font-size: 16px;
    cursor: pointer;

    &:hover {
        color: #c79d0a;
    }
`;

const TitleRow = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 0.75rem;
`;

const PromotionsContainer = styled.div`
    color: white;
    display: grid;
    flex-direction: column;
    padding: 2rem;
    background-color: #160d35;
    border: 1px solid #4d3c7b;
    border-radius: 8px;
    width: 100%;
    margin: 0 auto;
    p {
        font-size: 16px;
        color: white;
    }
`;

const PromotionsTitle = styled.h2`
    font-family: Cinzel, serif;
    font-size: 24px;
    margin-bottom: 1rem;
    color: white;
`;

const StyledInput = styled(Input)`
    margin-left: auto;
    max-width: 300px;
    border-radius: 3px;
`;

const PromotionsWrapper = styled.div`
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

const NoPromotionsMessage = styled.div`
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
        font-family: Cinzel, serif;
        font-size: 24px;
        font-weight: 700;
        padding: 6rem;
    }
`;

const ProductsContainer = styled.div`
    flex-direction: column;
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

export default AdminPromotions;
