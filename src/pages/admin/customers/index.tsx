import React, { useEffect, useState, KeyboardEvent } from 'react';
import styled from 'styled-components';
import { FancyContainer } from '../../../components/fancy-container';
import { useAdminContext } from '../../../context/admin';

import { Search } from '../../../components/search';
import { Customer } from './customer';
import { Roles } from '../../../types';
import { Eye } from '../../../components/svg';

interface CustomerType {
    id: number;
    fullname: string;
    email: string;
    dob: Date;
    phone: string;
    address: string;
    city: string;
    postcode: string;
    userRoles: Roles[];
}

export const Customers: React.FC = () => {
    const {
        users,
        loading,
        error,
        page,
        setPage,
        search,
        setSearch,
        totalPages,
        fetchUsers,
    } = useAdminContext();

    const [selectedCustomer, setSelectedCustomer] =
        useState<CustomerType | null>(null);
    const [visibleDetails, setVisibleDetails] = useState<{ [key: string]: boolean }>({});

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const handleViewCustomer = (customer: any) => {
        setSelectedCustomer(customer);
    };

    const triggerSearch = () => {
        setSearch(search);
    };

    const handleReset = () => {
        setSearch('');
        setPage(1);
    };

    const handlePageChange = (newPage: number) => {
        if (!loading && newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    const toggleVisibility = (userId: string) => {
        setVisibleDetails((prev) => ({
            ...prev,
            [userId]: !prev[userId],
        }));
    };

    const handleBackToList = () => {
        setSelectedCustomer(null);
    };

    if (selectedCustomer) {
        return (
            <Customer
                customer={selectedCustomer}
                onBack={handleBackToList}
                userRoles={selectedCustomer.userRoles}
            />
        );
    }

    return (
        <ProductsContainer>
            <TitleRow>
                <CustomersTitle>Customers</CustomersTitle>
                <SearchContainer>
                    <Search
                        type="text"
                        variant="small"
                        onSearch={triggerSearch}
                        search={search}
                        placeholder="Search Customers..."
                        onChange={(e) => setSearch(e.target.value)}
                        handleReset={handleReset}
                    />
                </SearchContainer>
            </TitleRow>

            {users?.length !== 0 ? (
                <CustomersWrapper>
                    <Table>
                        <thead>
                            <tr>
                                <th>Full Name</th>
                                <th>Display</th>
                                <th>Email</th>
                                <th>Date of Birth</th>
                                <th>Phone</th>
                                <th>Address</th>
                                <th>View</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <CenteredCell colSpan={7}>Loading...</CenteredCell>
                                </tr>
                            ) : error ? (
                                <tr>
                                    <CenteredCell colSpan={7}>
                                        Error: {error.message}
                                    </CenteredCell>
                                </tr>
                            ) : (
                                users?.map((user) => (
                                    <TableRow key={user.id}>
                                        <td>{user.fullname}</td>
                                        <td>
                                            <EyeIcon
                                                onClick={() =>
                                                    toggleVisibility(user.id.toString())
                                                }
                                            >
                                                <Eye />
                                            </EyeIcon>
                                        </td>
                                        <td>
                                            {visibleDetails[user.id] ? (
                                                <span>{user.email}</span>
                                            ) : (
                                                <span>...</span>
                                            )}
                                        </td>
                                        <td>
                                            {visibleDetails[user.id] ? (
                                                user.dob ? (
                                                    <span>
                                                        {user.dob}
                                                    </span>
                                                ) : (
                                                    <span>N/A</span>
                                                )
                                            ) : (
                                                <span>...</span>
                                            )}
                                        </td>
                                        <td>
                                            {visibleDetails[user.id] ? (
                                                <span>{user.phone}</span>
                                            ) : (
                                                <span>...</span>
                                            )}
                                        </td>
                                        <td>
                                            {visibleDetails[user.id] ? (
                                                <span>
                                                    {user.address}, <br />
                                                    {user.city}, {user.postcode}
                                                </span>
                                            ) : (
                                                <span>...</span>
                                            )}
                                        </td>
                                        <td>
                                            <ViewButton onClick={() => handleViewCustomer(user)}>
                                                View
                                            </ViewButton>
                                        </td>
                                    </TableRow>
                                ))
                            )}
                        </tbody>
                    </Table>
                    {totalPages > 1 && (
                        <Pagination>
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
                        </Pagination>
                    )}
                </CustomersWrapper>
            ) : (
                <ProductsContainer>
                    <FancyContainer>
                        <NoResultsMessage>
                            {search ? (
                                <p>No results found for "{search}"</p>
                            ) : (
                                <p>No customers added at the moment.</p>
                            )}
                        </NoResultsMessage>
                    </FancyContainer>
                </ProductsContainer>
            )}
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

const TitleRow = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 0.75rem;
`;

const CustomersTitle = styled.h2`
    font-family: Cinzel, serif;
    font-size: 24px;
    margin-bottom: 1rem;
    color: white;
`;

const SearchContainer = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    margin-left: auto;
    max-width: 325px;
    width: 100%;
`;

const EyeIcon = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    margin: 0;
    display: flex;
    align-items: center;

    svg {
        width: 24px;
        height: 24px;
        fill: none;
        stroke: #0f172a;
        stroke-width: 1.5;
        stroke-linecap: round;
        stroke-linejoin: round;
    }

    &:hover svg {
        stroke: #c79d0a;
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



const CustomersWrapper = styled.div`
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
const CenteredCell = styled.td`
    text-align: center;
    color: #999;
    font-size: 14px;
    padding: 2rem 0;
`;

const Pagination = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
`;

const PaginationControls = styled.div`
    display: flex;
    align-items: center;
    margin: 1rem;
`;

const NoResultsMessage = styled.div`
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


const TableRow = styled.tr`
    background-color: transparent;
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
