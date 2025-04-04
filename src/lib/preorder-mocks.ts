import PokemonLogo from '../components/svg/product-icons/Pokémon__logo.png';
import YugiohLogo from '../components/svg/product-icons/yugioh_2.png';
import CardFight from '../components/svg/product-icons/cardfight.jpg';
import FleshAndBlood from '../components/svg/product-icons/Flesh_and_Blood.png';
import OnePiece from '../components/svg/product-icons/onepiece.png';
import DisneyLorcana from '../components/svg/product-icons/DisneyLorcana.png';
import DigimonLogo from '../components/svg/product-icons/digimonlogo.png';
import MagicTheGathering from '../components/svg/product-icons/Magicthegathering.png';
import Altered from '../components/svg/product-icons/alteredtcg.png';
import DragonBallSuper from '../components/svg/product-icons/DragonBallSuper.png';
import StarWars from '../components/svg/product-icons/star-wars.png';
import Weiss from '../components/svg/product-icons/weiss.png';

// Banners
import PokemonBanner from '../components/svg/page-headers/pokemon-banner-one.jpg';
import CardFightBanner from '../components/svg/page-headers/card-fight-banner-one.png';
import YugiohBanner from '../components/svg/page-headers/yugioh-banner-one.png';
import OnePieceBanner from '../components/svg/page-headers/one-peice-banner-one.png';
import DisneyLorcanaBanner from '../components/svg/page-headers/lorcana-banner-one.png';
import DigimonBanner from '../components/svg/page-headers/digimon-banner-one.png';
import MagicTheGatheringBanner from '../components/svg/page-headers/magic-banner-one.png';
import FleshAndBloodBanner from '../components/svg/page-headers/flesh-&-blood-banner-one.png';
import DragonBallSuperBanner from '../components/svg/page-headers/dragon-ball-banner-one.png';
import AlteredBanner from '../components/svg/page-headers/altered-banner-one.png';
import StarWarsBanner from '../components/svg/page-headers/starwars-banner-one.png';
import WeissSchwarzBanner from '../components/svg/page-headers/weis-banner-one.png';

// Product Images.
import InfiniteForbidden from '../lib/mock-images/Infinite-forbidden.png';
import DisneyLorcanaFirst from '../lib/mock-images/lorcana-first-chapter.png';
import ObsidianFlames from '../lib/mock-images/pokemon-obsidian.jpg';
import Chakrabarthi from '../lib/mock-images/flight-of-chakrabarthi.jpg';

