import CardGames from '../components/svg/product-icons/card-game.png';
import CardSleeves from '../components/svg/product-icons/card-sleeves.png';
import DeckBox from '../components/svg/product-icons/deck-box.png';
import DiceBag from '../components/svg/product-icons/dice-bag.png';
import BoardGames from '../components/svg/product-icons/board-games.png';

// Banners
import TradingCardGames from '../components/svg/page-headers/trading-card-games.png';
import BoardGamesBanner from '../components/svg/page-headers/board-games.png';
import DiceBagBanner from '../components/svg/page-headers/dice-bags.png';
import CardSleevesBanner from '../components/svg/page-headers/card-sleeves.png';
import Minatures from '../components/svg/page-headers/minatures.png';
import DeckBoxesBanner from '../components/svg/page-headers/deck-boxes-png.png';

export const categories = [
    {
        id: '1',
        name: 'Card Games',
        img: CardGames,
        banner: TradingCardGames,
        products: [],
    },
    {
        id: '2',
        name: 'Deck Boxes',
        img: DeckBox,
        banner: DeckBoxesBanner,
        products: [],
    },
    {
        id: '3',
        name: 'Dice Bags',
        img: DiceBag,
        banner: DiceBagBanner,
        products: [],
    },
    {
        id: '4',
        name: 'Card Sleeves',
        img: CardSleeves,
        banner: CardSleevesBanner,
        products: [],
    },
    {
        id: '5',
        name: 'Board Games',
        img: BoardGames,
        banner: BoardGamesBanner,
        products: [],
    },
    {
        id: '6',
        name: 'Miniatures',
        img: BoardGames,
        banner: Minatures,
        products: [],
    },
];
