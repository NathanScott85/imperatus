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
        game: 'pokemon',
        name: 'Pokemon Scarlet & Violet Obsidian Flames: Booster Pack (10 Cards)',
        img: ObsidianFlames,
        price: '3.99',
        type: 'pack',
        rrp: '4.29',
    },
    {
        id: 2,
        category: 'card games',
        game: 'magic the gathering',
        name: 'Magic The Gathering Core Set 2021: Booster Box (36 Packs)',
        img: MtgCore,
        type: 'booster',
        price: '89.99',
        rrp: '99.99',
    },
    {
        id: 3,
        category: 'card games',
        game: 'yu-gi-oh',
        name: 'Yu-Gi-Oh! Legendary Duelists: Synchro Storm Booster Box (36 Packs)',
        img: SynchroStorm,
        type: 'booster',
        price: '59.99',
        rrp: '64.99',
    },
    {
        id: 4,
        category: 'card games',
        game: 'magic the gathering',
        name: 'Magic The Gathering: Zendikar Rising Draft Booster Box (36 Packs)',
        img: Zendikar,
        price: '94.99',
        rrp: '109.99',
    },
    {
        id: 5,
        category: 'card games',
        game: 'yu-gi-oh',
        name: 'Yu-Gi-Oh! Genesis Impact Booster Box (24 Packs)',
        img: GenesisImpact,
        price: '49.99',
        rrp: '54.99',
    },
    {
        id: 6,
        category: 'card games',
        game: 'magic the gathering',
        name: 'Magic: The Gathering Theros Beyond Death Booster Box (36 Packs)',
        img: Theros,
        price: '89.99',
        rrp: '104.99',
    },
];
