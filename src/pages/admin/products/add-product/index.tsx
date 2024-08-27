import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useAdminContext } from '../../../../context/admin';
import { useCategoriesContext } from '../../../../context/categories';
import Button from '../../../../components/button';
import { Input } from '../../../../components/input';
import { ChevronUp } from '../../../../components/svg/chevron-up';

export const AddProduct = () => {
    const [productName, setProductName] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [stockAmount, setStockAmount] = useState('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [preorder, setPreorder] = useState(false);
    const [rrp, setRrp] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const { categories, fetchCategories } = useCategoriesContext();
    const { createProduct } = useAdminContext(); // Get createProduct from context

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const clearFileInput = () => {
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        setSelectedFile(null);
    };

    const handleProductNameChange = (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setProductName(e.target.value);
        setIsButtonDisabled(false);
    };

    const handleCategoryChange = (catId: string) => {
        setCategory(catId);
        setIsDropdownOpen(false);
    };

    const handleDropdownToggle = () => {
        setIsDropdownOpen((prev) => !prev);
    };

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPrice(e.target.value);
        setIsButtonDisabled(false);
    };

    const handleStockAmountChange = (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setStockAmount(e.target.value);
        setIsButtonDisabled(false);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedFile(e.target.files[0]);
        }
        setIsButtonDisabled(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setIsButtonDisabled(true);

        if (
            !productName ||
            !category ||
            !price ||
            !stockAmount ||
            !selectedFile
        ) {
            setError('All fields are required, including an image.');
            setIsButtonDisabled(false);
            return;
        }

        try {
            const { success, message } = await createProduct({
                name: productName,
                price: parseFloat(price),
                type: 'Standard', // Default type, can be adjusted or made dynamic
                description: '', // Add description if needed
                img: selectedFile,
                categoryId: parseInt(category),
                stockAmount: parseInt(stockAmount),
                preorder, // Include preorder state
                rrp: rrp ? parseFloat(rrp) : undefined, // Include rrp state
            });

            if (success) {
                setSuccess(message);
                clearFileInput();
                setProductName('');
                setCategory('');
                setPrice('');
                setStockAmount('');
                setRrp('');
                setPreorder(false); // Reset preorder
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
            <div>
                <ProductTitle>Add New Product</ProductTitle>
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label htmlFor="productName">Product Name</Label>
                        <Input
                            variant="secondary"
                            type="text"
                            id="productName"
                            value={productName}
                            onChange={handleProductNameChange}
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="category">Category</Label>
                        <Select onClick={handleDropdownToggle}>
                            <DropdownHeader>
                                {category
                                    ? categories.find(
                                          (cat: any) => cat.id === category,
                                      )?.name
                                    : 'Select Category'}
                                <ChevronContainer
                                    isDropdownOpen={isDropdownOpen}
                                >
                                    <ChevronUp stroke="#C79D0A" />
                                </ChevronContainer>
                            </DropdownHeader>
                            {isDropdownOpen && (
                                <DropdownList>
                                    {categories.map((cat: any) => (
                                        <DropDownOption
                                            key={cat.id}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleCategoryChange(cat.id);
                                            }}
                                        >
                                            {cat.name}
                                        </DropDownOption>
                                    ))}
                                </DropdownList>
                            )}
                        </Select>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="price">Price</Label>
                        <Input
                            variant="secondary"
                            type="text"
                            id="price"
                            value={price}
                            onChange={handlePriceChange}
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="stockAmount">Stock Amount</Label>
                        <Input
                            variant="secondary"
                            type="number"
                            id="stockAmount"
                            value={stockAmount}
                            onChange={handleStockAmountChange}
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="preorder">Preorder</Label>
                        <Input
                            variant="secondary"
                            type="checkbox"
                            id="preorder"
                            checked={preorder}
                            onChange={(e) => setPreorder(e.target.checked)}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="rrp">RRP</Label>
                        <Input
                            variant="secondary"
                            type="text"
                            id="rrp"
                            value={rrp}
                            onChange={(e) => setRrp(e.target.value)}
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
                    <ButtonContainer>
                        <Button
                            variant="primary"
                            type="submit"
                            disabled={
                                !productName ||
                                !category ||
                                !price ||
                                !stockAmount ||
                                isButtonDisabled
                            }
                        >
                            {isButtonDisabled ? 'Adding...' : 'Add Product'}
                        </Button>
                    </ButtonContainer>
                </Form>
                {error && <ErrorMessage>{error}</ErrorMessage>}
                {success && <SuccessMessage>{success}</SuccessMessage>}
            </div>
        </ProductContainer>
    );
};

// Styled Components
const ProductContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 2rem;
    background-color: #160d35;
    color: white;
    border: 1px solid #4d3c7b;
    border-radius: 8px;
    width: 100%;
    margin: 0 auto;
`;

const ProductTitle = styled.h2`
    font-family: Cinzel, serif;
    font-size: 24px;
    margin-bottom: 1rem;
    color: white;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: fit-content;
`;

const FormGroup = styled.div`
    margin-bottom: 1rem;
    position: relative;
`;

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const Label = styled.label`
    font-family: Barlow, sans-serif;
    font-size: 14px;
    margin-bottom: 0.5rem;
    display: block;
`;

const Select = styled.div`
    position: relative;
    width: 325px;
`;

const DropdownHeader = styled.div`
    font-family: Barlow, sans-serif;
    font-size: 14px;
    padding: 0.5rem;
    border: 1px solid #4d3c7b;
    background-color: #160d35;
    color: white;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const DropdownList = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    position: absolute;
    width: 100%;
    background-color: #160d35;
    border: 1px solid #4d3c7b;
    max-height: 150px;
    overflow-y: auto;
    z-index: 10;
`;

const DropDownOption = styled.li`
    font-family: Barlow, sans-serif;
    font-size: 14px;
    padding: 0.5rem;
    background-color: #2a1f51;
    color: white;
    cursor: pointer;

    &:hover {
        background-color: #160d35;
        color: #c79d0a;
    }

    &:disabled {
        cursor: not-allowed;
        color: #999;
    }
`;

const ChevronContainer = styled.div<{ isDropdownOpen: boolean }>`
    transition: transform 0.3s ease;
    transform: ${({ isDropdownOpen }) =>
        isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
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
