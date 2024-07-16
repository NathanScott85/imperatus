import Yugioh from '../components/svg/product-icons/yugioh_2.png';
import YugiohBanner from '../components/svg/page-headers/yugioh-banner-one.png';
import LorcanaLogo from '../components/svg/product-icons/DisneyLorcana.png';
import OnePeiceLogo from '../components/svg/product-icons/onepiece.png';
import OneTwo from '../components/svg/page-headers/one-peice-banner-one.png';
import Lorcana from '../components/svg/page-headers/lorcana-banner-one.png';

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
        img: YugiohBanner,
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
        game: LorcanaLogo,
        description: `Ursula's Return`,
        product: `Ursula's Return`,
        buttontext: 'Pre-order Today',
    },
    {
        id: 3,
        img: OneTwo,
        name: 'Demon Slayer: Kimetsu no Yaiba Hashira Training Arc',
        price: 14.99,
        rrp: 19.99,
        category: 'Card Games',
        game: OnePeiceLogo,
        description: 'Wings Of The Captain',
        product: '',
        buttontext: 'Pre-order Today',
    },
];
