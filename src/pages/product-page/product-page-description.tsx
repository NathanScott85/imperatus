import React, { useState } from 'react';
import styled from 'styled-components';

export const ProductDescription = ({ product }: any) => {
    const [activeTab, setActiveTab] = useState('description');

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
    };
    return (
        <ProductDescriptionSection>
            <GradientBorder>
                <Diamond activeTab={activeTab} />
            </GradientBorder>
            <Tabs>
                <TabButton
                    active={activeTab === 'description'}
                    onClick={() => handleTabClick('description')}
                >
                    Product Description
                </TabButton>
                <TabButton
                    active={activeTab === 'delivery'}
                    onClick={() => handleTabClick('delivery')}
                >
                    Delivery & Returns
                </TabButton>
                <TabButton
                    active={activeTab === 'whychooseus'}
                    onClick={() => handleTabClick('whychooseus')}
                >
                    Why Choose Us
                </TabButton>
            </Tabs>
            <TabContentContainer>
                {activeTab === 'description' && (
                    <TabContent>
                        <p>{product.description}</p>
                    </TabContent>
                )}
                {activeTab === 'delivery' && (
                    <TabContent>
                        <p>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry&apos;s standard dummy text ever since the
                            1500s, when an unknown printer took a galley of type
                            and scrambled it to make a type specimen book. It
                            has survived not only five centuries, but also the
                            leap into electronic typesetting, remaining
                            essentially unchanged. It was popularised in the
                            1960s with the release of Letraset sheets containing
                            Lorem Ipsum passages, and more recently with desktop
                            publishing software like Aldus PageMaker including
                            versions of Lorem Ipsum.
                        </p>
                    </TabContent>
                )}
                {activeTab === 'whychooseus' && (
                    <TabContent>
                        <p>
                            At Imperatus, we offer a diverse selection of games,
                            collectibles, and accessories, bringing together
                            enthusiasts of all kinds. Whether you&apos;re a
                            casual player, a competitive strategist, or a
                            dedicated collector, we provide high-quality
                            products, fair pricing, and a community-driven
                            experience. With a passion for gaming at our core,
                            we’re here to help you discover, play, and collect
                            with confidence.
                        </p>
                    </TabContent>
                )}
            </TabContentContainer>
            <GradientBorder />
        </ProductDescriptionSection>
    );
};

const Diamond = styled.div<{ activeTab: string }>`
    position: absolute;
    bottom: -7px;
    left: ${(props) =>
        props.activeTab === 'description'
            ? 'calc(16.66% - 7.5px)'
            : props.activeTab === 'delivery'
              ? 'calc(50% + 20px)'
              : 'calc(83.33% + 7.5px)'};
    width: 15px;
    height: 15px;
    background: white;
    border: 2px solid #ac8fff;
    transform: rotate(45deg);
    z-index: 1;
`;
const GradientBorder = styled.div`
    width: 100%;
    height: 1px;
    background: linear-gradient(
        to right,
        #c79d0a 0%,
        #ac8fff 17.5%,
        #ac8fff 76.5%,
        #c79d0a 100%
    );
    margin: 1rem 0;
    position: relative;
`;

const Tabs = styled.div`
    display: flex;
    justify-content: space-around;
    width: 100%;
    padding: 1rem 0;
`;

const TabButton = styled.button<{ active: boolean }>`
    font-family: Cinzel;
    font-size: 18px;
    font-weight: bold;
    line-height: 29.66px;
    text-align: center;
    cursor: pointer;
    background: none;
    border: none;
    color: ${(props) => (props.active ? '#000' : '#7f7f7f')};
    padding: 0.5rem 1rem;
    &:hover {
        color: #000;
    }
`;

const TabContentContainer = styled.div`
    position: relative;
    width: 100%;
    padding: 2rem;

    min-height: 200px;
    background: #fff;
`;

const TabContent = styled.div`
    font-family: Barlow;
    font-size: 18px;
    font-weight: 400;
    line-height: 26px;

    h1 {
        font-family: Cinzel;
        font-size: 18px;
        font-weight: 400;
        line-height: 29.66px;
        text-align: left;
        margin-bottom: 1rem;
    }
    p {
        font-family: Barlow;
        font-size: 16px;
        font-weight: 400;
        line-height: 26px;
        text-align: left;
        color: #000;
        word-wrap: break-word;
        max-width: 100%;
        overflow-wrap: break-word;
    }
`;

const ProductDescriptionSection = styled.section`
    margin-top: 17.5rem;
    min-width: 100%;
`;
