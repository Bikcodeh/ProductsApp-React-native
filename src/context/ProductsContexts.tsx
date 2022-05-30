import React, { createContext, useState } from 'react';
import { Producto } from '../interfaces/AppInterfaces';

type ProductsContextsProps = {
    products: Producto[];
    loadProducts: ( categoryId: string, productName: string) => Promise<void>;
    updateProduct: ( categoryId: string, productName: string, productId: string) => Promise<void>;
    deleteProduct: ( id: string) => Promise<void>;
    loadProductById: ( id: string) => Promise<Producto>;
    uploadImage: ( data: any, id: string) => Promise<void>;
}

const ProductsContexts = createContext({} as ProductsContextsProps);

export const ProductsProvider = ({ children }: any) => {

    const [products, setProducts] = useState<Producto[]>([]);

    const loadProducts = async ( categoryId: string, productName: string) => {
        
    }

    const updateProduct = async ( categoryId: string, productName: string, productId: string) => {

    }

    const deleteProduct = async ( id: string) => {

    }

    const loadProductById = async ( id: string) => {
        throw Error("error")
    }

    const uploadImage = async ( data: any, id: string) => {

    }

    return (
        <ProductsContexts.Provider value={{
            products,
            loadProducts,
            updateProduct,
            deleteProduct,
            loadProductById,
            uploadImage,
            
        }}
        >
            { children }
        </ProductsContexts.Provider>
    );
}