import { useLazyQuery, useMutation } from '@apollo/client';
import React, { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { CREATE_BRAND, DELETE_BRAND, GET_BRANDS, UPDATE_BRAND } from '../../graphql/brands';

interface File {
  id: string;
  url: string;
  key: string;
  fileName: string;
  contentType: string;
  createdAt: string;
}

interface Brands {
  id: string;
  name: string;
  description: string;
  img?: File | null;
}

const BrandsContext = createContext<any | null>( null );

export const BrandsProvider = ( { children }: { children: ReactNode } ) => {
  const [brands, setBrands] = useState<Brands[]>( [] );
  const [page, setPage] = useState( 1 );
  const [limit, setLimit] = useState( 10 );
  const [totalCount, setTotalCount] = useState( 0 );
  const [totalPages, setTotalPages] = useState( 1 );
  const [currentPage, setCurrentPage] = useState( 1 );

  const queryVariables = useMemo( () => ( { page: currentPage, limit: 10 } ), [currentPage] );

  const resetPagination = () => {
    setCurrentPage( 1 );
  };

  const [fetchBrands, { loading, error }] = useLazyQuery( GET_BRANDS, {
    fetchPolicy: 'cache-and-network',
    variables: queryVariables,
    onCompleted: ( data ) => {
      if ( data?.getAllBrands ) {
        setBrands( data.getAllBrands.brands || [] );
        setTotalPages( data.getAllBrands.totalPages )
        setTotalCount( data.getAllBrands.totalCount || 0 );
        setCurrentPage( data.getAllBrands.currentPage || 1 );
      }
    },
  } );

  const [createProductBrandMutation] = useMutation( CREATE_BRAND );

  const createProductBrand = async ( name: string, description: string, img?: File | null ) => {
    try {
      const { data } = await createProductBrandMutation( {
        variables: { name, description, img },
      } );

      if ( data?.createProductBrand ) {
        return {
          success: true,
          message: "Brand created successfully!",
          brand: data.createProductBrand,
        };
      } else {
        throw new Error( "Failed to create brand." );
      }
    } catch ( error ) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred.";
      return {
        success: false,
        message: errorMessage,
        brand: null,
      };
    }
  };

  const [updateBrandMutation] = useMutation( UPDATE_BRAND );

  const updateBrand = async ( { id, name, description, img }: Brands ) => {
    try {
      const { data } = await updateBrandMutation( {
        variables: {
          id,
          name,
          description,
          img,
        },
      } );
      if ( data && data.updateProductBrand ) {
        setBrands( ( prevBrands ) =>
          prevBrands.map( ( brand ) =>
            brand.id === id ? data.updateProductBrand : brand,
          ),
        );
      }
    } catch ( error ) {
      console.error( 'Error updating brand:', error );
    }
  }

  const [deleteBrandMutation] = useMutation( DELETE_BRAND );

  const deleteBrand = async ( id: string ) => {
    try {
      const { data } = await deleteBrandMutation( {
        variables: { id },
      } );

      if ( data && data.deleteBrand ) {

        setBrands( ( prevBrand ) => prevBrand.filter( ( brand ) => brand.id !== id ) );
        resetPagination();
      }
    } catch ( error ) {
      console.error( 'Error deleting brand:', error );
    }
  };


  return (
    <BrandsContext.Provider value={{
      brands,
      fetchBrands,
      loading,
      error,
      page,
      setPage,
      limit,
      setLimit,
      totalCount,
      totalPages,
      currentPage,
      setTotalPages,
      setTotalCount,
      resetPagination,
      createProductBrand,
      updateBrand,
      setCurrentPage,
      deleteBrand
    }}>
      {children}
    </BrandsContext.Provider>
  )
}

export const useBrandsContext = () => {
  const context = useContext( BrandsContext );

  if ( !context ) {
    throw new Error( "useBrandsContext must be used within a BrandProvider" )
  }
  return context
}