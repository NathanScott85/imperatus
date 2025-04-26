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
    product?: any;
}

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
    const [items, setItems] = useState<OrderItem[]>(() => {
        const merged: Record<number, OrderItem> = {};
        for (const item of order.items) {
            if (!merged[item.productId]) {
                merged[item.productId] = {
                    productId: item.productId,
                    quantity: item.quantity,
                    price: item.price,
                    product: item.product,
                };
            } else {
                merged[item.productId].quantity += item.quantity;
                merged[item.productId].quantity += item.quantity;
            }
        }
        return Object.values(merged);
    });

    const [dropdownStates, setDropdownStates] = useState<
        Record<string, boolean>
    >({});
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        if (!products?.length) fetchProducts();
        if (!orderStatus?.length) fetchOrderStatus();
    }, []);

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setForm((prev) => ({ ...prev, [id]: value }));
    };

    const handleItemChange = (
        index: number,
        field: keyof OrderItem,
        value: number,
    ) => {
        const updated = [...items];
        updated[index][field] = value;
        setItems(updated);
    };

    const handleAddProduct = (productId: number) => {
        const selected = products!.find((p) => p.id === productId);
        if (!selected) return;

        setItems((prev) => {
            const index = prev.findIndex(
                (item) => item.productId === productId,
            );
            if (index !== -1) {
                const updated = [...prev];
                updated[index].quantity += 1;
                return updated;
            }
            return [
                ...prev,
                {
                    productId,
                    quantity: 1,
                    price: selected.price,
                    product: selected,
                },
            ];
        });
    };

    const handleSubmit = async () => {
        setError('');
        setSuccess('');
        setIsUpdating(true);

        const validItems = items.filter((item) => item.quantity > 0);

        const payload = {
            ...form,
            status,
            shippingCost: parseFloat(form.shippingCost),
            items: validItems.map((item) => ({
                productId: Number(item.productId),
                quantity: item.quantity,
                price: item.product?.price ?? item.price,
            })),
            discountCode: form.discountCode || undefined,
        };

        try {
            const response = await updateOrder(order.id, payload);
            console.log('Update response:', response);
            if (!response.success) {
                setError(response.message);
                setIsUpdating(false);
            } else {
                setSuccess(response.message);
            }
        } catch (err: any) {
            setError(err.message || 'Unexpected error updating order.');
        }
    };

    const visibleItems = items.filter((item) => item.quantity > 0);
    const estimatedSubtotal = visibleItems.reduce(
        (sum, i) => sum + i.quantity * i.price,
        0,
    );
    const estimatedVat = estimatedSubtotal * 0.2;
    const estimatedTotal =
        estimatedSubtotal + parseFloat(form.shippingCost || '0') + estimatedVat;

    const isDirty = items.some(
        (item) =>
            !order.items.find(
                (i) =>
                    i.productId === item.productId &&
                    i.quantity === item.quantity,
            ),
    );

    const selectedProductIds = visibleItems.map((i) => i.productId);

    return (
        <DeliveryContainer>
            <FormTitle>Edit Order</FormTitle>
            <BackButton onClick={onBack}>Back to Orders</BackButton>
            <DeliveryWrapper>
                <DeliveryDetailsWrapper>
                    {Object.entries(form).map(([field, value]) => (
                        <FormGroup key={field}>
                            <Label>
                                {field.charAt(0).toUpperCase() + field.slice(1)}
                            </Label>
                            <Input
                                id={field}
                                variant="secondary"
                                value={value}
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

                    <FormGroup>
                        <ProductDropdown
                            label="Add Product"
                            handleDropdownToggle={() =>
                                setDropdownStates((prev) => ({
                                    ...prev,
                                    add: !prev['add'],
                                }))
                            }
                            handleDropdownChange={(
                                _: unknown,
                                value: number,
                            ) => {
                                handleAddProduct(value);
                                setDropdownStates((prev) => ({
                                    ...prev,
                                    add: false,
                                }));
                            }}
                            onClear={() => {}}
                            toggleValue="add"
                            isDropdownOpen={dropdownStates['add'] || false}
                            header="Select Product"
                            values={products}
                            selectedValue="id"
                            displayField="name"
                            disabledOptions={selectedProductIds}
                        />
                    </FormGroup>

                    {items.map((item, index) => (
                        <ItemGroup key={item.productId}>
                            <Label>{item.product?.name || 'Product'}</Label>

                            {item.quantity > 0 ? (
                                <>
                                    <QuantityControls>
                                        <StepButton
                                            onClick={() =>
                                                handleItemChange(
                                                    index,
                                                    'quantity',
                                                    Math.max(
                                                        0,
                                                        item.quantity - 1,
                                                    ),
                                                )
                                            }
                                            disabled={item.quantity <= 0}
                                        >
                                            –
                                        </StepButton>
                                        <QuantityDisplay>
                                            {item.quantity}
                                        </QuantityDisplay>
                                        <StepButton
                                            onClick={() =>
                                                handleItemChange(
                                                    index,
                                                    'quantity',
                                                    item.quantity + 1,
                                                )
                                            }
                                        >
                                            +
                                        </StepButton>
                                    </QuantityControls>

                                    <Label>Price</Label>
                                    <Input
                                        type="number"
                                        variant="secondary"
                                        value={item.price}
                                        onChange={(e) =>
                                            handleItemChange(
                                                index,
                                                'price',
                                                parseFloat(e.target.value),
                                            )
                                        }
                                    />

                                    <TotalDisplay>
                                        Line Total: £
                                        {(item.price * item.quantity).toFixed(
                                            2,
                                        )}
                                    </TotalDisplay>
                                    <RemoveButton
                                        onClick={() =>
                                            handleItemChange(
                                                index,
                                                'quantity',
                                                0,
                                            )
                                        }
                                    >
                                        ✕ Remove
                                    </RemoveButton>
                                </>
                            ) : (
                                <UndoRemove
                                    onClick={() =>
                                        handleItemChange(index, 'quantity', 1)
                                    }
                                >
                                    ↺ Undo Remove {item.product?.name}
                                </UndoRemove>
                            )}
                        </ItemGroup>
                    ))}

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
                        <strong>Status:</strong> <StatusTag status={status} />
                    </ReadonlyInfo>
                    <ReadonlyInfo>
                        <strong>Subtotal:</strong> £
                        {(isDirty ? estimatedSubtotal : order.subtotal).toFixed(
                            2,
                        )}{' '}
                        {isDirty && '(est.)'}
                    </ReadonlyInfo>
                    <ReadonlyInfo>
                        <strong>Shipping:</strong> £
                        {parseFloat(form.shippingCost).toFixed(2)}
                    </ReadonlyInfo>
                    <ReadonlyInfo>
                        <strong>VAT:</strong> £
                        {(isDirty ? estimatedVat : order.vat).toFixed(2)}{' '}
                        {isDirty && '(est.)'}
                    </ReadonlyInfo>
                    <ReadonlyInfo>
                        <strong>Total:</strong> £
                        {(isDirty ? estimatedTotal : order.total).toFixed(2)}{' '}
                        {isDirty && '(est.)'}
                    </ReadonlyInfo>
                    <ReadonlyInfo>
                        <strong>Created At:</strong>{' '}
                        {moment(Number(order.createdAt)).format('DD-MM-YYYY')}
                    </ReadonlyInfo>

                    <ReadonlyInfoTitle>Items Ordered</ReadonlyInfoTitle>
                    {visibleItems.map((item, index) => {
                        const product = item.product;
                        return (
                            <ReadonlyInfo key={index}>
                                <strong>
                                    {product?.name || 'Unknown Product'}:
                                </strong>
                                <br />
                                Quantity: {item.quantity}
                                <br />
                                Price: £{item.price.toFixed(2)}
                                {product?.rarity?.name && (
                                    <>
                                        <br />
                                        Rarity: {product.rarity.name}
                                    </>
                                )}
                                {product?.variant?.name && (
                                    <>
                                        <br />
                                        Variant: {product.variant.name}
                                    </>
                                )}
                                {product?.cardType?.name && (
                                    <>
                                        <br />
                                        Card Type: {product.cardType.name}
                                    </>
                                )}
                                {product?.set?.setName && (
                                    <>
                                        <br />
                                        Set: {product.set.setName} (
                                        {product.set.setCode})
                                    </>
                                )}
                            </ReadonlyInfo>
                        );
                    })}
                </SummaryWrapper>
            </DeliveryWrapper>
        </DeliveryContainer>
    );
};

const QuantityControls = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

const StepButton = styled.button`
    background-color: #4d3c7b;
    border: none;
    color: white;
    font-size: 18px;
    width: 32px;
    height: 32px;
    border-radius: 4px;
    cursor: pointer;

    &:disabled {
        opacity: 0.4;
        cursor: default;
    }

    &:hover:not(:disabled) {
        background-color: #2a1f51;
    }
`;

const QuantityDisplay = styled.span`
    font-size: 16px;
    min-width: 20px;
    text-align: center;
`;

const TotalDisplay = styled.div`
    font-size: 14px;
    color: #ccc;
    margin-top: 0.25rem;
`;

const UndoRemove = styled.button`
    color: #ffd166;
    background: transparent;
    border: none;
    font-size: 14px;
    cursor: pointer;
    padding: 0;
    margin-top: 0.25rem;

    &:hover {
        color: #ffe299;
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
const ItemGroup = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    gap: 0.5rem;
    margin: 1rem 0;
    padding: 1rem;
    align-items: center;
`;
const RemoveButton = styled.button`
    background: transparent;
    color: red;
    border: none;
    font-size: 14px;
    cursor: pointer;
    padding: 0;
    margin-top: 0.25rem;
    &:hover {
        color: #ff4d4f;
    }
`;
