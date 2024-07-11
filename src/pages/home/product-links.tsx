import styled from '@emotion/styled';
import {
    Lorcana,
    Magic,
    Yugioh,
    DoctorWho,
    ParadoxRift,
    AgeofOverlord,
    FinalFantasy,
} from '../../components/svg/product-icons';
import { mediaQueries } from '../../styled/breakpoints';

const toplinks = [
    {
        id: 1,
        src: DoctorWho,
    },
    {
        id: 2,
        src: ParadoxRift,
    },
    {
        id: 3,
        src: AgeofOverlord,
    },
];

const bottomlinks = [
    {
        id: 1,
        src: Yugioh,
    },
    {
        id: 2,
        src: Lorcana,
    },
    {
        id: 3,
        src: Magic,
    },
    {
        id: 4,
        src: FinalFantasy,
    },
];

export const ProductLinks = () => {
    return (
        <ProductLinksContainer>
            <ProductTopLinksWrapper>
                {toplinks.map((item) => {
                    return (
                        <TopImage
                            key={item.id}
                            src={item.src}
                            alt="product icon"
                        />
                    );
                })}
            </ProductTopLinksWrapper>
            <ProductBottomLinksWrapper>
                {bottomlinks.map((item) => (
                    <Image key={item.id} src={item.src} alt="product icon" />
                ))}
            </ProductBottomLinksWrapper>
        </ProductLinksContainer>
    );
};

const ProductTopLinksWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding-top: 3rem;
`;

const ProductBottomLinksWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    padding: 5rem;
    width: 100%;
    ${mediaQueries('sm')`
        padding-bottom: 2rem;
    `};
`;

const ProductLinksContainer = styled('div')`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    padding-bottom: 3rem;
`;

const TopImage = styled('img')`
    width: 350px;
    height: 225px;
    border-radius: 20px;
    border: none;
    margin: 1rem;
    border-radius: 5px;
    transition: all 0.2s ease-in-out;
    &:hover {
        transform: scale(1.1);
        border: 2px solid #d4b05f;
    }
    ${mediaQueries('md')`
        width: 200px;
        height: 125px;
    `};
    ${mediaQueries('xl')`
        width: 350px;
        height: 225px;
    `};
`;
const Image = styled('img')`
    width: 150px;
    height: 80px;
    margin: 1.25rem;
    border-radius: 5px;
    border: none;
    transition: all 0.2s ease-in-out;
    &:hover {
        transform: scale(1.1);
        border: 1px solid #d4b05f;
    }
`;
