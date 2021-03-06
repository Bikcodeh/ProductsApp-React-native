import { AxiosError } from 'axios';
import React, { createContext, useState } from 'react';
import { useEffect } from 'react';
import { ImagePickerResponse } from 'react-native-image-picker';
import cafeApi from './../api/cafeApi';
import { ProductsResponse, Producto } from './../interfaces/AppInterfaces';

type ProductsContextsProps = {
    products: Producto[];
    addProduct: (categoryId: string, productName: string) => Promise<Producto>;
    loadProducts: () => Promise<void>;
    updateProduct: (categoryId: string, productName: string, productId: string) => Promise<void>;
    deleteProduct: (id: string) => Promise<void>;
    loadProductById: (id: string) => Promise<Producto>;
    uploadImage: (data: ImagePickerResponse, id: string) => Promise<void>;
}

export const ProductsContexts = createContext({} as ProductsContextsProps);

export const ProductsProvider = ({ children }: any) => {

    const [products, setProducts] = useState<Producto[]>([]);

    useEffect(() => {
        loadProducts();
    }, [])


    const loadProducts = async () => {
        const resp = await cafeApi.get<ProductsResponse>('/api/productos/?limite=50');
        setProducts([...resp.data.productos]);
    }

    const addProduct = async (categoryId: string, productName: string): Promise<Producto> => {
        const resp = await cafeApi.post<Producto>('/api/productos', {
            nombre: productName,
            categoria: categoryId
        });
        setProducts([...products, resp.data]);
        return resp.data;
    }

    const updateProduct = async (categoryId: string, productName: string, productId: string) => {
        const resp = await cafeApi.put<Producto>(`/api/productos/${productId}`, {
            nombre: productName,
            categoria: categoryId
        });
        setProducts(products.map(prod => {
            return (prod._id === productId)
                ? resp.data
                : prod
        }));
    }

    const deleteProduct = async (id: string) => {

    }

    const loadProductById = async (id: string): Promise<Producto> => {
        const resp = await cafeApi.get<Producto>(`/api/productos/${id}`);
        return resp.data;
    }

    const uploadImage = async (data: ImagePickerResponse, id: string) => {
        const fileToUpload = {
            uri: data.assets![0].uri!,
            type: data.assets![0].type!,
            name: data.assets![0].fileName!
        }
        const formData = new FormData();
        formData.append('archivo', fileToUpload);

        try {
           const resp = await cafeApi.put(`/api/uploads/productos/${id}`, formData, {
            headers: {
                'content-type': 'multipart/form-data',
            }
        });
           console.log(resp);
        } catch (error) {
            const err = error as AxiosError
            console.log("Error uplading image ", err.response?.data);
        }
    }

    return (
        <ProductsContexts.Provider value={{
            products,
            addProduct,
            loadProducts,
            updateProduct,
            deleteProduct,
            loadProductById,
            uploadImage
        }}
        >
            {children}
        </ProductsContexts.Provider>
    );
}