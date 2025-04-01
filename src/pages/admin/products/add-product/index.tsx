import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useCategoriesContext } from '../../../../context/categories';
import Button from '../../../../components/button';
import { Input } from '../../../../components/input';
import { useBrandsContext } from '../../../../context/brands';
import { useSetsContext } from '../../../../context/sets';
import { ProductDropdown } from './dropdown';
import { useProductTypeContext } from '../../../../context/product-types';
import { useVariantsContext } from '../../../../context/variants';
import { useCardTypesContext } from '../../../../context/card-types';
import { useProductsContext } from '../../../../context/products';
import { useRaritiesContext } from '../../../../context/card-rarity';

export const AddProduct = () => {
    const [addProduct, setAddProduct] = useState({
        productName: '',
        productTypeId: null as number | null,
        cardTypeId: null as number | null,
        variantId: null as number | null,
        selectedRarity: null as number | null,
        description: '',
        category: '',
        price: '',
        stock: {
            amount: 0,
            sold: 0,
            instock: 'In Stock',
            soldout: 'Sold Out',
            preorder: false,
        },
        rrp: '',
        selectedFile: null as File | null,
        selectedBrand: null as number | null,
        selectedSet: null as number | null,
    });

    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const [dropdownStates, setDropdownStates] = useState<Record<string, boolean>>({
        type: false,
        category: false,
        brand: false,
        set: false,
        cardType: false,
        variant: false,
    });

    const { categories, fetchCategories } = useCategoriesContext();
    const { createProduct } = useProductsContext();
    const { cardTypes, fetchCardTypes } = useCardTypesContext()
    const { variants, fetchVariants } = useVariantsContext();
    const { productTypes, fetchProductTypes } = useProductTypeContext()
    const { brands, fetchBrands } = useBrandsContext();
    const { sets, fetchSets } = useSetsContext();
    const { rarities, fetchRarities } = useRaritiesContext();

    useEffect(() => {
        fetchCategories();
        fetchProductTypes();
        fetchBrands();
        fetchSets();
        fetchVariants();
        fetchCardTypes();
        fetchRarities();
        if (addProduct.selectedFile) {
            const objectUrl = URL.createObjectURL(addProduct.selectedFile);
            setPreviewUrl(objectUrl);
            return () => URL.revokeObjectURL(objectUrl);
        }
    }, [fetchCategories, fetchProductTypes, fetchBrands, fetchSets, fetchVariants, fetchCardTypes, fetchRarities, addProduct.selectedFile]);

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const clearFileInput = () => {
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        setAddProduct({ ...addProduct, selectedFile: null });
        setPreviewUrl(null);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value, type } = e.target;

        if (id.startsWith('stock.')) {
            const stockKey = id.split('.')[1];
            setAddProduct((prev) => ({
                ...prev,
                stock: {
                    ...prev.stock,
                    [stockKey]:
                        type === 'checkbox'
                            ? (e.target as HTMLInputElement).checked
                            : value,
                },
            }));
        } else {
            if (type === 'checkbox' && e.target instanceof HTMLInputElement) {
                setAddProduct({ ...addProduct, [id]: e.target.checked });
            } else {
                setAddProduct({ ...addProduct, [id]: value });
            }
        }
        setIsButtonDisabled(false);
    };

    const handleDropdownToggle = (dropdown: string) => {
        setDropdownStates((prev) => ({
            ...Object.keys(prev).reduce(
                (acc, key) => {
                    acc[key] = false;
                    return acc;
                },
                {} as Record<string, boolean>,
            ),
            [dropdown]: !prev[dropdown],
        }));
    };

    const handleDropdownChange = (field: string, value: any) => {
        setAddProduct((prev) => ({
            ...prev,
            [field]: value,
        }));
        setDropdownStates({
            type: false,
            category: false,
            brand: false,
            set: false,
            rarities: false
        });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setAddProduct({ ...addProduct, selectedFile: file });
            const objectUrl = URL.createObjectURL(file);
            setPreviewUrl(objectUrl);
            return () => URL.revokeObjectURL(objectUrl);
        }
        setIsButtonDisabled(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setIsButtonDisabled(true);
        const {
            productName,
            productTypeId,
            description,
            category,
            price,
            stock,
            selectedFile,
            rrp,
            selectedBrand,
            selectedSet,
        } = addProduct;

        if (!productName || !productTypeId || !category || !price || !selectedFile || !selectedBrand) {
            setError('All fields are required, including an image, brand, and set.');
            setIsButtonDisabled(false);
            return;
        }

        try {
            const { success, message } = await createProduct({
                name: productName,
                price: parseFloat(price),
                productTypeId: Number(productTypeId),
                cardTypeId: addProduct.cardTypeId ? Number(addProduct.cardTypeId) : undefined,
                brandId: Number(selectedBrand),
                setId: Number(selectedSet),
                rarityId: addProduct.selectedRarity ? Number(addProduct.selectedRarity) : undefined,
                img: selectedFile,
                categoryId: parseInt(category),
                stock: {
                    amount: Number(stock.amount),
                    sold: 0,
                    instock: stock.instock,
                    soldout: stock.soldout,
                    preorder: stock.preorder,
                },
                preorder: stock.preorder,
                description,
                rrp: rrp ? parseFloat(rrp) : undefined,
            });

            if (success) {
                setSuccess(message);
                clearFileInput();
                setAddProduct({
                    productName: '',
                    description: '',
                    productTypeId: null,
                    cardTypeId: null,
                    variantId: null,
                    category: '',
                    price: '',
                    stock: {
                        amount: 0,
                        sold: 0,
                        instock: 'In Stock',
                        soldout: 'Sold Out',
                        preorder: false,
                    },
                    rrp: '',
                    selectedFile: null,
                    selectedBrand: null,
                    selectedSet: null,
                    selectedRarity: null,
                });
            } else {
                setError(message);
            }
        } catch (err) {
            setError('An unexpected error occurred.');
        } finally {
            setIsButtonDisabled(false);
        }
    };

    return (
        <ProductContainer>
            <ProductTitle>Add New Product</ProductTitle>
            <FormContainer>
                <Form onSubmit={handleSubmit}>
                    <FormWrapper>
                        <FormGroup>
                            <Label htmlFor="productName">Product Name</Label>
                            <Input
                                variant="secondary"
                                type="text"
                                id="productName"
                                value={addProduct.productName}
                                onChange={handleInputChange}
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="description">Description</Label>
                            <Input
                                variant="description"
                                id="description"
                                value={addProduct.description}
                                onChange={handleInputChange}
                                required
                            />
                        </FormGroup>
                        <ProductDropdown
                            label="Category"
                            handleDropdownToggle={handleDropdownToggle}
                            handleDropdownChange={handleDropdownChange}
                            toggleValue="category"
                            isDropdownOpen={dropdownStates.category}
                            header={
                                addProduct.category
                                    ? categories!?.find(
                                        (category: any) =>
                                            category.id.toString() ===
                                            addProduct.category,
                                    )?.name
                                    : 'Select Category'
                            }
                            values={categories}
                            selectedValue="category"
                            displayField="name"
                        />

                        {['Card Games', 'Single Cards'].includes(
                            categories?.find((category: any) =>
                                category.id.toString() === addProduct.category
                            )?.name || ''
                        ) && (
                                <ProductDropdown
                                    label="Set"
                                    handleDropdownToggle={() => handleDropdownToggle('set')}
                                    handleDropdownChange={handleDropdownChange}
                                    toggleValue="set"
                                    isDropdownOpen={dropdownStates.set}
                                    header={
                                        addProduct.selectedSet
                                            ? sets.find((s: any) => s.id === addProduct.selectedSet)
                                                ?.setName
                                            : 'Select Set'
                                    }
                                    values={sets}
                                    selectedValue="selectedSet"
                                    displayField="setName"
                                />
                            )}


                        {addProduct.category && (
                            <ProductDropdown
                                label="Product Type"
                                handleDropdownToggle={() =>
                                    handleDropdownToggle('type')
                                }
                                handleDropdownChange={handleDropdownChange}
                                toggleValue="type"
                                isDropdownOpen={dropdownStates.type}
                                header={
                                    addProduct.productTypeId
                                        ? productTypes!?.find(
                                            (pt: any) =>
                                                pt.id ===
                                                addProduct.productTypeId,
                                        )?.name
                                        : 'Select Product Type'
                                }
                                values={productTypes}
                                selectedValue="productTypeId"
                                displayField="name"
                            />
                        )}
                        {addProduct.category && (
                            <ProductDropdown
                                label="Brand"
                                handleDropdownToggle={() =>
                                    handleDropdownToggle('brand')
                                }
                                handleDropdownChange={handleDropdownChange}
                                toggleValue="brand"
                                isDropdownOpen={dropdownStates.brand}
                                header={
                                    addProduct.selectedBrand
                                        ? brands.find(
                                            (b: any) =>
                                                b.id ===
                                                addProduct.selectedBrand,
                                        )?.name
                                        : 'Select Brand'
                                }
                                values={brands}
                                selectedValue="selectedBrand"
                                displayField="name"
                            />
                        )}
                        <ProductDropdown
                            label="Variant"
                            handleDropdownToggle={() => handleDropdownToggle('variant')}
                            handleDropdownChange={handleDropdownChange}
                            toggleValue="variant"
                            isDropdownOpen={dropdownStates.variant}
                            header={
                                addProduct.variantId
                                    ? variants?.find((v: any) => v.id === addProduct.variantId)?.name
                                    : 'Select Variant'
                            }
                            values={variants}
                            selectedValue="variantId"
                            displayField="name"
                        />

                        {['Card Games', 'Single Cards'].includes(
                            categories?.find((category: any) =>
                                category.id.toString() === addProduct.category
                            )?.name || ''
                        ) && (
                                <ProductDropdown
                                    label="Card Type"
                                    handleDropdownToggle={() =>
                                        handleDropdownToggle('cardType')
                                    }
                                    handleDropdownChange={handleDropdownChange}
                                    toggleValue="cardType"
                                    isDropdownOpen={dropdownStates.cardType}
                                    header={
                                        addProduct.cardTypeId
                                            ? cardTypes!?.find(
                                                (ct: any) => ct.id === addProduct.cardTypeId
                                            )?.name
                                            : 'Select Card Type'
                                    }
                                    values={cardTypes}
                                    selectedValue="cardTypeId"
                                    displayField="name"
                                />
                            )}
                        {['Single Cards'].includes(
                            categories?.find((category: any) =>
                                category.id.toString() === addProduct.category
                            )?.name || ''
                        ) && (
                                <ProductDropdown
                                    label="Rarity"
                                    handleDropdownToggle={() => handleDropdownToggle('rarities')}
                                    handleDropdownChange={handleDropdownChange}
                                    toggleValue="rarities"
                                    isDropdownOpen={dropdownStates.rarities}
                                    header={
                                        addProduct.selectedRarity
                                            ? rarities?.find((r) => r.id === addProduct.selectedRarity)?.name
                                            : 'Select Rarity'
                                    }
                                    values={rarities}
                                    selectedValue="selectedRarity"
                                    displayField="name"
                                />
                            )}
                        <ButtonContainer>
                            {addProduct.productName && <Button
                                variant="primary"
                                type="submit"
                                disabled={
                                    !addProduct.productName ||
                                    !addProduct.productTypeId ||
                                    !addProduct.category ||
                                    !addProduct.price ||
                                    !addProduct.stock.amount ||
                                    isButtonDisabled
                                }
                            >
                                {isButtonDisabled ? 'Adding...' : 'Add Product'}
                            </Button>}
                        </ButtonContainer>
                    </FormWrapper>
                    <FormWrapper>
                        <FormGroup>
                            <Label htmlFor="price">Price</Label>
                            <Input
                                variant="secondary"
                                type="text"
                                id="price"
                                value={addProduct.price}
                                onChange={handleInputChange}
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="stock.amount">Stock Amount</Label>
                            <Input
                                variant="secondary"
                                type="number"
                                id="stock.amount"
                                value={addProduct.stock.amount}
                                onChange={handleInputChange}
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="stock.preorder">Preorder</Label>
                            <Input
                                variant="secondary"
                                type="checkbox"
                                id="stock.preorder"
                                checked={addProduct.stock.preorder}
                                onChange={handleInputChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="rrp">RRP</Label>
                            <Input
                                variant="secondary"
                                type="text"
                                id="rrp"
                                value={addProduct.rrp}
                                onChange={handleInputChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="image">Upload Image</Label>
                            <Input
                                variant="secondary"
                                type="file"
                                id="image"
                                ref={fileInputRef}
                                onChange={handleImageChange}
                                required
                            />
                        </FormGroup>
                    </FormWrapper>
                </Form>
                <ImagePreviewContainer>
                    <ImagePreviewTitle>Image Preview</ImagePreviewTitle>
                    {previewUrl && <ImagePreview src={previewUrl} alt="Image preview" />}
                    <br />
                    {addProduct.selectedFile && (
                        <Button variant="secondary" size="xsmall" onClick={clearFileInput}>
                            Clear File
                        </Button>
                    )}
                </ImagePreviewContainer>
            </FormContainer>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            {success && <SuccessMessage>{success}</SuccessMessage>}
        </ProductContainer>
    );
};

const ProductContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 2rem;
    background-color: #160d35;
    color: white;
    border: 1px solid #4d3c7b;
    border-radius: 8px;
    width: 100%;
    margin: 0 auto;
`;

const FormContainer = styled.div`
    display: flex;
    flex-direction: row;
`;

const ProductTitle = styled.h2`
    font-family: Cinzel, serif;
    font-size: 24px;
    margin-bottom: 1rem;
    color: white;
`;

const Form = styled.form`
    display: flex;
    flex-direction: row;
    gap: 1rem;
    justify-content: space-between;
`;

const FormWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: fit-content;
`;

const FormGroup = styled.div`
    margin-bottom: 1rem;
`;

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    margin-top: 1rem;
    z-index: 0;
`;

const Label = styled.label`
    font-family: Barlow, sans-serif;
    font-size: 14px;
    margin-bottom: 0.5rem;
    display: block;
`;

const ImagePreviewContainer = styled.div`
    margin-left: 2rem;
    display: flex;
    flex-direction: column;
`;

const ImagePreviewTitle = styled.h3`
    font-family: Cinzel, serif;
    font-size: 20px;
    margin-bottom: 1rem;
    color: white;
`;

const ImagePreview = styled.img`
    max-width: 300px;
    max-height: 300px;
    border-radius: 8px;
    border: 2px solid #4d3c7b;
`;

const ErrorMessage = styled.p`
    color: red;
    font-family: Barlow, sans-serif;
    font-size: 14px;
    margin-top: 1rem;
    max-width: 75%;
`;

const SuccessMessage = styled.p`
    color: green;
    font-family: Barlow, sans-serif;
    font-size: 14px;
    margin-top: 1rem;
`;

export default AddProduct;
