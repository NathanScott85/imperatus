import React, { ReactNode } from 'react';
import { DiscountCodesProvider } from '../../discount';
import { AdminProvider } from '..';
import { BrandsProvider } from '../../brands';
import { RaritiesProvider } from '../../card-rarity';
import { CardTypesProvider } from '../../card-types';
import { CarouselProvider } from '../../carousel';
import { CategoriesProvider } from '../../categories';
import { ProductTypeProvider } from '../../product-types';
import { PromotionsProvider } from '../../promotions';
import { SetsProvider } from '../../sets';
import { VariantsProvider } from '../../variants';
import { OrdersProvider } from '../../orders';
import { VatProvider } from '../../vat';
import { ShippingProvider } from '../../shipping';

const AdminProviders = ({ children }: { children: ReactNode }) => {
    return (
        <AdminProvider>
            <VatProvider>
                <DiscountCodesProvider>
                    <OrdersProvider>
                        <CategoriesProvider>
                            <BrandsProvider>
                                <SetsProvider>
                                    <CarouselProvider>
                                        <PromotionsProvider>
                                            <ProductTypeProvider>
                                                <RaritiesProvider>
                                                    <CardTypesProvider>
                                                        <VariantsProvider>
                                                            <ShippingProvider>
                                                                {children}
                                                            </ShippingProvider>
                                                        </VariantsProvider>
                                                    </CardTypesProvider>
                                                </RaritiesProvider>
                                            </ProductTypeProvider>
                                        </PromotionsProvider>
                                    </CarouselProvider>
                                </SetsProvider>
                            </BrandsProvider>
                        </CategoriesProvider>
                    </OrdersProvider>
                </DiscountCodesProvider>
            </VatProvider>
        </AdminProvider>
    );
};

export default AdminProviders;
