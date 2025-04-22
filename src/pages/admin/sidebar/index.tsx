import React, { useState } from 'react';
import styled from 'styled-components';
import {
    AdminDivider,
    // AdminIcon,
    Cart,
    // Pie,
    SquareShapes,
    UserIcon,
    // Van,
    SignOut,
    Percent,
    Carousel,
    Promotion,
} from '../../../components/svg';
import { HomeIcon } from '../../../components/svg/home';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../../context';
import { useAdminContext } from '../../../context/admin';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Sidebar = ({ setSelectedComponent }: any) => {
    const { logout } = useAppContext();
    const { resetPagination } = useAdminContext();
    const [expandedMenu, setExpandedMenu] = useState<string | null>(null);

    const toggleMenu = (menu: string, defaultComponent?: string) => {
        setSelectedComponent(defaultComponent || menu);
        setExpandedMenu((prev) => (prev === menu ? null : menu));
        resetPagination();
    };

    return (
        <SidebarAside>
            <Menu>
                <MenuItem onClick={() => toggleMenu('Overview')}>
                    <HomeIcon />
                    OVERVIEW
                </MenuItem>
                {/* <MenuItem onClick={() => toggleMenu( 'Analytics' )}>
                    <Pie />
                    ANALYTICS
                </MenuItem> */}
                {/* {expandedMenu === 'Analytics' && (
                    <SubMenu>
                        <SubMenuItem onClick={() => setSelectedComponent( 'Temp' )}>
                            Temp
                        </SubMenuItem>
                    </SubMenu>
                )} */}
                <MenuItem onClick={() => toggleMenu('Orders')}>
                    <Cart stroke="#C79D0A" />
                    ORDERS
                </MenuItem>
                {expandedMenu === 'Orders' && (
                    <SubMenu>
                        <SubMenuItem
                            onClick={() => setSelectedComponent('CreateOrder')}
                        >
                            ADD ORDER
                        </SubMenuItem>
                        <SubMenuItem
                            onClick={() => setSelectedComponent('Orders')}
                        >
                            MANAGE ORDERS
                        </SubMenuItem>

                        <SubMenuItem
                            onClick={() =>
                                setSelectedComponent('AddOrderStatus')
                            }
                        >
                            ADD ORDER STATUS
                        </SubMenuItem>
                        <SubMenuItem
                            onClick={() => setSelectedComponent('OrderStatus')}
                        >
                            MANAGE ORDER STATUS
                        </SubMenuItem>
                    </SubMenu>
                )}
                <MenuItem onClick={() => toggleMenu('Discount', 'AddDiscount')}>
                    <Percent />
                    DISCOUNT
                </MenuItem>
                {expandedMenu === 'Discount' && (
                    <SubMenu>
                        <SubMenuItem
                            onClick={() => setSelectedComponent('AddDiscount')}
                        >
                            ADD DISCOUNT CODE
                        </SubMenuItem>
                        <SubMenuItem
                            onClick={() =>
                                setSelectedComponent('AdminDiscount')
                            }
                        >
                            MANAGE DISCOUNT CODES
                        </SubMenuItem>
                    </SubMenu>
                )}
                <MenuItem
                    onClick={() => toggleMenu('Categories', 'AddCategory')}
                >
                    <SquareShapes rotate={90} />
                    CATEGORIES
                </MenuItem>
                {expandedMenu === 'Categories' && (
                    <SubMenu>
                        <SubMenuItem
                            onClick={() => setSelectedComponent('AddCategory')}
                        >
                            ADD CATEGORY
                        </SubMenuItem>
                        <SubMenuItem
                            onClick={() =>
                                setSelectedComponent('AdminCategories')
                            }
                        >
                            MANAGE CATEGORIES
                        </SubMenuItem>
                    </SubMenu>
                )}
                <MenuItem onClick={() => toggleMenu('Products', 'AddProduct')}>
                    <SquareShapes />
                    PRODUCTS
                </MenuItem>
                {expandedMenu === 'Products' && (
                    <SubMenu>
                        <SubMenuItem
                            onClick={() => setSelectedComponent('AddProduct')}
                        >
                            ADD NEW PRODUCT
                        </SubMenuItem>
                        <SubMenuItem
                            onClick={() =>
                                setSelectedComponent('AdminProducts')
                            }
                        >
                            MANAGE PRODUCTS
                        </SubMenuItem>
                        <SubMenuItem
                            onClick={() =>
                                setSelectedComponent('AddProductType')
                            }
                        >
                            ADD PRODUCT TYPE
                        </SubMenuItem>
                        <SubMenuItem
                            onClick={() =>
                                setSelectedComponent('AdminProductTypes')
                            }
                        >
                            MANAGE PRODUCT TYPES
                        </SubMenuItem>
                        <SubMenuItem
                            onClick={() => setSelectedComponent('AddBrand')}
                        >
                            ADD BRAND
                        </SubMenuItem>
                        <SubMenuItem
                            onClick={() => setSelectedComponent('AdminBrands')}
                        >
                            MANAGE BRAND
                        </SubMenuItem>
                        <SubMenuItem
                            onClick={() => setSelectedComponent('AddSet')}
                        >
                            ADD SET
                        </SubMenuItem>
                        <SubMenuItem
                            onClick={() => setSelectedComponent('AdminSet')}
                        >
                            MANAGE SET
                        </SubMenuItem>
                        <SubMenuItem
                            onClick={() => setSelectedComponent('AddRarity')}
                        >
                            ADD RARITY
                        </SubMenuItem>
                        <SubMenuItem
                            onClick={() => setSelectedComponent('AdminRarity')}
                        >
                            MANAGE RARITY
                        </SubMenuItem>
                        <SubMenuItem
                            onClick={() => setSelectedComponent('AddVariant')}
                        >
                            ADD VARIANT
                        </SubMenuItem>
                        <SubMenuItem
                            onClick={() => setSelectedComponent('AdminVariant')}
                        >
                            MANAGE VARIANT
                        </SubMenuItem>
                        <SubMenuItem
                            onClick={() => setSelectedComponent('AddCardType')}
                        >
                            ADD CARDTYPE
                        </SubMenuItem>
                        <SubMenuItem
                            onClick={() =>
                                setSelectedComponent('AdminCardTypes')
                            }
                        >
                            MANAGE CARDTYPE
                        </SubMenuItem>
                    </SubMenu>
                )}
                <MenuItem
                    onClick={() => toggleMenu('Promotions', 'AddPromotion')}
                >
                    <Promotion />
                    PROMOTIONS
                </MenuItem>
                {expandedMenu === 'Promotions' && (
                    <SubMenu>
                        <SubMenuItem
                            onClick={() => setSelectedComponent('AddPromotion')}
                        >
                            ADD PROMOTION
                        </SubMenuItem>
                        <SubMenuItem
                            onClick={() =>
                                setSelectedComponent('AdminPromotions')
                            }
                        >
                            MANAGE PROMOTIONS
                        </SubMenuItem>
                    </SubMenu>
                )}
                <MenuItem
                    onClick={() => toggleMenu('Carousel', 'AdminCarousel')}
                >
                    <Carousel />
                    CAROUSEL
                </MenuItem>
                {expandedMenu === 'Carousel' && (
                    <SubMenu>
                        <SubMenuItem
                            onClick={() => setSelectedComponent('AddCarousel')}
                        >
                            ADD CAROUSEL PAGE
                        </SubMenuItem>
                        <SubMenuItem
                            onClick={() =>
                                setSelectedComponent('ManageCarousel')
                            }
                        >
                            MANAGE CAROUSEL
                        </SubMenuItem>
                    </SubMenu>
                )}
                {/* <MenuItem onClick={() => toggleMenu( 'Shipping' )}>
                        <Van stroke='#C79D0A' />
                    SHIPPING
                </MenuItem> */}
                <MenuItem onClick={() => toggleMenu('Customers')}>
                    <UserIcon />
                    CUSTOMERS
                </MenuItem>
            </Menu>
            <BottomContainer>
                <AdminDivider />
                <BottomMenu>
                    {/* <MenuItem onClick={() => toggleMenu( 'Settings' )}>
                        <AdminIcon />
                        SETTINGS
                    </MenuItem> */}
                    <StyledLink onClick={logout} to="/account/sign-out">
                        <SignOut />
                        LOGOUT
                    </StyledLink>
                </BottomMenu>
            </BottomContainer>
        </SidebarAside>
    );
};

