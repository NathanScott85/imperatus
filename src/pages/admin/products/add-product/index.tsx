import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useAdminContext } from '../../../../context/admin';
import { useCategoriesContext } from '../../../../context/categories';
import Button from '../../../../components/button';
import { Input } from '../../../../components/input';
import { ChevronUp } from '../../../../components/svg/chevron-up';

export const AddProduct = () => {
    const [addProduct, setAddProduct] = useState( {
        productName: '',
        productTypeId: null as number | null,
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
    } );

    const [previewUrl, setPreviewUrl] = useState<string | null>( null );
    const [error, setError] = useState( '' );
    const [success, setSuccess] = useState( '' );
    const [isButtonDisabled, setIsButtonDisabled] = useState( false );
    const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState( false );
    const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState( false );

    const { categories, fetchCategories } = useCategoriesContext();
    const { productTypes, fetchProductTypes, createProduct } = useAdminContext();

    useEffect( () => {
        fetchCategories();
        fetchProductTypes();
    }, [fetchCategories, fetchProductTypes] );

    const fileInputRef = useRef<HTMLInputElement | null>( null );

    const clearFileInput = () => {
        if ( fileInputRef.current ) {
            fileInputRef.current.value = '';
        }
        setAddProduct( { ...addProduct, selectedFile: null } );
        setPreviewUrl( null );
    };

    const handleInputChange = ( e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
        const { id, value, type } = e.target;

        if ( id.startsWith( 'stock.' ) ) {
            const stockKey = id.split( '.' )[1];
            setAddProduct( prev => ( {
                ...prev,
                stock: {
                    ...prev.stock,
                    [stockKey]: type === 'checkbox' ? ( e.target as HTMLInputElement ).checked : value,
                },
            } ) );
        } else {
            if ( type === 'checkbox' && e.target instanceof HTMLInputElement ) {
                setAddProduct( { ...addProduct, [id]: e.target.checked } );
            } else {
                setAddProduct( { ...addProduct, [id]: value } );
            }
        }
        setIsButtonDisabled( false );
    };

    const handleCategoryChange = ( catId: string ) => {
        setAddProduct( { ...addProduct, category: catId } );
        setIsCategoryDropdownOpen( false );
    };

    const handleTypeChange = ( typeId: number ) => {
        setAddProduct( ( prev ) => ( {
            ...prev,
            productTypeId: typeId
        } ) );
        setIsTypeDropdownOpen( false );
    };

    const handleCategoryDropdownToggle = () => {
        setIsCategoryDropdownOpen( prev => !prev );
        setIsTypeDropdownOpen( false );
    };

    const handleTypeDropdownToggle = () => {
        setIsTypeDropdownOpen( prev => !prev );
        setIsCategoryDropdownOpen( false );
    };

    const handleImageChange = ( e: React.ChangeEvent<HTMLInputElement> ) => {
        if ( e.target.files && e.target.files.length > 0 ) {
            const file = e.target.files[0];
            setAddProduct( { ...addProduct, selectedFile: file } );
            const objectUrl = URL.createObjectURL( file );
            setPreviewUrl( objectUrl );
        }
        setIsButtonDisabled( false );
    };

    const handleSubmit = async ( e: React.FormEvent ) => {
        e.preventDefault();
        setError( '' );
        setSuccess( '' );
        setIsButtonDisabled( true );

        const {
            productName,
            productTypeId,
            description,
            category,
            price,
            stock,
            selectedFile,
            rrp,
        } = addProduct;
        if ( !productName || !productTypeId || !category || !price || !selectedFile ) {
            setError( 'All fields are required, including an image.' );
            setIsButtonDisabled( false );
            return;
        }

        try {
            const { success, message } = await createProduct( {
                name: productName,
                price: parseFloat( price ),
                productTypeId: Number( productTypeId ),
                img: selectedFile,
                categoryId: parseInt( category ),
                stock: {
                    amount: Number( stock.amount ),
                    sold: 0,
                    instock: stock.instock,
                    soldout: stock.soldout,
                    preorder: stock.preorder,
                },
                preorder: stock.preorder,
                description,
                rrp: rrp ? parseFloat( rrp ) : undefined,
            } );

            if ( success ) {
                setSuccess( message );
                clearFileInput();
                setAddProduct( {
                    productName: '',
                    description: '',
                    productTypeId: 0,
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
                } );
            } else {
                setError( message );
            }
        } catch ( err ) {
            setError( 'An unexpected error occurred.' );
        } finally {
            setIsButtonDisabled( false );
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
                        <FormGroup>
                            <Label htmlFor="type">Type</Label>
                            <Select onClick={handleTypeDropdownToggle}>
                                <DropdownHeader>
                                    {addProduct.productTypeId
                                        ? productTypes?.find( pt => pt.id === addProduct.productTypeId )?.name
                                        : 'Select Type'}
                                    <ChevronContainer isDropdownOpen={isTypeDropdownOpen}>
                                        <ChevronUp stroke="#C79D0A" />
                                    </ChevronContainer>
                                </DropdownHeader>
                                {isTypeDropdownOpen && (
                                    <DropdownList onClick={( e ) => e.stopPropagation()}>
                                        {productTypes?.map( ( pt ) => (
                                            <DropDownOption
                                                key={pt.id}
                                                onClick={( e ) => {
                                                    e.stopPropagation();
                                                    handleTypeChange( pt.id ); // Pass the name
                                                }}
                                            >
                                                {pt.name}
                                            </DropDownOption>
                                        ) )}
                                    </DropdownList>
                                )}
                            </Select>
                        </FormGroup>

                        <FormGroup>
                            <Label htmlFor="category">Category</Label>
                            <Select onClick={handleCategoryDropdownToggle}>
                                <DropdownHeader>
                                    {addProduct.category
                                        ? categories!?.find( ( category: any ) => category.id.toString() === addProduct.category )?.name
                                        : 'Select Category'}
                                    <ChevronContainer isDropdownOpen={isCategoryDropdownOpen}>
                                        <ChevronUp stroke="#C79D0A" />
                                    </ChevronContainer>
                                </DropdownHeader>
                                {isCategoryDropdownOpen && (
                                    <DropdownList>
                                        {categories!?.map( ( category: any ) => (
                                            <DropDownOption
                                                key={category.id}
                                                onClick={( e ) => {
                                                    e.stopPropagation();
                                                    handleCategoryChange( category.id.toString() );
                                                }}
                                            >
                                                {category.name}
                                            </DropDownOption>
                                        ) )}
                                    </DropdownList>
                                )}
                            </Select>
                        </FormGroup>
                        <ButtonContainer>
                            <Button
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
                            </Button>
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
                    {previewUrl && (
                        <ImagePreview src={previewUrl} alt="Image preview" />
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
`;

const Label = styled.label`
    font-family: Barlow, sans-serif;
    font-size: 14px;
    margin-bottom: 0.5rem;
    display: block;
`;

const ProductTextarea = styled.textarea`
    width: 100%;
    padding: 0.5rem;
    margin-top: 0.5rem;
    font-family: Barlow;
    font-size: 14px;
    color: #000;
    border-radius: 4px;
    border: 1px solid #ac8fff;
    height: 100px;
`;

const Select = styled.div`
    position: relative;
    width: 100%;
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
    transform: ${( { isDropdownOpen } ) =>
        isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
`;

const ImagePreviewContainer = styled.div`
    margin-left: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
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
