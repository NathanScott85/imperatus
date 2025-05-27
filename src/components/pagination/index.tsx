import React from 'react';
import styled from 'styled-components';
import { ChevronDoubleLeft, ChevronLeft } from '../svg/chevron-left';
import { ChevronDoubleRight, ChevronRight } from '../svg/chevron-right';

interface Props {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const getCompactPages = (
    current: number,
    total: number,
): (number | '...')[] => {
    if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);

    const pages: (number | '...')[] = [1];

    if (current > 3) pages.push('...');

    const start = Math.max(2, current - 1);
    const end = Math.min(total - 1, current + 1);

    for (let i = start; i <= end; i++) {
        pages.push(i);
    }

    if (current < total - 2) pages.push('...');

    pages.push(total);
    return pages;
};

export const Pagination: React.FC<Props> = ({
    currentPage,
    totalPages,
    onPageChange,
}) => {
    if (totalPages <= 1) return null;

    const handlePrev = () => currentPage > 1 && onPageChange(currentPage - 1);
    const handleNext = () =>
        currentPage < totalPages && onPageChange(currentPage + 1);

    return (
        <PaginationControls>
            <ChevronGroup>
                {totalPages > 5 && (
                    <PaginationButton
                        aria-label="First page"
                        onClick={() => onPageChange(1)}
                        disabled={currentPage === 1}
                    >
                        <ChevronDoubleLeft />
                    </PaginationButton>
                )}
                <PaginationButton
                    aria-label="Previous page"
                    onClick={handlePrev}
                    disabled={currentPage === 1}
                >
                    <ChevronLeft />
                </PaginationButton>
            </ChevronGroup>

            {getCompactPages(currentPage, totalPages).map((page, idx) =>
                page === '...' ? (
                    <PageNumber
                        key={`ellipsis-${idx}`}
                        onClick={() =>
                            onPageChange(
                                idx === 1
                                    ? Math.max(1, currentPage - 5)
                                    : Math.min(totalPages, currentPage + 5),
                            )
                        }
                    >
                        ...
                    </PageNumber>
                ) : (
                    <PageNumber
                        key={page}
                        className={currentPage === page ? 'active' : ''}
                        onClick={() => onPageChange(page)}
                    >
                        {page}
                    </PageNumber>
                ),
            )}

            <ChevronGroup>
                <PaginationButton
                    aria-label="Next page"
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                >
                    <ChevronRight stroke="#ac8fff" />
                </PaginationButton>
                {totalPages > 5 && (
                    <PaginationButton
                        aria-label="Last page"
                        onClick={() => onPageChange(totalPages)}
                        disabled={currentPage === totalPages}
                    >
                        <ChevronDoubleRight />
                    </PaginationButton>
                )}
            </ChevronGroup>
        </PaginationControls>
    );
};

export default Pagination;

const ChevronGroup = styled.div`
    display: flex;
`;

const PaginationControls = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    margin-top: 2rem;
`;

const PaginationButton = styled.button`
    background: transparent;
    border: none;
    color: #fff;
    cursor: pointer;
    font-size: 16px;
    text-align: center;
    &:hover {
        color: #6f4ef2;
    }

    &:disabled {
        color: #555;
        cursor: not-allowed;
    }
    svg {
        display: inline-block;
        vertical-align: middle;
        margin-left: -0.75rem;
        margin-top: 0.25rem;
    }
`;

const PageNumber = styled.span`
    color: #fff;
    cursor: pointer;
    font-size: 16px;

    &.active {
        font-weight: bold;
        color: #c79d0a;
    }

    &:hover {
        color: #c79d0a;
    }
`;