const StyledLink = styled(Link)`
    display: flex;
    align-items: center;
    color: white;
    font-size: 1rem;
    margin: 0;
    padding-bottom: 0.75rem;
    cursor: pointer;
    font-family: Barlow;
    font-size: 14px;
    font-weight: 400;
    line-height: 15px;
    letter-spacing: 0.1em;

    svg {
        margin-right: 0.5rem;
    }

    &:hover {
        color: #c79d0a;
    }
`;

const SidebarAside = styled.aside`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem;
    width: 250px;
    height: fit-content;
`;

const Menu = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 1rem;
    flex-grow: 1;
`;

const BottomContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    margin-top: 0.5rem;
`;

const BottomMenu = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    padding-top: 1rem;
`;

const MenuItem = styled.div`
    display: flex;
    align-items: center;
    color: white;
    font-size: 1rem;
    margin: 0;
    padding-bottom: 0.75rem;
    cursor: pointer;
    font-family: Barlow;
    font-size: 14px;
    font-weight: 400;
    line-height: 15px;
    letter-spacing: 0.1em;

    svg {
        margin-right: 0.5rem;
    }

    &:hover {
        color: #c79d0a;
    }
`;

const SubMenu = styled.div`
    display: flex;
    flex-direction: column;
    padding-left: 1.5rem;
    gap: 0.5rem;
`;

const SubMenuItem = styled.div`
    color: white;
    font-size: 0.875rem;
    cursor: pointer;

    &:hover {
        color: #c79d0a;
    }
`;
