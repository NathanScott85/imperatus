import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAdminContext } from '../../../context/admin';
import moment from 'moment';
import { Search } from '../../../components/search';
import { Customer } from './customer';
import { useAppContext } from '../../../context';

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
        setPage,
        setSearch,
        totalPages,
        currentPage,
        fetchUsers,
    } = useAdminContext();
    const { isAdminOrOwner } = useAppContext();
    const [selectedCustomer, setSelectedCustomer] =
        useState<CustomerType | null>(null);
    const [search, setSearchTerm] = useState('');
    const [visibleDetails, setVisibleDetails] = useState<{
        [key: string]: boolean;
    }>({});

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers, currentPage]);

    const handleSearchInputChange = (e: any) => {
        const searchTerm = e.target.value;
        setSearchTerm(searchTerm);
        setPage(1);
        if (searchTerm === '') {
            setSearch('');
        }
    };

    const handleViewCustomer = (customer: any) => {
        setSelectedCustomer(customer);
    };

    const triggerSearch = () => {
        setSearch(search);
    };

    const handleReset = () => {
        setSearchTerm('');
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

    if (!isAdminOrOwner) {
        return <p>You do not have permission to view this content.</p>;
    }

    if (loading) return <p>loading....</p>;
    if (error) return <Span>Error loading users: {error.message}</Span>;

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
        <CustomersContainer>
            <CustomersWrapper>
                <CustomersHeader>
                    <CustomersTitle>Customers</CustomersTitle>
                    <Search
                        type="text"
                        onSearch={triggerSearch}
                        search={search}
                        onChange={handleSearchInputChange}
                        handleReset={handleReset}
                    />
                </CustomersHeader>

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
                                <LoadingCell colSpan={7}>
                                    Loading...
                                </LoadingCell>
                            </tr>
                        ) : error ? (
                            <tr>
                                <ErrorCell colSpan={7}>
                                    Error loading users: {error.message}
                                </ErrorCell>
                            </tr>
                        ) : (
                            users?.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.fullname}</td>
                                    <td>
                                        <EyeIcon
                                            onClick={() =>
                                                toggleVisibility(
                                                    user.id.toString(),
                                                )
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
                                                    {moment(user.dob).format(
                                                        'MM/DD/YYYY',
                                                    )}
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
                                                {user.city},{user.postcode}
                                            </span>
                                        ) : (
                                            <span>...</span>
                                        )}
                                    </td>
                                    <td>
                                        <ViewButton
                                            onClick={() =>
                                                handleViewCustomer(user)
                                            }
                                        >
                                            View
                                        </ViewButton>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </Table>
                {loading && (
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
                )}
            </CustomersWrapper>
        </CustomersContainer>
    );
};

const CustomersHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const CustomersTitle = styled.h2`
    font-family: Cinzel, serif;
    font-size: 24px;
    margin-bottom: 1rem;
    color: white;
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

const Span = styled.span`
    color: #fff;
    font-family: Cinzel;
    font-size: 14px;
    font-style: normal;
    font-weight: bold;
`;

const CustomersContainer = styled.div`
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

const CustomersWrapper = styled.div`
    display: flex;
    flex-direction: column;
    border-radius: 8px;
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

const ErrorCell = styled.td`
    text-align: center;
    padding: 2rem;
    color: red;
    font-size: 14px;
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
