import React, { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import { useAdminContext } from '../../../context/admin';
import moment from 'moment';
import { Search } from '../../../components/search';

export const Customers: React.FC = () => {
    const {
        isAdminOrOwner,
        users,
        loading,
        error,
        setPage,
        setSearch,
        totalPages,
        currentPage,
    } = useAdminContext();
    const [search, setSearchTerm] = useState(''); // Local state for search input

    const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const searchTerm = e.target.value;
        setSearchTerm(searchTerm);
        setPage(1);
        if (searchTerm === '') {
            setSearch('');
        }
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

    if (!isAdminOrOwner) {
        return <p>You do not have permission to view this content.</p>;
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <Span>Error loading users: {error.message}</Span>;

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
                            <th>Email</th>
                            <th>Date of Birth</th>
                            <th>Phone</th>
                            <th>Address</th>
                            <th>Email Verified</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.map((user) => (
                            <tr key={user.id}>
                                <td>{user.fullname}</td>
                                <td>{user.email}</td>
                                <td>
                                    {user.dob
                                        ? moment(user.dob).format('MM/DD/YYYY')
                                        : 'N/A'}
                                </td>
                                <td>{user.phone}</td>
                                <td>
                                    {user.address}, {user.city}, {user.postcode}
                                </td>
                                <td>{user.emailVerified ? 'Yes' : 'No'}</td>
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

    &:hover {
        background-color: ${({ disabled }) => (disabled ? '#999' : '#2a1f51')};
    }
`;
