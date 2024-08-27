import styled from 'styled-components';
import { products } from '../../../../lib/product-mocks';

interface Stock {
    amount: number;
    sold: number;
    instock: string;
    soldout: string;
    preorder: string;
}

interface File {
    url: string;
}

interface Product {
    id: number;
    category: string;
    name: string;
    img: File | null;
    price: number;
    type: string;
    rrp: number;
    description?: string;
    stock: Stock;
    preorder?: boolean;
}
export const LatestOrders = () => {
    const latestProducts: Product[] = products.reduce(
        (acc: Product[], product: Product, index: number, arr: Product[]) => {
            if (arr.length - index <= 4) {
                acc.push(product);
            }
            return acc;
        },
        [],
    );

    return (
        <LatestOrdersContainer>
            <Title>Latest Orders</Title>
            <Header>
                <ProductHeader>Product Name</ProductHeader>
                <ProductHeaders>Stock</ProductHeaders>
                <ProductHeaders>Sold</ProductHeaders>
                <ProductHeaders>Price</ProductHeaders>
            </Header>
            <OrderList>
                {latestProducts.map((product) => (
                    <OrderItem key={product.id}>
                        <ProductInfo>
                            <ProductImage
                                src={product.img?.url}
                                alt={product.name}
                            />
                            <ProductName>{product.name}</ProductName>
                        </ProductInfo>
                        <ProductContent>{product.stock.amount}</ProductContent>
                        <ProductContent>{product.stock.sold}</ProductContent>
                        <ProductContent>
                            £{product.price.toFixed(2)}
                        </ProductContent>
                    </OrderItem>
                ))}
            </OrderList>
        </LatestOrdersContainer>
    );
};

const LatestOrdersContainer = styled.div`
    padding: 2rem;
    color: white;
    flex: 1;
    border-radius: 8px;
    background: #160d35;
    border: 1px solid #ac8fff80;
    margin-left: 1.5rem;
    display: flex;
    flex-direction: column;
`;

const Title = styled.h1`
    text-align: left;
    color: white;
    font-family: Cinzel;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0;
    border-bottom: 1px solid #ac8fff80;
`;

const OrderList = styled.div`
    flex: 1;
    overflow-y: auto;
`;

const OrderItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 0;

    border-bottom: 1px solid #ac8fff80;
`;

const ProductInfo = styled.div`
    display: flex;
    align-items: center;
    flex: 2;
    padding: 0.5rem;
`;

const ProductImage = styled.img`
    margin-right: 1rem;
    width: 25px;
    height: 100%;
`;

const ProductName = styled.span`
    text-align: left;
    flex: 2;
    color: white;
    font-family: Barlow;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 18px;
`;

const ProductHeaders = styled.span`
    text-align: right;
    flex: 1;
    color: white;
    font-family: Barlow;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
`;

const ProductHeader = styled.span`
    text-align: left;
    flex: 2;
    color: white;
    font-family: Barlow;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
`;

const ProductContent = styled.span`
    text-align: right;
    flex: 1;
    font-size: 14px;
`;
