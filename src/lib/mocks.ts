import SynchroStorm from '../lib/mock-images/yugioh-synchro-storm.jpg';
import ObsidianFlames from '../lib/mock-images/pokemon-obsidian.jpg';
import MtgCore from '../lib/mock-images/mtg-core-2021.jpg';
import GenesisImpact from '../lib/mock-images/genesis-impact.jpg';
import Theros from '../lib/mock-images/theros.jpg';
import Zendikar from './mock-images/zendikar-rising.jpg';

export const latestproducts = [
    {
        id: 1,
        category: 'card games',
        cardgame: 'pokemon',
        name: 'Pokemon Scarlet & Violet Obsidian Flames: Booster Pack (10 Cards)',
        img: ObsidianFlames,
        price: '3.99',
        type: 'pack',
        rrp: '4.29',
    },
    {
        id: 2,
        category: 'card games',
        cardgame: 'magic the gathering',
        name: 'Magic The Gathering Core Set 2021: Booster Box (36 Packs)',
        img: MtgCore,
        type: 'booster',
        price: '89.99',
        rrp: '99.99',
    },
    {
        id: 3,
        category: 'card games',
        cardgame: 'yu-gi-oh',
        name: 'Yu-Gi-Oh! Legendary Duelists: Synchro Storm Booster Box (36 Packs)',
        img: SynchroStorm,
        type: 'booster',
        price: '59.99',
        rrp: '64.99',
    },
    {
        id: 4,
        category: 'card games',
        cardgame: 'magic the gathering',
        name: 'Magic The Gathering: Zendikar Rising Draft Booster Box (36 Packs)',
        img: Zendikar,
        price: '94.99',
        rrp: '109.99',
    },
    {
        id: 5,
        category: 'card games',
        cardgame: 'yu-gi-oh',
        name: 'Yu-Gi-Oh! Genesis Impact Booster Box (24 Packs)',
        img: GenesisImpact,
        price: '49.99',
        rrp: '54.99',
    },
    {
        id: 6,
        category: 'card games',
        cardgame: 'magic the gathering',
        name: 'Magic: The Gathering Theros Beyond Death Booster Box (36 Packs)',
        img: Theros,
        price: '89.99',
        rrp: '104.99',
    },
];

interface ReviewProps {
    name: string;
    rating: number;
    review: string;
    id: number;
}

export const reviews: ReviewProps[] = [
    {
        id: 1,
        name: 'John Doe',
        rating: 4,
        review: "Great product, highly recommend! I've been using this for a few weeks now, and it has exceeded my expectations in every way. The build quality is solid, and it performs exactly as described. I would definitely purchase this again.",
    },
    {
        id: 2,
        name: 'Jane Smith',
        rating: 5,
        review: "Excellent quality and fast shipping. The customer service was outstanding, and the product arrived well-packaged and on time. It's rare to find such high quality at this price point. Highly recommended!",
    },
    {
        id: 3,
        name: 'Samuel Green',
        rating: 3,
        review: 'Good, but could be better. The product works as advertised, but I encountered a few minor issues. The instructions were a bit unclear, and it took some time to set up properly. Overall, a decent purchase for the price.',
    },
    {
        id: 4,
        name: 'Michael Brown',
        rating: 4,
        review: 'Satisfied with the purchase. This product met most of my expectations, and I appreciate the thoughtful design. There were a few small flaws, but nothing that affected its overall performance. Worth the money.',
    },
    {
        id: 5,
        name: 'Emily White',
        rating: 5,
        review: "Amazing! Exceeded my expectations. From the moment I opened the box, I knew I had made a good choice. The attention to detail and quality of materials are evident. I've recommended this to all my friends.",
    },
    {
        id: 6,
        name: 'Jessica Johnson',
        rating: 2,
        review: "Not what I expected. Unfortunately, this product did not meet my needs. It was difficult to use and didn't perform as I had hoped. The return process was straightforward, though, and the customer service was helpful.",
    },
    {
        id: 7,
        name: 'David Wilson',
        rating: 4,
        review: "Good value for money. This is a solid product for the price. It performs well and is made of quality materials. There are a few areas for improvement, but overall, I'm happy with my purchase.",
    },
    {
        id: 8,
        name: 'Chris Lee',
        rating: 3,
        review: "Average product. This item is okay for occasional use, but I wouldn't rely on it for heavy-duty tasks. The performance is adequate, but it lacks some features that would make it truly outstanding.",
    },
    {
        id: 9,
        name: 'Sarah Taylor',
        rating: 5,
        review: "Fantastic! Will buy again. This is one of the best products I've ever bought. It's well-designed, easy to use, and performs flawlessly. I've already placed an order for another one as a gift.",
    },
    {
        id: 10,
        name: 'Daniel Moore',
        rating: 4,
        review: "Very good quality. I am impressed with the quality of this product. It has been reliable and durable, even with frequent use. The only downside is the slightly higher price, but it's worth it for what you get.",
    },
];
