import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useCarouselContext } from '../.././../../context/carousel';
import { FancyContainer } from '../../../../components/fancy-container';
import { UpdateCarousel } from '../update-carousel';
import { Modal } from '../../../../components/modal';
import { Search } from '../../../../components/search';
import Pagination from '../../../../components/pagination';

export const ManageCarousel = () => {
    const {
        carousel,
        loading,
        error,
        fetchCarousel,
        totalPages,
        search,
        setSearch,
        page,
        setPage,
    } = useCarouselContext();

    const [selectedCarouselPage, setSelectedCarouselPage] = useState<
        any | null
    >(null);
    const [selectedThumbnail, setSelectedThumbnail] = useState<string | null>(
        null,
    );

    useEffect(() => {
        fetchCarousel();
    }, [search, page, fetchCarousel]);

    const handleViewPage = (page: any) => {
        setSelectedCarouselPage(page);
    };

    const handleThumbnailClick = (imageUrl: string) => {
        setSelectedThumbnail(imageUrl);
    };

    const handleCloseThumbnailModal = () => {
        setSelectedThumbnail(null);
    };

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    const triggerSearch = () => {
        setSearch(search);
    };

    const handleReset = () => {
        setSearch('');
        setPage(1);
    };

    const handleBackToList = () => {
        setSelectedCarouselPage(null);
    };

    if (selectedCarouselPage) {
        return (
            <UpdateCarousel
                carousel={selectedCarouselPage}
                onBack={handleBackToList}
            />
        );
    }
    const allPages =
        carousel?.flatMap((carouselPage: any) => carouselPage.pages) || [];

    return (
        <>
            <TitleRow>
                <CarouselTitle>Manage Carousel</CarouselTitle>
                <SearchContainer>
                    <Search
                        type="text"
                        variant="small"
                        onSearch={triggerSearch}
                        search={search}
                        placeholder="Search Carousel"
                        onChange={(e) => setSearch(e.target.value)}
                        handleReset={handleReset}
                    />
                </SearchContainer>
            </TitleRow>
            <CarouselContainer>
                {allPages.length > 0 ? (
                    <CarouselWrapper>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Image</th>
                                    <th>Status</th>
                                    <th>View</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <CenteredCell colSpan={5}>
                                            Loading...
                                        </CenteredCell>
                                    </tr>
                                ) : error ? (
                                    <tr>
                                        <CenteredCell colSpan={5}>
                                            Error: {error.message}
                                        </CenteredCell>
                                    </tr>
                                ) : (
                                    allPages.map(
                                        (
                                            page: any,
                                            index: number, // ✅ Iterate over all pages directly
                                        ) => (
                                            <TableRow
                                                key={page.id}
                                                isOdd={index % 2 === 1}
                                            >
                                                <td>{page.title}</td>
                                                <td>{page.description}</td>
                                                <td>
                                                    {page.img ? (
                                                        <Thumbnail
                                                            src={page.img.url}
                                                            alt={
                                                                page.img
                                                                    .title ||
                                                                'Thumbnail'
                                                            }
                                                            onClick={() =>
                                                                handleThumbnailClick(
                                                                    page.img
                                                                        .url,
                                                                )
                                                            }
                                                        />
                                                    ) : (
                                                        'No Image Available'
                                                    )}
                                                </td>
                                                <td>
                                                    <StatusBadge
                                                        isDisabled={
                                                            page.disabled
                                                        }
                                                    >
                                                        {page.disabled
                                                            ? 'Disabled'
                                                            : 'Active'}
                                                    </StatusBadge>
                                                </td>
                                                <td>
                                                    <ViewButton
                                                        onClick={() =>
                                                            handleViewPage(page)
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
                    </CarouselWrapper>
                ) : (
                    <FancyContainer>
                        <NoCarouselMessage>
                            {search ? (
                                <p>No results found for &quot;{search}&quot;</p>
                            ) : (
                                <p>No carousel pages added at the moment.</p>
                            )}
                        </NoCarouselMessage>
                    </FancyContainer>
                )}

                {selectedThumbnail && (
                    <Modal
                        title="Image Preview"
                        content={
                            <ThumbnailPreview
                                src={selectedThumbnail}
                                alt="Full Preview"
                            />
                        }
                        handleCloseModal={handleCloseThumbnailModal}
                        preview
                    />
                )}
            </CarouselContainer>
        </>
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

const TitleRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
`;

const CarouselTitle = styled.h2`
    font-family: Cinzel, serif;
    font-size: 24px;
    margin-bottom: 1rem;
    color: white;
`;

const CarouselContainer = styled.div`
    color: white;
    display: grid;
    flex-direction: column;
    padding: 2rem;
    background-color: #160d35;
    border: 1px solid #4d3c7b;
    border-radius: 8px;
    width: 100%;
    margin: 0 auto;
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

const CarouselWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    padding: 1rem;
    width: 100%;
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    border: 1px solid #4d3c7b;

    th,
    td {
        padding: 1rem;
        text-align: left;
        border-bottom: 1px solid #4d3c7b;
    }

    th {
        background-color: #4d3c7b;
        color: #fff;
        font-family: Cinzel, serif;
        font-size: 14px;
        font-weight: bold;
    }

    td {
        color: white;
        font-family: Barlow, sans-serif;
        font-size: 14px;
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

const StatusBadge = styled.span<{ isDisabled: boolean }>`
    display: inline-block;
    width: 100px;
    text-align: center;
    padding: 0.5rem 1rem;
    font-size: 14px;
    font-family: Barlow, sans-serif;
    border-radius: 5px;
    color: white;
    background-color: #4d3c7b;
    border: none;
    cursor: default;
    &:hover {
        background-color: ${({ isDisabled }) =>
            isDisabled ? '#c0392b' : '#146b14'};
    }
`;

const NoCarouselMessage = styled.div`
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

const Thumbnail = styled.img`
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 4px;
    border: 1px solid #4d3c7b;
    cursor: pointer;
`;

const ThumbnailPreview = styled.img`
    width: 100%;
    max-width: 500px;
    height: auto;
    border-radius: 8px;
    object-fit: contain;
`;
