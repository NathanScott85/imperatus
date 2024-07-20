import CardSleeves from '../components/svg/product-icons/card-sleeves.png';
import DeckBox from '../components/svg/product-icons/deck-box.png';
import DiceBag from '../components/svg/product-icons/dice-bag.png';
import Binders from '../components/svg/product-icons/binders.png';
import CardStorage from '../components/svg/product-icons/card-storage.png';
import PlayMats from '../components/svg/product-icons/playmat.png';
import Paints from '../components/svg/product-icons/paints.png';

export const accessories = [
    {
        id: '1',
        name: 'Deck Boxes',
        img: DeckBox,
        products: [
            {
                id: 1,
                category: 'cardgames',
                cardgame: 'Yugioh',
                name: 'Yu-Gi-Oh! TCG - The Infinite Forbidden Booster Pack',
                img: '',
                price: '3.99',
                type: 'pack',
                rrp: '4.29',
            },
        ],
    },
    {
        id: '2',
        name: 'Dice Bags',
        img: DiceBag,
        products: [],
    },
    {
        id: '3',
        name: 'Card Sleeves',
        img: CardSleeves,

        products: [],
    },
    {
        id: '4',
        name: 'Binders',
        img: Binders,
        products: [],
    },
    {
        id: '5',
        name: 'Card Storage',
        img: CardStorage,
        products: [],
    },

    {
        id: '6',
        name: 'Playmats',
        img: PlayMats,
        products: [],
    },
    {
        id: '7',
        name: 'Paints',
        img: Paints,
        products: [],
    },
];
