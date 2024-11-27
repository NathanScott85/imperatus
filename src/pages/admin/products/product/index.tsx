import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Button from '../../../../components/button';
import { Input } from '../../../../components/input';
import { Modal } from '../../../../components/modal';
import { useAdminContext } from '../../../../context/admin';
import { useCategoriesContext } from '../../../../context/categories';

export interface ProductDetailProps {
    product: any;
    onBack: () => void;
}

export const Product: React.FC<ProductDetailProps> = ( { product, onBack } ) => {
    const { updateProduct, deleteProduct, productTypes, fetchProductTypes } = useAdminContext();
    const { categories, fetchCategories } = useCategoriesContext();

    const [updateProductData, setUpdateProductData] = useState( {
        name: product.name,
        description: product.description,
        price: product.price,
        type: product.type?.id,
        rrp: product.rrp,
        categoryId: product.categoryId,
        preorder: product.preorder,
        stockAmount: product.stock?.amount,
        stockSold: product.stock?.sold,
        stockInstock: product.stock?.instock === 'In Stock',
        stockSoldout: product.stock?.soldout === 'Sold Out',
        selectedFile: null as File | null,
    } );

    const [previewUrl, setPreviewUrl] = useState<string | null>( null );
    const [error, setError] = useState( '' );
    const [success, setSuccess] = useState( '' );
    const [isUpdating, setIsUpdating] = useState( false );
    const [isDeleting, setIsDeleting] = useState( false );
    const [isModalVisible, setIsModalVisible] = useState( false );
    const [confirmationText, setConfirmationText] = useState( '' );

    const fileInputRef = useRef<HTMLInputElement | null>( null );

    useEffect( () => {
        fetchProductTypes();
        fetchCategories();
    }, [fetchProductTypes, fetchCategories] );

    useEffect( () => {
        if ( updateProductData.selectedFile ) {
            const objectUrl = URL.createObjectURL( updateProductData.selectedFile );
            setPreviewUrl( objectUrl );
            return () => URL.revokeObjectURL( objectUrl );
        }
    }, [updateProductData.selectedFile] );

    const handleInputChange = ( e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> ) => {
        const { id, value, type } = e.target;
        const checked = type === 'checkbox' ? ( e.target as HTMLInputElement ).checked : undefined;

        setUpdateProductData( ( prevState ) => ( {
            ...prevState,
            [id]: type === 'checkbox' ? checked : value,
        } ) );
    };

    const handleImageChange = ( e: React.ChangeEvent<HTMLInputElement> ) => {
        const file = e.target?.files?.[0];
        if ( file ) {
            setUpdateProductData( ( prevState ) => ( {
                ...prevState,
                selectedFile: file,
            } ) );
        }
    };

    const clearFileInput = () => {
        if ( fileInputRef.current ) {
            fileInputRef.current.value = '';
        }
        setUpdateProductData( ( prevState ) => ( {
            ...prevState,
            selectedFile: null,
        } ) );
        setPreviewUrl( null );
    };

    const handleUpdate = async () => {
        setError( '' );
        setSuccess( '' );
        setIsUpdating( true );

        const {
            name,
            description,
            price,
            type,
            rrp,
            preorder,
            selectedFile,
            stockAmount,
            stockSold,
            categoryId,
            stockInstock,
            stockSoldout,
        } = updateProductData;

        if ( !name || !description || price == null || !type || !categoryId ) {
            setError( 'Name, description, price, type, and category are required.' );
            setIsUpdating( false );
            return;
        }

        try {
            await updateProduct( {
                id: product.id,
                name,
                description,
                price: parseFloat( price ),
                productTypeId: parseInt( type ),
                categoryId: parseInt( categoryId ),
                rrp: rrp ? parseFloat( rrp ) : undefined,
                preorder,
                img: selectedFile || undefined,
                stockAmount: parseInt( stockAmount ),
                stockSold: parseInt( stockSold ),
                stockInstock: stockInstock ? 'In Stock' : 'Not In Stock',
                stockSoldout: stockSoldout ? 'Sold Out' : 'Not Sold Out',
            } );

            setSuccess( 'Product updated successfully!' );
            clearFileInput();
        } catch ( err ) {
            setError( 'Failed to update product.' );
        } finally {
            setIsUpdating( false );
        }
    };

    const handleOpenModal = () => {
        setIsModalVisible( true );
        setError( '' );
        setSuccess( '' );
    };

    const handleCloseModal = () => {
        setIsModalVisible( false );
        setConfirmationText( '' );
        setError( '' );
        setSuccess( '' );
    };

    const handleDelete = async () => {
        if ( confirmationText !== 'DELETE' ) {
            setError( 'Please type "DELETE" to confirm' );
            return;
        }

        try {
            await deleteProduct( product.id );
            setSuccess( 'Product deleted successfully!' );
            handleCloseModal();
            onBack();
        } catch ( err ) {
            setError( 'Failed to delete product.' );
        } finally {
            setIsDeleting( false );
        }
    };

    return (
        <ProductContainer>
            <FormTitle>Edit Product</FormTitle>
            <BackButton onClick={onBack}>Back to Products</BackButton>
            <ProductWrapper>
                <ProductDetailsWrapper>
                    <strong>Name:</strong>
                    <ProductDetail>{product.name}</ProductDetail>
                    <strong>Description:</strong>
                    <ProductDetail>{product.description}</ProductDetail>
                    <strong>Type:</strong>
                    <ProductDetail>{product.type.name}</ProductDetail>
                    <strong>Price:</strong>
                    <ProductDetail>£{product.price.toFixed( 2 )}</ProductDetail>
                    <strong>RRP:</strong>
                    <ProductDetail>£{product.rrp.toFixed( 2 )}</ProductDetail>
                    <strong>Stock Amount:</strong>
                    <ProductDetail>{product.stock?.amount}</ProductDetail>
                    <strong>Stock Sold:</strong>
                    <ProductDetail>{product.stock?.sold}</ProductDetail>
                    <strong>Status:</strong>
                    <ProductDetail>
                        {product.stock?.amount > 0 ? 'In Stock' : 'Sold Out'}
                    </ProductDetail>
                    <strong>Preorder:</strong>
                    <ProductDetail>
                        {product.preorder ? 'Yes' : 'No'}
                    </ProductDetail>
                </ProductDetailsWrapper>
                <FormWrapper>
                    <FormRow>
                        <FormGroup>
                            <Label htmlFor="name">Product Name</Label>
                            <Input
                                variant="secondary"
                                id="name"
                                value={updateProductData.name}
                                onChange={handleInputChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="type">Product Type</Label>
                            <Select
                                id="type"
                                value={updateProductData.type}
                                onChange={handleInputChange}
                            >
                                <option value="">Select a Type</option>
                                {productTypes!.map( ( type ) => (
                                    <option key={type.id} value={type.id}>
                                        {type.name}
                                    </option>
                                ) )}
                            </Select>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="categoryId">Category</Label>
                            <Select
                                id="categoryId"
                                value={updateProductData.categoryId}
                                onChange={handleInputChange}
                            >
                                <option value="">Select a Category</option>
                                {categories.map( ( category: any ) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ) )}
                            </Select>
                        </FormGroup>
                    </FormRow>
                    <FormRow>

                    </FormRow>
                    <FormRow>
                        <FormGroup>
                            <Label htmlFor="description">Description</Label>
                            <Input
                                variant="description"
                                id="description"
                                value={updateProductData.description}
                                onChange={handleInputChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="price">Price (£)</Label>
                            <Input
                                variant="birthday"
                                id="price"
                                type="number"
                                value={updateProductData.price.toFixed( 2 )}
                                onChange={handleInputChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="rrp">RRP (£)</Label>
                            <Input
                                variant="birthday"
                                id="rrp"
                                type="number"
                                value={updateProductData.rrp?.toFixed( 2 ) || ''}
                                onChange={handleInputChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="stockAmount">Stock Amount</Label>
                            <Input
                                variant="birthday"
                                id="stockAmount"
                                type="number"
                                value={updateProductData.stockAmount}
                                onChange={handleInputChange}
                            />
                        </FormGroup>
                    </FormRow>
                    <FormRow>
                        <FormGroup>
                            <Label htmlFor="stockSold">Stock Sold</Label>
                            <Input
                                variant="birthday"
                                id="stockSold"
                                type="number"
                                value={updateProductData.stockSold}
                                onChange={handleInputChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="stockInstock">In Stock</Label>
                            <Input
                                id="stockInstock"
                                type="checkbox"
                                checked={updateProductData.stockInstock}
                                onChange={handleInputChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="stockSoldout">Sold Out</Label>
                            <Input
                                id="stockSoldout"
                                type="checkbox"
                                checked={updateProductData.stockSoldout}
                                onChange={handleInputChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="preorder">Preorder</Label>
                            <Input
                                id="preorder"
                                type="checkbox"
                                checked={updateProductData.preorder}
                                onChange={handleInputChange}
                            />
                        </FormGroup>
                    </FormRow>
                    <FormGroup>
                        <Label htmlFor="image">Upload Image</Label>
                        <Input
                            variant="secondary"
                            type="file"
                            id="image"
                            ref={fileInputRef}
                            onChange={handleImageChange}
                        />
                        {updateProductData.selectedFile && (
                            <Button
                                variant="secondary"
                                size="xsmall"
                                onClick={clearFileInput}
                            >
                                Clear File
                            </Button>
                        )}
                    </FormGroup>
                    <ButtonContainer>
                        <Button
                            variant="primary"
                            onClick={handleUpdate}
                            disabled={isUpdating}
                        >
                            {isUpdating ? 'Updating...' : 'Update Product'}
                        </Button>
                        <Button
                            variant="primary"
                            onClick={handleOpenModal}
                            disabled={isDeleting}
                        >
                            Delete Product
                        </Button>
                    </ButtonContainer>
                    {error && <ErrorMessage>{error}</ErrorMessage>}
                    {success && <SuccessMessage>{success}</SuccessMessage>}
                    <ButtonContainer> </ButtonContainer>
                </FormWrapper>
                <ImagePreviewContainer>
                    <ImagePreviewTitle>Image Preview</ImagePreviewTitle>
                    {previewUrl && (
                        <ImagePreview src={previewUrl} alt="Image preview" />
                    )}
                </ImagePreviewContainer>
            </ProductWrapper>
            {isModalVisible && (
                <Modal
                    title="Delete Product"
                    content="Are you sure you want to delete this product? This action cannot be undone."
                    label='To confirm this, type "DELETE"'
                    confirmationText={confirmationText}
                    errorMessage={error}
                    successMessage={success}
                    setConfirmationText={setConfirmationText}
                    handleDeleteAccount={handleDelete}
                    handleCloseModal={handleCloseModal}
                />
            )}
        </ProductContainer>
    );
};

const ProductContainer = styled.div`
    color: white;
`;

const ProductWrapper = styled.div`
    border: 1px solid #ac8fff;
    border-radius: 4px;
    background-color: #160d35;
    padding: 1.5rem;
    display: flex;
    align-items: flex-start;
`;

const ProductDetailsWrapper = styled.div`
    font-family: Barlow;
    font-size: 16px;
    color: white;
    margin-right: 2rem;
    strong {
        font-family: Barlow;
        color: #c79d0a;
        font-size: 16px;
    }
    width: 327px;
`;

const ProductDetail = styled.p`
    font-family: Barlow;
    font-size: 14px;
    color: white;
    padding-bottom: 0.5rem;
`;

const FormWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const FormRow = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
`;

const FormGroup = styled.div`
    flex: 1;
    margin-bottom: 1rem;
`;

const Label = styled.label`
    font-family: Barlow, sans-serif;
    font-size: 14px;
    margin-bottom: 0.5rem;
    display: block;
`;

const ImagePreviewContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 1rem;
`;

const ImagePreviewTitle = styled.h2`
    font-family: Cinzel, serif;
    font-size: 18px;
    margin-bottom: 1rem;
    color: white;
`;

const ImagePreview = styled.img`
    max-width: 200px;
    max-height: 200px;
    border: 1px solid #ac8fff;
    border-radius: 4px;
`;

const Select = styled.select`
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ac8fff;
    border-radius: 4px;
    background-color: #160d35;
    color: white;
        font-family: Barlow, sans-serif;
        font-size: 14px;
`;

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 1rem;
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

const FormTitle = styled.h2`
    font-family: Cinzel, serif;
    font-size: 24px;
    margin-bottom: 1rem;
    color: white;
`;