export const preorders: any[] = [
    {
        id: 1,
        name: 'Pokemon',
        img: { url: PokemonLogo },
        banner: PokemonBanner,
        products: [
            {
                id: 1,
                category: 'cardgames',
                cardgame: 'pokemon',
                name: 'Pokemon Scarlet & Violet Obsidian Flames: Booster Pack (10 Cards)',
                img: { url: ObsidianFlames },

                price: 3.99,
                type: 'pack',
                rrp: 4.29,
                description: `Each The Infinite Forbidden booster pack contains 9 cards. Return to where it all began with a new strategy featuring the unstoppable Exodia! “EXODIA, OBLITERATE!” The two words that cemented Yu-Gi-Oh! as a global sensation!
                The Infinite Forbidden was recently announced at the Yu-Gi-Oh! DUEL MONSTERS The Legend of Duelist QUARTER CENTURY Event held at the Tokyo Dome in Japan, returning the game to where it all began with a new strategy featuring the unstoppable Exodia!`,
                stock: {
                    amount: 20,
                    sold: 15,
                    instock: 'in stock',
                    soldout: 'sold out',
                    preorder: 'preorder',
                },
            },
            {
                id: 2,
                category: 'cardgames',
                cardgame: 'pokemon',
                name: 'Pokemon Scarlet & Violet Obsidian Flames: Booster Pack (10 Cards)',
                img: { url: ObsidianFlames },
                price: 3.99,
                type: 'pack',
                rrp: 4.29,
                description: `Each The Infinite Forbidden booster pack contains 9 cards. Return to where it all began with a new strategy featuring the unstoppable Exodia! “EXODIA, OBLITERATE!” The two words that cemented Yu-Gi-Oh! as a global sensation!
                The Infinite Forbidden was recently announced at the Yu-Gi-Oh! DUEL MONSTERS The Legend of Duelist QUARTER CENTURY Event held at the Tokyo Dome in Japan, returning the game to where it all began with a new strategy featuring the unstoppable Exodia!`,
                stock: {
                    amount: 20,
                    sold: 15,
                    instock: 'in stock',
                    soldout: 'sold out',
                    preorder: 'preorder',
                },
            },
        ],
    },
    {
        id: 2,
        name: 'Yugioh',
        img: { url: YugiohLogo },
        banner: YugiohBanner,
        products: [
            {
                id: 1,
                category: 'cardgames',
                cardgame: 'Yugioh',
                name: 'Yu-Gi-Oh! TCG - The Infinite Forbidden Booster Pack',
                img: { url: ObsidianFlames },
                price: 3.99,
                type: 'pack',
                rrp: 4.29,
                description: `Each The Infinite Forbidden booster pack contains 9 cards. Return to where it all began with a new strategy featuring the unstoppable Exodia! “EXODIA, OBLITERATE!” The two words that cemented Yu-Gi-Oh! as a global sensation!
                The Infinite Forbidden was recently announced at the Yu-Gi-Oh! DUEL MONSTERS The Legend of Duelist QUARTER CENTURY Event held at the Tokyo Dome in Japan, returning the game to where it all began with a new strategy featuring the unstoppable Exodia!`,
                stock: {
                    amount: 20,
                    sold: 15,
                    instock: 'in stock',
                    soldout: 'sold out',
                    preorder: 'preorder',
                },
            },
            {
                id: 2,
                category: 'cardgames',
                cardgame: 'Yugioh',
                name: 'Yu-Gi-Oh! TCG - The Infinite Forbidden Booster Pack',
                img: { url: ObsidianFlames },
                price: 3.99,
                type: 'pack',
                rrp: 4.29,
                description: `Each The Infinite Forbidden booster pack contains 9 cards. Return to where it all began with a new strategy featuring the unstoppable Exodia! “EXODIA, OBLITERATE!” The two words that cemented Yu-Gi-Oh! as a global sensation!
                The Infinite Forbidden was recently announced at the Yu-Gi-Oh! DUEL MONSTERS The Legend of Duelist QUARTER CENTURY Event held at the Tokyo Dome in Japan, returning the game to where it all began with a new strategy featuring the unstoppable Exodia!`,
                stock: {
                    amount: 20,
                    sold: 15,
                    instock: 'in stock',
                    soldout: 'sold out',
                    preorder: 'preorder',
                },
            },
        ],
    },
    {
        id: '4',
        name: 'Cardfight!! Vanguard',
        img: { url: CardFight },
        banner: CardFightBanner,
        products: [
            {
                id: 1,
                category: 'cardgames',
                cardgame: 'Yugioh',
                name: 'Cardfight!! Vanguard Booster 13: Flight of Chakrabarthi Booster Pack',
                img: { url: Chakrabarthi },
                price: 3.99,
                type: 'pack',
                rrp: 4.29,
                description: `Each The Infinite Forbidden booster pack contains 9 cards. Return to where it all began with a new strategy featuring the unstoppable Exodia! “EXODIA, OBLITERATE!” The two words that cemented Yu-Gi-Oh! as a global sensation!
                The Infinite Forbidden was recently announced at the Yu-Gi-Oh! DUEL MONSTERS The Legend of Duelist QUARTER CENTURY Event held at the Tokyo Dome in Japan, returning the game to where it all began with a new strategy featuring the unstoppable Exodia!`,
                stock: {
                    amount: 20,
                    sold: 15,
                    instock: 'in stock',
                    soldout: 'sold out',
                    preorder: 'preorder',
                },
            },
            {
                id: 2,
                category: 'cardgames',
                cardgame: 'Yugioh',
                name: 'Cardfight!! Vanguard Booster 13: Flight of Chakrabarthi Booster Pack',
                img: { url: Chakrabarthi },
                price: 3.99,
                type: 'pack',
                rrp: 4.29,
                description: `Each The Infinite Forbidden booster pack contains 9 cards. Return to where it all began with a new strategy featuring the unstoppable Exodia! “EXODIA, OBLITERATE!” The two words that cemented Yu-Gi-Oh! as a global sensation!
                The Infinite Forbidden was recently announced at the Yu-Gi-Oh! DUEL MONSTERS The Legend of Duelist QUARTER CENTURY Event held at the Tokyo Dome in Japan, returning the game to where it all began with a new strategy featuring the unstoppable Exodia!`,
                stock: {
                    amount: 20,
                    sold: 15,
                    instock: 'in stock',
                    soldout: 'sold out',
                    preorder: 'preorder',
                },
            },
        ],
    },
    {
        id: '5',
        name: 'One Piece',
        img: { url: OnePiece },
        banner: OnePieceBanner,
        products: [
            {
                id: 1,
                category: 'cardgames',
                cardgame: 'Yugioh',
                name: 'Yu-Gi-Oh! TCG - The Infinite Forbidden Booster Pack',
                img: { url: ObsidianFlames },
                price: 3.99,
                type: 'pack',
                rrp: 4.29,
                description: `Each The Infinite Forbidden booster pack contains 9 cards. Return to where it all began with a new strategy featuring the unstoppable Exodia! “EXODIA, OBLITERATE!” The two words that cemented Yu-Gi-Oh! as a global sensation!
                The Infinite Forbidden was recently announced at the Yu-Gi-Oh! DUEL MONSTERS The Legend of Duelist QUARTER CENTURY Event held at the Tokyo Dome in Japan, returning the game to where it all began with a new strategy featuring the unstoppable Exodia!`,
                stock: {
                    amount: 20,
                    sold: 15,
                    instock: 'in stock',
                    soldout: 'sold out',
                    preorder: 'preorder',
                },
            },
            {
                id: 2,
                category: 'cardgames',
                cardgame: 'Yugioh',
                name: 'Yu-Gi-Oh! TCG - The Infinite Forbidden Booster Pack',
                img: { url: InfiniteForbidden },
                price: 3.99,
                type: 'pack',
                rrp: 4.29,
                description: `Each The Infinite Forbidden booster pack contains 9 cards. Return to where it all began with a new strategy featuring the unstoppable Exodia! “EXODIA, OBLITERATE!” The two words that cemented Yu-Gi-Oh! as a global sensation!
                The Infinite Forbidden was recently announced at the Yu-Gi-Oh! DUEL MONSTERS The Legend of Duelist QUARTER CENTURY Event held at the Tokyo Dome in Japan, returning the game to where it all began with a new strategy featuring the unstoppable Exodia!`,
                stock: {
                    amount: 20,
                    sold: 15,
                    instock: 'in stock',
                    soldout: 'sold out',
                    preorder: 'preorder',
                },
            },
        ],
    },
    {
        id: '6',
        name: 'Disney Lorcana',

        img: { url: DisneyLorcana },
        banner: DisneyLorcanaBanner,
        products: [
            {
                id: 1,
                category: 'cardgames',
                cardgame: 'Disney Lorcana',
                name: 'Disney Lorcana: The First Chapter - Booster Pack',

                img: { url: DisneyLorcanaFirst },
                price: 3.99,
                type: 'pack',
                rrp: 4.29,
                description: `Each The Infinite Forbidden booster pack contains 9 cards. Return to where it all began with a new strategy featuring the unstoppable Exodia! “EXODIA, OBLITERATE!” The two words that cemented Yu-Gi-Oh! as a global sensation!
                The Infinite Forbidden was recently announced at the Yu-Gi-Oh! DUEL MONSTERS The Legend of Duelist QUARTER CENTURY Event held at the Tokyo Dome in Japan, returning the game to where it all began with a new strategy featuring the unstoppable Exodia!`,
                stock: {
                    amount: 20,
                    sold: 15,
                    instock: 'in stock',
                    soldout: 'sold out',
                    preorder: 'preorder',
                },
            },
            {
                id: 2,
                category: 'cardgames',
                cardgame: 'Disney Lorcana',
                name: 'Disney Lorcana: The First Chapter - Booster Pack',
                img: { url: DisneyLorcanaFirst },
                price: 3.99,
                type: 'pack',
                rrp: 4.29,
                description: `Each The Infinite Forbidden booster pack contains 9 cards. Return to where it all began with a new strategy featuring the unstoppable Exodia! “EXODIA, OBLITERATE!” The two words that cemented Yu-Gi-Oh! as a global sensation!
                The Infinite Forbidden was recently announced at the Yu-Gi-Oh! DUEL MONSTERS The Legend of Duelist QUARTER CENTURY Event held at the Tokyo Dome in Japan, returning the game to where it all began with a new strategy featuring the unstoppable Exodia!`,
                stock: {
                    amount: 20,
                    sold: 15,
                    instock: 'in stock',
                    soldout: 'sold out',
                    preorder: 'preorder',
                },
            },
        ],
    },
    {
        id: '7',
        name: 'Digimon',
        img: { url: DigimonLogo },
        banner: DigimonBanner,
        products: [
            {
                id: 1,
                category: 'cardgames',
                cardgame: 'Disney Lorcana',
                name: 'Disney Lorcana: The First Chapter - Booster Pack',
                img: { url: DisneyLorcanaFirst },
                price: 3.99,
                type: 'pack',
                rrp: 4.29,
                description: `Each The Infinite Forbidden booster pack contains 9 cards. Return to where it all began with a new strategy featuring the unstoppable Exodia! “EXODIA, OBLITERATE!” The two words that cemented Yu-Gi-Oh! as a global sensation!
                The Infinite Forbidden was recently announced at the Yu-Gi-Oh! DUEL MONSTERS The Legend of Duelist QUARTER CENTURY Event held at the Tokyo Dome in Japan, returning the game to where it all began with a new strategy featuring the unstoppable Exodia!`,
                stock: {
                    amount: 20,
                    sold: 15,
                    instock: 'in stock',
                    soldout: 'sold out',
                    preorder: 'preorder',
                },
            },
            {
                id: 2,
                category: 'cardgames',
                cardgame: 'Disney Lorcana',
                name: 'Disney Lorcana: The First Chapter - Booster Pack',
                img: { url: DisneyLorcanaFirst },
                price: 3.99,
                type: 'pack',
                rrp: 4.29,
                description: `Each The Infinite Forbidden booster pack contains 9 cards. Return to where it all began with a new strategy featuring the unstoppable Exodia! “EXODIA, OBLITERATE!” The two words that cemented Yu-Gi-Oh! as a global sensation!
                The Infinite Forbidden was recently announced at the Yu-Gi-Oh! DUEL MONSTERS The Legend of Duelist QUARTER CENTURY Event held at the Tokyo Dome in Japan, returning the game to where it all began with a new strategy featuring the unstoppable Exodia!`,
                stock: {
                    amount: 20,
                    sold: 15,
                    instock: 'in stock',
                    soldout: 'sold out',
                    preorder: 'preorder',
                },
            },
        ],
    },
    {
        id: '8',
        name: 'Magic the Gathering',
        banner: MagicTheGatheringBanner,
        img: { url: MagicTheGathering },
        products: [
            {
                id: 1,
                category: 'cardgames',
                cardgame: 'Disney Lorcana',
                name: 'Disney Lorcana: The First Chapter - Booster Pack',

                img: { url: DisneyLorcanaFirst },
                price: 3.99,
                type: 'pack',
                rrp: 4.29,
                description: `Each The Infinite Forbidden booster pack contains 9 cards. Return to where it all began with a new strategy featuring the unstoppable Exodia! “EXODIA, OBLITERATE!” The two words that cemented Yu-Gi-Oh! as a global sensation!
                The Infinite Forbidden was recently announced at the Yu-Gi-Oh! DUEL MONSTERS The Legend of Duelist QUARTER CENTURY Event held at the Tokyo Dome in Japan, returning the game to where it all began with a new strategy featuring the unstoppable Exodia!`,
                stock: {
                    amount: 20,
                    sold: 15,
                    instock: 'in stock',
                    soldout: 'sold out',
                    preorder: 'preorder',
                },
            },
            {
                id: 2,
                category: 'cardgames',
                cardgame: 'Disney Lorcana',
                name: 'Disney Lorcana: The First Chapter - Booster Pack',
                img: { url: DisneyLorcanaFirst },
                price: 3.99,
                type: 'pack',
                rrp: 4.29,
                description: `Each The Infinite Forbidden booster pack contains 9 cards. Return to where it all began with a new strategy featuring the unstoppable Exodia! “EXODIA, OBLITERATE!” The two words that cemented Yu-Gi-Oh! as a global sensation!
                The Infinite Forbidden was recently announced at the Yu-Gi-Oh! DUEL MONSTERS The Legend of Duelist QUARTER CENTURY Event held at the Tokyo Dome in Japan, returning the game to where it all began with a new strategy featuring the unstoppable Exodia!`,
                stock: {
                    amount: 20,
                    sold: 15,
                    instock: 'in stock',
                    soldout: 'sold out',
                    preorder: 'preorder',
                },
            },
        ],
    },
    {
        id: '9',
        name: 'Flesh and Blood',
        banner: FleshAndBloodBanner,
        img: { url: FleshAndBlood },
        products: [
            {
                id: 1,
                category: 'cardgames',
                cardgame: 'Disney Lorcana',
                name: 'Disney Lorcana: The First Chapter - Booster Pack',
                img: { url: DisneyLorcanaFirst },
                price: 3.99,
                type: 'pack',
                rrp: 4.29,
                description: `Each The Infinite Forbidden booster pack contains 9 cards. Return to where it all began with a new strategy featuring the unstoppable Exodia! “EXODIA, OBLITERATE!” The two words that cemented Yu-Gi-Oh! as a global sensation!
                The Infinite Forbidden was recently announced at the Yu-Gi-Oh! DUEL MONSTERS The Legend of Duelist QUARTER CENTURY Event held at the Tokyo Dome in Japan, returning the game to where it all began with a new strategy featuring the unstoppable Exodia!`,
                stock: {
                    amount: 20,
                    sold: 15,
                    instock: 'in stock',
                    soldout: 'sold out',
                    preorder: 'preorder',
                },
            },
            {
                id: 2,
                category: 'cardgames',
                cardgame: 'Disney Lorcana',
                name: 'Disney Lorcana: The First Chapter - Booster Pack',
                img: { url: DisneyLorcanaFirst },
                price: 3.99,
                type: 'pack',
                rrp: 4.29,
                description: `Each The Infinite Forbidden booster pack contains 9 cards. Return to where it all began with a new strategy featuring the unstoppable Exodia! “EXODIA, OBLITERATE!” The two words that cemented Yu-Gi-Oh! as a global sensation!
                The Infinite Forbidden was recently announced at the Yu-Gi-Oh! DUEL MONSTERS The Legend of Duelist QUARTER CENTURY Event held at the Tokyo Dome in Japan, returning the game to where it all began with a new strategy featuring the unstoppable Exodia!`,
                stock: {
                    amount: 20,
                    sold: 15,
                    instock: 'in stock',
                    soldout: 'sold out',
                    preorder: 'preorder',
                },
            },
        ],
    },
    {
        id: '10',
        name: 'Dragonball Super',
        banner: DragonBallSuperBanner,
        img: { url: DragonBallSuper },
        products: [
            {
                id: 1,
                category: 'cardgames',
                cardgame: 'Disney Lorcana',
                name: 'Disney Lorcana: The First Chapter - Booster Pack',
                img: { url: DisneyLorcanaFirst },
                price: 3.99,
                type: 'pack',
                rrp: 4.29,
                description: `Each The Infinite Forbidden booster pack contains 9 cards. Return to where it all began with a new strategy featuring the unstoppable Exodia! “EXODIA, OBLITERATE!” The two words that cemented Yu-Gi-Oh! as a global sensation!
                The Infinite Forbidden was recently announced at the Yu-Gi-Oh! DUEL MONSTERS The Legend of Duelist QUARTER CENTURY Event held at the Tokyo Dome in Japan, returning the game to where it all began with a new strategy featuring the unstoppable Exodia!`,
                stock: {
                    amount: 20,
                    sold: 15,
                    instock: 'in stock',
                    soldout: 'sold out',
                    preorder: 'preorder',
                },
            },
            {
                id: 2,
                category: 'cardgames',
                cardgame: 'Disney Lorcana',
                name: 'Disney Lorcana: The First Chapter - Booster Pack',
                img: { url: DisneyLorcanaFirst },
                price: 3.99,
                type: 'pack',
                rrp: 4.29,
                description: `Each The Infinite Forbidden booster pack contains 9 cards. Return to where it all began with a new strategy featuring the unstoppable Exodia! “EXODIA, OBLITERATE!” The two words that cemented Yu-Gi-Oh! as a global sensation!
                The Infinite Forbidden was recently announced at the Yu-Gi-Oh! DUEL MONSTERS The Legend of Duelist QUARTER CENTURY Event held at the Tokyo Dome in Japan, returning the game to where it all began with a new strategy featuring the unstoppable Exodia!`,
                stock: {
                    amount: 20,
                    sold: 15,
                    instock: 'in stock',
                    soldout: 'sold out',
                    preorder: 'preorder',
                },
            },
        ],
    },
    {
        id: '11',
        name: 'Altered',
        banner: AlteredBanner,
        img: { url: Altered },
        products: [
            {
                id: 1,
                category: 'cardgames',
                cardgame: 'Disney Lorcana',
                name: 'Disney Lorcana: The First Chapter - Booster Pack',
                img: { url: DisneyLorcanaFirst },
                price: 3.99,
                type: 'pack',
                rrp: 4.29,
                description: `Each The Infinite Forbidden booster pack contains 9 cards. Return to where it all began with a new strategy featuring the unstoppable Exodia! “EXODIA, OBLITERATE!” The two words that cemented Yu-Gi-Oh! as a global sensation!
                The Infinite Forbidden was recently announced at the Yu-Gi-Oh! DUEL MONSTERS The Legend of Duelist QUARTER CENTURY Event held at the Tokyo Dome in Japan, returning the game to where it all began with a new strategy featuring the unstoppable Exodia!`,
                stock: {
                    amount: 20,
                    sold: 15,
                    instock: 'in stock',
                    soldout: 'sold out',
                    preorder: 'preorder',
                },
            },
            {
                id: 2,
                category: 'cardgames',
                cardgame: 'Disney Lorcana',
                name: 'Disney Lorcana: The First Chapter - Booster Pack',
                img: { url: DisneyLorcanaFirst },
                price: 3.99,
                type: 'pack',
                rrp: 4.29,
                description: `Each The Infinite Forbidden booster pack contains 9 cards. Return to where it all began with a new strategy featuring the unstoppable Exodia! “EXODIA, OBLITERATE!” The two words that cemented Yu-Gi-Oh! as a global sensation!
                The Infinite Forbidden was recently announced at the Yu-Gi-Oh! DUEL MONSTERS The Legend of Duelist QUARTER CENTURY Event held at the Tokyo Dome in Japan, returning the game to where it all began with a new strategy featuring the unstoppable Exodia!`,
                stock: {
                    amount: 20,
                    sold: 15,
                    instock: 'in stock',
                    soldout: 'sold out',
                    preorder: 'preorder',
                },
            },
        ],
    },
    {
        id: '12',
        name: 'Star Wars',
        img: { url: StarWars },
        banner: StarWarsBanner,
        products: [
            {
                id: 1,
                category: 'cardgames',
                cardgame: 'Disney Lorcana',
                name: 'Disney Lorcana: The First Chapter - Booster Pack',
                img: { url: DisneyLorcanaFirst },
                price: 3.99,
                type: 'pack',
                rrp: 4.29,
                description: `Each The Infinite Forbidden booster pack contains 9 cards. Return to where it all began with a new strategy featuring the unstoppable Exodia! “EXODIA, OBLITERATE!” The two words that cemented Yu-Gi-Oh! as a global sensation!
                The Infinite Forbidden was recently announced at the Yu-Gi-Oh! DUEL MONSTERS The Legend of Duelist QUARTER CENTURY Event held at the Tokyo Dome in Japan, returning the game to where it all began with a new strategy featuring the unstoppable Exodia!`,
                stock: {
                    amount: 20,
                    sold: 15,
                    instock: 'in stock',
                    soldout: 'sold out',
                    preorder: 'preorder',
                },
            },
            {
                id: 2,
                category: 'cardgames',
                cardgame: 'Disney Lorcana',
                name: 'Disney Lorcana: The First Chapter - Booster Pack',
                img: { url: DisneyLorcanaFirst },
                price: 3.99,
                type: 'pack',
                rrp: 4.29,
                description: `Each The Infinite Forbidden booster pack contains 9 cards. Return to where it all began with a new strategy featuring the unstoppable Exodia! “EXODIA, OBLITERATE!” The two words that cemented Yu-Gi-Oh! as a global sensation!
                The Infinite Forbidden was recently announced at the Yu-Gi-Oh! DUEL MONSTERS The Legend of Duelist QUARTER CENTURY Event held at the Tokyo Dome in Japan, returning the game to where it all began with a new strategy featuring the unstoppable Exodia!`,
                stock: {
                    amount: 20,
                    sold: 15,
                    instock: 'in stock',
                    soldout: 'sold out',
                    preorder: 'preorder',
                },
            },
        ],
    },
    {
        id: '13',
        name: 'Weiss Schwarz',
        img: { url: Weiss },
        banner: WeissSchwarzBanner,
        products: [
            {
                id: 1,
                category: 'cardgames',
                cardgame: 'Disney Lorcana',
                name: 'Disney Lorcana: The First Chapter - Booster Pack',
                img: { url: DisneyLorcanaFirst },
                price: 3.99,
                type: 'pack',
                rrp: 4.29,
                description: `Each The Infinite Forbidden booster pack contains 9 cards. Return to where it all began with a new strategy featuring the unstoppable Exodia! “EXODIA, OBLITERATE!” The two words that cemented Yu-Gi-Oh! as a global sensation!
                The Infinite Forbidden was recently announced at the Yu-Gi-Oh! DUEL MONSTERS The Legend of Duelist QUARTER CENTURY Event held at the Tokyo Dome in Japan, returning the game to where it all began with a new strategy featuring the unstoppable Exodia!`,
                stock: {
                    amount: 20,
                    sold: 15,
                    instock: 'in stock',
                    soldout: 'sold out',
                    preorder: 'preorder',
                },
            },
            {
                id: 2,
                category: 'cardgames',
                cardgame: 'Disney Lorcana',
                name: 'Disney Lorcana: The First Chapter - Booster Pack',
                img: { url: DisneyLorcanaFirst },
                price: 3.99,
                type: 'pack',
                rrp: 4.29,
                description: `Each The Infinite Forbidden booster pack contains 9 cards. Return to where it all began with a new strategy featuring the unstoppable Exodia! “EXODIA, OBLITERATE!” The two words that cemented Yu-Gi-Oh! as a global sensation!
                The Infinite Forbidden was recently announced at the Yu-Gi-Oh! DUEL MONSTERS The Legend of Duelist QUARTER CENTURY Event held at the Tokyo Dome in Japan, returning the game to where it all began with a new strategy featuring the unstoppable Exodia!`,
                stock: {
                    amount: 20,
                    sold: 15,
                    instock: 'in stock',
                    soldout: 'sold out',
                    preorder: 'preorder',
                },
            },
        ],
    },

    // {
    //     id: 14,
    //     name: '',
    //     img:,
    // },
];
