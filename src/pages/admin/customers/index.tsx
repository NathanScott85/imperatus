import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAdminContext } from '../../../context/admin';
import moment from 'moment';
import { Search } from '../../../components/search';
import { Customer } from './customer';
import { useAppContext } from '../../../context';
import { Loading } from '../../loading';
import { Roles } from '../../../types';

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
    }, [fetchUsers]);

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
        setPage(newPage);
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

    if (loading) return <Loading />;
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
        <CustomersMain>
            <CustomersSection>
                <Search
                    type="text"
                    onSearch={triggerSearch}
                    search={search}
                    onChange={handleSearchInputChange}
                    handleReset={handleReset}
                />
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
                        {users?.map((user) => (
                            <tr key={user.id}>
                                <td>{user.fullname}</td>
                                <td>
                                    <EyeIcon
                                        onClick={() =>
                                            toggleVisibility(user.id.toString())
                                        }
                                    >
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M2.0355 12.3248C1.96642 12.1176 1.96635 11.8932 2.03531 11.6859C3.42368 7.51216 7.36074 4.50244 12.0008 4.50244C16.6386 4.50244 20.5742 7.50937 21.9643 11.68C22.0334 11.8873 22.0334 12.1117 21.9645 12.319C20.5761 16.4927 16.639 19.5024 11.999 19.5024C7.36115 19.5024 3.42559 16.4955 2.0355 12.3248Z"
                                                stroke="white"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M15 12.0024C15 13.6593 13.6568 15.0024 12 15.0024C10.3431 15.0024 8.99995 13.6593 8.99995 12.0024C8.99995 10.3456 10.3431 9.00244 12 9.00244C13.6568 9.00244 15 10.3456 15 12.0024Z"
                                                stroke="white"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
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
                                        onClick={() => handleViewCustomer(user)}
                                    >
                                        View
                                    </ViewButton>
                                </td>
                            </tr>
                        ))}
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
            </CustomersSection>
        </CustomersMain>
    );
};

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

const CustomersMain = styled.main`
    flex-direction: column;
    p {
        font-size: 16px;
        color: white;
    }
`;

const CustomersSection = styled.section`
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
