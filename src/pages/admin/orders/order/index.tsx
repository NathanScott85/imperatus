import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Button from '../../../../components/button';
import { Input } from '../../../../components/input';
import {
    Order as OrderContextProps,
    useOrdersContext,
} from '../../../../context/orders';
import { useProductsContext } from '../../../../context/products';
import { ProductDropdown } from '../../products/add-product/dropdown';
import moment from 'moment';
import StatusTag from '../../../../components/status';

interface OrderDetailsProps {
    order: OrderContextProps;
    onBack: () => void;
}

interface OrderItem {
    productId: number;
    quantity: number;
    price: number;
}

type FormField = keyof Form;
type Form = {
    name: string;
    address: string;
    city: string;
    postcode: string;
    phone: string;
    email: string;
    shippingCost: string;
    discountCode: string;
};

export const Order: React.FC<OrderDetailsProps> = ({ order, onBack }) => {
    const { updateOrder, orderStatus, fetchOrderStatus } = useOrdersContext();
    const { products, fetchProducts } = useProductsContext();

    const [form, setForm] = useState<Form>({
        name: order.name,
        address: order.address,
        city: order.city,
        postcode: order.postcode,
        phone: order.phone,
        email: order.email,
        shippingCost: order.shippingCost.toString(),
        discountCode: order.discountCode?.code || '',
    });

    const [status, setStatus] = useState(order.status);

    const [items, setItems] = useState<OrderItem[]>(
        order.items?.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
        })) || [],
    );

    const [dropdownStates, setDropdownStates] = useState<
        Record<string, boolean>
    >({});
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        if (!products || products.length === 0) fetchProducts();
        if (!orderStatus || orderStatus.length === 0) fetchOrderStatus();
    }, []);

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setForm((prev) => ({ ...prev, [id]: value }));
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
            const selected = products?.find((p) => p.id === value);
            if (selected) handleItemInputChange(index, 'price', selected.price);
        }
        setDropdownStates((prev) => ({
            ...prev,
            [`product-${index}`]: false,
        }));
    };

    const handleRemoveItem = (index: number) => {
        const updated = items.filter((_, i) => i !== index);
        setItems(updated);
        setDropdownStates((prev) => {
            const next = { ...prev };
            delete next[`product-${index}`];
            return next;
        });
    };

    const handleSubmit = async () => {
        setError('');
        setSuccess('');
        setIsUpdating(true);

        const validItems = items.filter(
            (item) => item.productId !== 0 && item.quantity > 0,
        );

        const mergedItemsMap = new Map<number, OrderItem>();
        for (const item of validItems) {
            const existing = mergedItemsMap.get(item.productId);
            if (existing) {
                existing.quantity += item.quantity;
            } else {
                mergedItemsMap.set(item.productId, { ...item });
            }
        }

        const mergedItems = Array.from(mergedItemsMap.values());

        const payload = {
            ...form,
            status,
            shippingCost: parseFloat(form.shippingCost),
            items:
                mergedItems.length > 0
                    ? mergedItems.map((item) => ({
                          productId: Number(item.productId),
                          quantity: item.quantity,
                          price: item.price,
                      }))
                    : undefined,
            discountCode: form.discountCode || undefined,
        };

        try {
            await updateOrder(order.id, payload);
            setSuccess('Order updated successfully.');
        } catch {
            setError('Failed to update order.');
        } finally {
            setIsUpdating(false);
        }
    };

    const selectedProductIds = items.map((item) => item.productId);

    return (
        <DeliveryContainer>
            <FormTitle>Edit Order</FormTitle>
            <BackButton onClick={onBack}>Back to Orders</BackButton>
            <DeliveryWrapper>
                <DeliveryDetailsWrapper>
                    {Object.keys(form).map((field) => (
                        <FormGroup key={field}>
                            <Label>
                                {field.charAt(0).toUpperCase() + field.slice(1)}
                            </Label>
                            <Input
                                id={field}
                                variant="secondary"
                                value={form[field as FormField]}
                                onChange={handleFormChange}
                            />
                        </FormGroup>
                    ))}

                    <FormGroup>
                        <ProductDropdown
                            label="Status"
                            handleDropdownToggle={() =>
                                setDropdownStates((prev) => ({
                                    ...Object.keys(prev).reduce(
                                        (acc, key) => {
                                            acc[key] = false;
                                            return acc;
                                        },
                                        {} as Record<string, boolean>,
                                    ),
                                    status: !prev['status'],
                                }))
                            }
                            handleDropdownChange={(
                                _: unknown,
                                value: number,
                            ) => {
                                const selected = orderStatus.find(
                                    (s) => s.id === value,
                                );
                                if (selected) setStatus(selected.value);
                                setDropdownStates((prev) => ({
                                    ...prev,
                                    status: false,
                                }));
                            }}
                            onClear={() => setStatus('')}
                            toggleValue="status"
                            isDropdownOpen={dropdownStates['status'] || false}
                            header={
                                orderStatus.find((s) => s.value === status)
                                    ?.value || 'Select Status'
                            }
                            values={orderStatus.map((s) => ({
                                id: s.id,
                                name: s.label,
                            }))}
                            selectedValue="id"
                            displayField="name"
                        />
                    </FormGroup>

                    {items.map((item, index) => {
                        const selected = products?.find(
                            (p) => p.id === items[index].productId,
                        );
                        return (
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
                                        field: unknown,
                                        value: number,
                                    ) =>
                                        handleDropdownChange(
                                            index,
                                            field as keyof OrderItem,
                                            value,
                                        )
                                    }
                                    onClear={() => {
                                        handleItemInputChange(
                                            index,
                                            'productId',
                                            0,
                                        );
                                        handleItemInputChange(
                                            index,
                                            'quantity',
                                            1,
                                        );
                                        handleItemInputChange(
                                            index,
                                            'price',
                                            0,
                                        );
                                    }}
                                    toggleValue={`product-${index}`}
                                    isDropdownOpen={
                                        dropdownStates[`product-${index}`] ||
                                        false
                                    }
                                    header={
                                        selected
                                            ? `${selected.name} (${selected.stock} in stock)`
                                            : 'Select Product'
                                    }
                                    values={products}
                                    selectedValue="productId"
                                    displayField="name"
                                    disabledOptions={selectedProductIds.filter(
                                        (id) => id !== item.productId,
                                    )}
                                />
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
                                />
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
                                />
                                {items.length > 1 && (
                                    <RemoveButton
                                        type="button"
                                        className="remove-btn"
                                        onClick={() => handleRemoveItem(index)}
                                    >
                                        ✕
                                    </RemoveButton>
                                )}
                            </ItemGroup>
                        );
                    })}

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

                    <ButtonContainer>
                        <Button
                            variant="primary"
                            onClick={handleSubmit}
                            disabled={isUpdating}
                        >
                            {isUpdating ? 'Updating...' : 'Update Order'}
                        </Button>
                    </ButtonContainer>

                    {error && <ErrorMessage>{error}</ErrorMessage>}
                    {success && <SuccessMessage>{success}</SuccessMessage>}
                </DeliveryDetailsWrapper>

                <SummaryWrapper>
                    <ReadonlyInfoTitle>Order Summary</ReadonlyInfoTitle>
                    <ReadonlyInfo>
                        <strong>Order Number:</strong> {order.orderNumber}
                    </ReadonlyInfo>
                    <ReadonlyInfo>
                        <strong>Status:</strong>
                        <StatusTag status={order.status} />
                    </ReadonlyInfo>
                    <ReadonlyInfo>
                        <strong>Subtotal:</strong> £{order.subtotal.toFixed(2)}
                    </ReadonlyInfo>
                    <ReadonlyInfo>
                        <strong>Shipping:</strong> £
                        {order.shippingCost.toFixed(2)}
                    </ReadonlyInfo>
                    <ReadonlyInfo>
                        <strong>VAT:</strong> £{order.vat.toFixed(2)}
                    </ReadonlyInfo>
                    <ReadonlyInfo>
                        <strong>Total:</strong> £{order.total.toFixed(2)}
                    </ReadonlyInfo>
                    <ReadonlyInfo>
                        <strong>Created At:</strong>{' '}
                        {moment(Number(order.createdAt)).isValid()
                            ? moment(Number(order.createdAt)).format(
                                  'DD-MM-YYYY',
                              )
                            : '—'}
                    </ReadonlyInfo>
                </SummaryWrapper>
            </DeliveryWrapper>
        </DeliveryContainer>
    );
};

const ItemGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
    max-width: 325px;
    position: relative;

    &:hover .remove-btn {
        opacity: 1;
    }
`;

const RemoveButton = styled.button`
    position: absolute;
    top: 0;
    right: -30px;
    opacity: 0;
    transition: opacity 0.2s;
    background: transparent;
    color: red;
    border: none;
    font-size: 20px;
    cursor: pointer;

    &:hover {
        color: #ff4d4f;
    }
`;

const DeliveryContainer = styled.div`
    color: white;
    width: 100%;
`;

const DeliveryWrapper = styled.div`
    border: 1px solid #ac8fff;
    border-radius: 4px;
    background-color: #160d35;
    padding: 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 2rem;
    flex-wrap: wrap;
`;

const DeliveryDetailsWrapper = styled.div`
    font-family: Barlow;
    font-size: 16px;
    color: white;
    flex: 1;
    min-width: 300px;
`;

const SummaryWrapper = styled.div`
    font-family: Barlow;
    font-size: 16px;
    color: white;
    flex: 1;
    min-width: 300px;
    background-color: #1e1245;
    border: 1px solid #4d3c7b;
    border-radius: 8px;
    padding: 1.5rem;
`;

const ReadonlyInfo = styled.p`
    font-family: Barlow;
    font-size: 16px;
    color: white;
    margin-bottom: 0.5rem;

    strong {
        color: white;
        font-size: 14px;
    }
`;

const ReadonlyInfoTitle = styled.h3`
    font-family: Cinzel;
    font-size: 18px;
    color: #c79d0a;
    margin-top: 1rem;
    margin-bottom: 0.75rem;
`;

const FormTitle = styled.h2`
    font-family: Cinzel, serif;
    font-size: 24px;
    margin-bottom: 1rem;
    color: white;
`;

const BackButton = styled.button`
    background-color: #4d3c7b;
    color: #fff;
    border: none;
    margin-bottom: 1.5rem;
    cursor: pointer;
    font-family: Barlow, sans-serif;
    font-size: 14px;
    border-radius: 4px;
    padding: 0.75rem;

    &:hover {
        background-color: #2a1f51;
    }
`;

const FormGroup = styled.div`
    margin-bottom: 1rem;
`;

const Label = styled.label`
    font-family: Barlow, sans-serif;
    font-size: 14px;
    margin-bottom: 0.5rem;
    display: block;
`;

const ButtonContainer = styled.div`
    margin-top: 1rem;
`;

const ErrorMessage = styled.p`
    color: #e74c3c;
    font-size: 16px;
    font-family: Barlow;
`;

const SuccessMessage = styled.p`
    color: green;
    font-size: 16px;
    font-family: Barlow;
`;
