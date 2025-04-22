import React from 'react';
import styled from 'styled-components';

interface StatusTagProps {
    status: string;
}

const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
        case 'pending':
            return '#f39c12';
        case 'processing':
            return '#3498db';
        case 'shipped':
            return '#2ecc71';
        case 'cancelled':
            return '#e74c3c';
        case 'refunded':
            return '#9b59b6';
        default:
            return '#ccc';
    }
};

const formatStatus = (status: string) =>
    status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();

const Tag = styled.span<{ $color: string }>`
    color: ${(props) => props.$color};
    font-weight: bold;
    font-size: 14px;
    margin-left: 0.2rem;
`;

const StatusTag: React.FC<StatusTagProps> = ({ status }) => {
    return <Tag $color={getStatusColor(status)}>{formatStatus(status)}</Tag>;
};

export default StatusTag;
