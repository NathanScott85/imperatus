import Yugioh from '../components/svg/product-icons/yugioh_2.png';
import Disney from '../components/svg/product-icons/DisneyLorcana.png';
import OnePiece from '../components/svg/product-icons/onepiece.png';
import Lorcana from '../lib/mock-images/featured-image-disney-lorcana-art.png';
import One from '../lib/mock-images/one-piece-card.jpg';

interface CarouselItem {
    id: number;
    img: string;
    name: string;
    price: number;
    rrp: number;
    category: string;
    game: string;
    description: string;
    buttontext: string;
    product: string;
}

export const sampleItems: CarouselItem[] = [
    {
        id: 1,
        img: 'https://cdn.chaoscards.co.uk/uploads/home_header/3_173_h.jpg?v=1720773948',
        name: 'Yu-gi-oh, The Infinite Forbidden',
        price: 19.99,
        rrp: 24.99,
        category: 'Card Games',
        game: Yugioh,
        product: '',
        description: 'Infinite Forbidden',
        buttontext: 'Pre-order Today',
    },
    {
        id: 2,
        img: Lorcana,
        name: 'Disney Lorcana',
        price: 29.99,
        rrp: 34.99,
        category: 'Card Games',
        game: Disney,
        description: `Ursula's Return`,
        product: `Ursula's Return`,
        buttontext: 'Pre-order Today',
    },
    {
        id: 3,
        img: One,
        name: 'Demon Slayer: Kimetsu no Yaiba Hashira Training Arc',
        price: 14.99,
        rrp: 19.99,
        category: 'Card Games',
        game: OnePiece,
        description: 'Wings Of The Captain',
        product: '',
        buttontext: 'Pre-order Today',
    },
];
