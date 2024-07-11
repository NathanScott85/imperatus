
type FooterItem =
    | { type: 'text'; content: string }
    | { type: 'text'; content: string[] };

interface FooterSection {
    sectionTitle: string | null;
    items: FooterItem[];
}

export const footerContent: FooterSection[] = [
    {
        sectionTitle: null,
        items: [
            {
                type: 'text',
                content: [
                    '1 Address Land',
                    'Address',
                    'Address City', 'Address County', 'AD1S 1PS',
                    
                ],
            },
            {
                type: 'text',
                content: ['support@imperatus.co.uk', '01303 287091'],
            },
        ],
    },
    {
        sectionTitle: 'Resources',
        items: [
            { type: 'text', content: 'About us' },
            { type: 'text', content: 'FAQs' },
            { type: 'text', content: 'News & Events' },
            { type: 'text', content: 'Careers' },
            { type: 'text', content: 'Shop by Brand' },
        ],
    },
    {
        sectionTitle: 'Help',
        items: [
            { type: 'text', content: 'Privacy Policy' },
            { type: 'text', content: 'Cookie Policy' },
            { type: 'text', content: 'Site Map' },
            { type: 'text', content: 'Terms & Conditions' },
        ],
    },
    {
        sectionTitle: 'Ordering',
        items: [
            { type: 'text', content: 'Payment Methods' },
            { type: 'text', content: 'Delivery' },
            { type: 'text', content: 'International Delivery' },
            { type: 'text', content: 'Returns Policy' },
            { type: 'text', content: 'Discount Codes' },
        ],
    },
];
