import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useCarouselContext } from '../../../../context/carousel';
import { FancyContainer } from '../../../../components/fancy-container';
import { Input } from '../../../../components/input';
import { UpdateCarousel } from '../update-carousel';
import { Modal } from '../../../../components/modal';

export const ManageCarousel = () => {
    const { carousel, loading, error, fetchCarousel } = useCarouselContext();
    const [selectedCarouselPage, setSelectedCarouselPage] = useState<any | null>(null);
    const [selectedThumbnail, setSelectedThumbnail] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>('');

    useEffect(() => {
        fetchCarousel();
    }, [fetchCarousel]);

    const handleViewPage = (page: any) => {
        setSelectedCarouselPage(page);
    };

    const handleThumbnailClick = (imageUrl: string) => {
        setSelectedThumbnail(imageUrl);
    };

    const handleCloseThumbnailModal = () => {
        setSelectedThumbnail(null);
    };

    const handleBackToList = () => {
        setSelectedCarouselPage(null);
    };

    if (selectedCarouselPage) {
        return <UpdateCarousel carousel={selectedCarouselPage} onBack={handleBackToList} />;
    }

    return (
        <CarouselContainer>
            <TitleRow>
                <CarouselTitle>Manage Carousel</CarouselTitle>
                <SearchContainer>
                    <StyledInput
                        variant="secondary"
                        size="small"
                        placeholder="Search carousel pages..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {searchQuery && (
                        <ClearButton onClick={() => setSearchQuery('')}>✕</ClearButton>
                    )}
                </SearchContainer>
            </TitleRow>
            {carousel!?.length > 0 ? (
                <CarouselWrapper>
                    {carousel!?.map((carousel: any) => (
                        <CarouselGroup key={carousel.id}>
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Description</th>
                                        <th>Image</th>
                                        <th>View</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {carousel.pages.map((page: any, index: number) => (
                                        <TableRow key={page.id} isOdd={index % 2 === 1}>
                                            <td>{page.title}</td>
                                            <td>{page.description}</td>
                                            <td>
                                                {page.img ? (
                                                    <Thumbnail
                                                        src={page.img.url}
                                                        alt={page.img.title || 'Thumbnail'}
                                                        onClick={() => handleThumbnailClick(page.img.url)}
                                             
                                                    />
                                                ) : (
                                                    'No Image Available'
                                                )}
                                            </td>
                                            <td>
                                                <ViewButton onClick={() => handleViewPage(page)}>
                                                    View
                                                </ViewButton>
                                            </td>
                                        </TableRow>
                                    ))}
                                </tbody>
                            </Table>
                        </CarouselGroup>
                    ))}
                </CarouselWrapper>
            ) : loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error: {error.message}</p>
            ) : (
                <FancyContainer>
                    <NoCarouselMessage>
                        <p>No carousel pages added at the moment.</p>
                    </NoCarouselMessage>
                </FancyContainer>
            )}

            {/* Modal for Thumbnail Preview */}
            {selectedThumbnail && (
                <Modal
                    title="Image Preview"
                    content={
                        <ThumbnailPreview src={selectedThumbnail} alt="Full Preview" />
                    }
                    handleCloseModal={handleCloseThumbnailModal}
                    preview
                />
            )}
        </CarouselContainer>
    );
};

const CarouselContainer = styled.div`
    flex-direction: column;
    padding: 1rem;
`;

const CarouselWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
`;

const CarouselGroup = styled.div`
    border: 1px solid #4d3c7b;
    border-radius: 8px;
    padding: 1rem;
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
    color: white;
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
    font-size: 16px;
    cursor: pointer;

    &:hover {
        color: #c79d0a;
    }
`;

const StyledInput = styled(Input)`
    flex: 1;
    padding-right: 2rem;
    border-radius: 3px;
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
    background-color: ${({ isOdd }) => (isOdd ? '#160d35' : 'transparent')};
`;

const NoCarouselMessage = styled.div`
    text-align: center;
    font-size: 18px;
    color: #777;
    p {
        color: white;
        font-size: 24px;
        font-weight: 700;
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

const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
`;

const PaginationControls = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 1rem;
    
    span {
        color: white;
        text-align: center;
        margin: 0 1rem;
    }
`;

const PageButton = styled.button<{ disabled?: boolean }>`
    background-color: ${({ disabled }) => (disabled ? '#999' : '#4d3c7b')};
    color: #fff;
    border: none;
    padding: 0.5rem 1rem;
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
    font-family: Barlow, sans-serif;
    font-size: 14px;
    border-radius: 4px;
    &:hover {
        background-color: ${({ disabled }) => (disabled ? '#999' : '#2a1f51')};
    }
`;
