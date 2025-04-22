import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Input } from '../../../../components/input';
import Button from '../../../../components/button';
import { useOrdersContext } from '../../../../context/orders';
import { useProductsContext } from '../../../../context/products';
import { ProductDropdown } from '../../products/add-product/dropdown';

interface OrderItem {
    productId: number;
    quantity: number;
    price: number;
}

export const AddOrder = () => {
    const { createOrder } = useOrdersContext();
    const { products, fetchProducts } = useProductsContext();

    const [form, setForm] = useState({
        email: '',
        name: '',
        address: '',
        city: '',
        postcode: '',
        phone: '',
        shippingCost: '',
        discountCode: '',
    });

    const [items, setItems] = useState<OrderItem[]>([
        { productId: 0, quantity: 1, price: 0 },
    ]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [dropdownStates, setDropdownStates] = useState<
        Record<string, boolean>
    >({});

    useEffect(() => {
        if (!products || products.length === 0) fetchProducts();
    }, []);

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setForm((prev) => ({ ...prev, [id]: value }));
    };

    const handleRemoveItem = (index: number) => {
        const updated = items.filter((_, i) => i !== index);
        setItems(updated);

        setDropdownStates((prev) => {
            const newStates = { ...prev };
            delete newStates[`product-${index}`];
            return newStates;
        });
    };

    const handleItemInputChange = (
        index: number,
        field: keyof OrderItem,
        value: number,
    ) => {
        const updated = [...items];
        updated[index][field] = value;
        setItems(updated);
    };

    const handleDropdownChange = (
        index: number,
        field: keyof OrderItem,
        value: number,
    ) => {
        handleItemInputChange(index, field, value);

        if (field === 'productId') {
            const selectedProduct = products?.find((p) => p.id === value);
            if (selectedProduct) {
                handleItemInputChange(index, 'price', selectedProduct.price);
            }
        }

        setDropdownStates((prev) => ({
            ...prev,
            [`product-${index}`]: false,
        }));
    };

    const handleSubmit = async () => {
        setError('');
        setSuccess('');
        setIsSubmitting(true);

        try {
            const payload = {
                ...form,
                shippingCost: parseFloat(form.shippingCost),
                items: items.map((item) => ({
                    productId: Number(item.productId),
                    quantity: item.quantity,
                    price: item.price,
                })),
                discountCode: form.discountCode || undefined,
            };

            await createOrder(payload);
            setSuccess('Order created successfully.');
            setForm({
                email: '',
                name: '',
                address: '',
                city: '',
                postcode: '',
                phone: '',
                shippingCost: '',
                discountCode: '',
            });
            setItems([{ productId: 0, quantity: 1, price: 0 }]);
        } catch (err) {
            setError('Failed to create order.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Container>
            <Title>Add Order</Title>

            <FormRow>
                <FormGroup>
                    <Label>Email</Label>
                    <Input
                        id="email"
                        variant="secondary"
                        value={form.email}
                        onChange={handleFormChange}
                    />
                    <Label>Name</Label>
                    <Input
                        id="name"
                        variant="secondary"
                        value={form.name}
                        onChange={handleFormChange}
                    />
                    <Label>Address</Label>
                    <Input
                        id="address"
                        variant="secondary"
                        value={form.address}
                        onChange={handleFormChange}
                    />
                    <Label>City</Label>
                    <Input
                        id="city"
                        variant="secondary"
                        value={form.city}
                        onChange={handleFormChange}
                    />
                    <Label>Postcode</Label>
                    <Input
                        id="postcode"
                        variant="secondary"
                        value={form.postcode}
                        onChange={handleFormChange}
                    />
                    <Label>Phone</Label>
                    <Input
                        id="phone"
                        variant="secondary"
                        value={form.phone}
                        onChange={handleFormChange}
                    />
                    <Label>Shipping Cost</Label>
                    <Input
                        id="shippingCost"
                        variant="secondary"
                        value={form.shippingCost}
                        onChange={handleFormChange}
                    />
                </FormGroup>

                <FormGroupRight>
                    {items.map((item, index) => (
                        <ItemGroup key={index}>
                            <ProductDropdown
                                label="Product"
                                handleDropdownToggle={() =>
                                    setDropdownStates((prev) => ({
                                        ...Object.keys(prev).reduce(
                                            (acc, key) => {
                                                acc[key] = false;
                                                return acc;
                                            },
                                            {} as Record<string, boolean>,
                                        ),
                                        [`product-${index}`]:
                                            !prev[`product-${index}`],
                                    }))
                                }
                                handleDropdownChange={(
                                    field: keyof OrderItem,
                                    value: number,
                                ) => handleDropdownChange(index, field, value)}
                                onClear={() => {
                                    handleItemInputChange(
                                        index,
                                        'productId',
                                        0,
                                    );
                                    handleItemInputChange(index, 'quantity', 1);
                                    handleItemInputChange(index, 'price', 0);
                                }}
                                toggleValue={`product-${index}`}
                                isDropdownOpen={
                                    dropdownStates[`product-${index}`] || false
                                }
                                header={
                                    products?.find(
                                        (p) => p.id === item.productId,
                                    )?.name || 'Select Product'
                                }
                                values={products}
                                selectedValue="productId"
                                displayField="name"
                            />

                            {item.productId !== 0 && item.productId > 0 && (
                                <>
                                    <Label>Quantity</Label>
                                    <Input
                                        type="number"
                                        variant="secondary"
                                        value={item.quantity}
                                        onChange={(e) =>
                                            handleItemInputChange(
                                                index,
                                                'quantity',
                                                parseInt(e.target.value, 10),
                                            )
                                        }
                                        placeholder="Quantity"
                                    />
                                </>
                            )}
                            {item.quantity > 0 && (
                                <>
                                    <Label>Price</Label>
                                    <Input
                                        type="number"
                                        variant="secondary"
                                        value={item.price}
                                        onChange={(e) =>
                                            handleItemInputChange(
                                                index,
                                                'price',
                                                parseFloat(e.target.value),
                                            )
                                        }
                                        placeholder="Price"
                                    />
                                </>
                            )}
                            {items.length > 1 && (
                                <RemoveButton
                                    type="button"
                                    onClick={() => handleRemoveItem(index)}
                                >
                                    ✕
                                </RemoveButton>
                            )}
                        </ItemGroup>
                    ))}

                    <Button
                        variant="secondary"
                        size="small"
                        onClick={() =>
                            setItems([
                                ...items,
                                { productId: 0, quantity: 1, price: 0 },
                            ])
                        }
                    >
                        Add Item
                    </Button>
                </FormGroupRight>
            </FormRow>

            <FormGroup>
                <Label>Discount Code</Label>
                <Input
                    id="discountCode"
                    variant="secondary"
                    value={form.discountCode}
                    onChange={handleFormChange}
                />
            </FormGroup>

            <SubmitWrapper>
                <Button
                    variant="primary"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Submitting...' : 'Create Order'}
                </Button>
                {error && <ErrorText>{error}</ErrorText>}
                {success && <SuccessText>{success}</SuccessText>}
            </SubmitWrapper>
        </Container>
    );
};

const Container = styled.div`
    padding: 2rem;
    background: #160d35;
    color: white;
    border: 1px solid #4d3c7b;
    border-radius: 8px;
`;

const Title = styled.h2`
    font-family: Cinzel;
    font-size: 24px;
    margin-bottom: 1rem;
`;

const FormRow = styled.div`
    display: flex;
    flex-direction: row;
    gap: 4rem;
    margin-bottom: 2rem;
`;

const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
`;

const FormGroupRight = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
`;

const ItemGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
    max-width: 325px;
`;

const Label = styled.label`
    font-family: Barlow;
    font-size: 14px;
`;

const RemoveButton = styled.button`
    background: transparent;
    color: red;
    border: none;
    font-size: 20px;
    cursor: pointer;
    padding: 0 0.5rem;
    height: fit-content;

    &:hover {
        color: #ff4d4f;
    }
`;

const SubmitWrapper = styled.div`
    margin-top: 2rem;
`;

const ErrorText = styled.p`
    color: red;
    font-size: 14px;
`;

const SuccessText = styled.p`
    color: green;
    font-size: 14px;
`;
