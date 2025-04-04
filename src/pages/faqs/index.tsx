import React, { useState } from 'react';
import styled from 'styled-components';
import { Header, TopHeader } from '../../components/header';
import { Navigation } from '../../components/navigation';
import { BreadCrumb } from '../../components/breadcrumbs';
import { Footer } from '../../components/footer';

interface FAQItem {
    question: string;
    answer: string;
}

const faqs: FAQItem[] = [
    {
        question: 'What payment methods do you accept?',
        answer:
            'We primarily process payments through Stripe, allowing us to accept Visa, Mastercard, American Express, and Discover. We also support PayPal, Apple Pay, and Google Pay. Additionally, we offer buy now, pay later options via Klarna or Clearpay. More payment options may be added in the future.'
    },
    {
        question: 'How long does delivery take?',
        answer:
            'Standard shipping typically takes 5-7 business days, while express shipping takes 2-3 business days. Delivery times may vary depending on location and carrier delays.'
    },
    {
        question: 'Do you offer international shipping?',
        answer:
            'Currently, we only deliver within the UK. However, we plan to expand our shipping options to include international destinations such as the EU in the future.'
    },
    {
        question: 'Can I track my order?',
        answer:
            'Yes, once your order has been shipped, you will receive an email with a tracking number and a link to track your order.'
    },
    {
        question: 'What is your return policy?',
        answer:
            'Customers can return items within 30 days of receiving them, provided they are unused, unopened, and in their original packaging. For more details, visit our Returns Policy page.'
    },
    {
        question: 'Can I cancel a pre-order?',
        answer:
            'Yes, you may cancel a pre-order at any time before dispatch for a full refund. Once the order has been shipped, standard return policies apply.'
    },
    {
        question: 'What happens if my order arrives damaged?',
        answer:
            'If your order arrives damaged, please contact us within 7 days of delivery, and we will arrange a replacement or refund as appropriate.'
    },
    {
        question: 'What is your policy for damaged cards inside booster packs?',
        answer:
            'If a sealed booster pack contains a damaged card, we can only replace the booster pack itself and not individual cards inside. We recommend reaching out to the manufacturer directly, as they may offer a replacement service for damaged cards.'
    },
    {
        question: 'What happens one day before a pre-order is released?',
        answer:
            'We begin finalizing and preparing all pre-orders for dispatch the day before the official release. At that stage, cancellations may no longer be available, and the order will proceed to shipment.'
    }
];

export const FrequentlyAskedQuestions: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleAccordion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <>
            <TopHeader />
            <Header background />
            <Navigation background />
            <BreadCrumb label="FAQ" />
            <MainContainer>
                <Title>Frequently Asked Questions</Title>
                <AccordionContainer>
                    {faqs.map((faq, index) => (
                        <div key={index}>
                            <AccordionItem>
                                <AccordionHeader onClick={() => toggleAccordion(index)} isOpen={openIndex === index}>
                                    {faq.question}
                                    <ToggleIcon isOpen={openIndex === index}>{openIndex === index ? '−' : '+'}</ToggleIcon>
                                </AccordionHeader>
                                <AccordionContent isOpen={openIndex === index}>
                                    <p>{faq.answer}</p>
                                </AccordionContent>
                            </AccordionItem>
                            {index !== faqs.length - 1 && <Divider />}
                        </div>
                    ))}
                </AccordionContainer>
                <Section>
                <Content>
                    <Subtitle>Contact Information</Subtitle>
                    <Paragraph>For any additional queries, contact us at:</Paragraph>
                    <List>
                    <ListItem>Email: <span> manager@imperatusgames.co.uk</span></ListItem>
                    <ListItem>Telephone: <span>07542490573</span></ListItem>
                    </List>
                </Content>
            </Section>
            </MainContainer>
            <Footer />
        </>
    );
};

const Section = styled.section`
    margin-bottom: 0.5rem;
    display: flex;
    justify-content: center;
`;

const Content = styled.div`
    width: 100%;
    margin: 0 auto;
    font-family: Barlow;
    border-radius: 8px;
    color: white;
    text-align: center;
`;

const Paragraph = styled.p`
    line-height: 1.5;
    margin-bottom: 10px;
    font-family: Barlow;
    font-size: 1.2rem;
    span {
        font-family: Barlow;
        font-size: 1.2rem;
        color: #c79d0a;
    }
    strong {
        font-family: Barlow;
        font-size: 1.2rem;
        color: #c79d0a;
    }
`;

const List = styled.ul`
    margin-left: 8px;
    padding-left: 8px;
`;

const ListItem = styled.li`
    margin-bottom: 5px;
    list-style-type: none;
    line-height: 1.5;
    font-family: Barlow;
    font-size: 1.2rem;
    span {
        font-family: Barlow;
        font-size: 1.2rem;
        color: #c79d0a;
    }
    strong {
        font-family: Barlow;
        font-size: 1.2rem;
        color: #c79d0a;
    }
    svg {
        padding-left: 0.2rem;
    }
`;

const Subtitle = styled.h2`
    font-size: 1.5rem;
    font-weight: bold;
    margin-top: 20px;
    margin-bottom: 10px;
    font-family: Cinzel;
    text-align: center;
    color: #c79d0a;
`;

const MainContainer = styled.main`
    background-color: #130a30;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin: 0 auto;
    padding: 2rem;
`;

const Title = styled.h2`
    font-family: Cinzel, serif;
    font-size: 24px;
    margin-bottom: 1rem;
    color: #c79d0a;
    text-align: center;
`;

const AccordionContainer = styled.div`
    width: 100%;
    max-width: 900px;
    margin-bottom: 0.5rem;
`;

const AccordionItem = styled.div`
    background-color: #160d35;
    border: 1px solid #4d3c7b;
    border-radius: 8px;
    overflow: hidden;
    margin: 1rem 0rem;
`;

const AccordionHeader = styled.div<{ isOpen: boolean }>`
    background-color: #130a30;
    color: #c79d0a;
    font-family: Cinzel;
    font-size: 18px;
    font-weight: bold;
    padding: 1rem;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: background-color 0.2s;
    &:hover {
          background-color: #4d3c7b;
    }
`;

const AccordionContent = styled.div<{ isOpen: boolean }>`
    max-height: ${({ isOpen }) => (isOpen ? '500px' : '0')};
    overflow: hidden;
    visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
    background-color: #1e1245;
    padding: ${({ isOpen }) => (isOpen ? '1rem' : '0')};
    p {
        color: white;
        font-family: Barlow;
        font-size: 16px;
        line-height: 1.5;
    }
`;

const ToggleIcon = styled.span<{ isOpen: boolean }>`
    font-size: 22px;
    font-weight: bold;
    transition: transform 0.2s;
    color: #c79d0a;
`;

const Divider = styled.div`
    height: 1px;
    background-color: #c79d0a;
    margin: 8px 0;
`;

export default FrequentlyAskedQuestions;
