import CardGames from '../components/svg/product-icons/card-game.png';
import CardSleeves from '../components/svg/product-icons/card-sleeves.png';
import DeckBox from '../components/svg/product-icons/deck-box.png';
import DiceBag from '../components/svg/product-icons/dice-bag.png';
import BoardGames from '../components/svg/product-icons/board-games.png';
import Binders from '../components/svg/product-icons/binders.png';
import Minatures from '../components/svg/product-icons/minatures.png';

// Banners
// import Minatures from '../components/svg/page-headers/minatures.png';

// Card Game Image mock
import InfiniteForbidden from '../lib/mock-images/Infinite-forbidden.png';

export const categories = [
    {
        id: '1',
        name: 'Card Games',
        img: CardGames,
        products: [
            {
                id: 1,
                category: 'cardgames',
                cardgame: 'Yugioh',
                name: 'Yu-Gi-Oh! TCG - The Infinite Forbidden Booster Pack',
                img: InfiniteForbidden,
                price: '3.99',
                type: 'pack',
                rrp: '4.29',
            },
        ],
    },
    {
        id: '2',
        name: 'Deck Boxes',
        img: DeckBox,
        // banner: DeckBoxesBanner,
        products: [],
    },
    {
        id: '3',
        name: 'Dice Bags',
        img: DiceBag,
        products: [],
    },
    {
        id: '4',
        name: 'Card Sleeves',
        img: CardSleeves,
        products: [],
    },
    {
        id: '5',
        name: 'Board Games',
        img: BoardGames,
        products: [],
    },
    {
        id: '6',
        name: 'Binders',
        img: Binders,
        products: [],
    },
    {
        id: '7',
        name: 'Minatures',
        img: Minatures,
        products: [],
    },
];
