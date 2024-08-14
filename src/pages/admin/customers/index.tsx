import React from 'react';
import styled from 'styled-components';
import { useAdminContext } from '../../../context/admin';
import moment from 'moment';

export const Customers = () => {
    const { isAdminOrOwner, users, loading, error } = useAdminContext();

    if (!isAdminOrOwner) {
        return <p>You do not have permission to view this content.</p>;
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading users: {error.message}</p>;

    return (
        <CustomersMain>
            <CustomersSection>
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
            </CustomersSection>
        </CustomersMain>
    );
};

const CustomersMain = styled.main`
    flex-direction: column;
    p {
        font-size: 16px;
        color: white;
    }
`;

const CustomersSection = styled.section`
    padding: 1.5rem;
    border-radius: 8px;
    border: 1px solid #4d3c7b;
    width: 100%;
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-top: 1rem;
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
