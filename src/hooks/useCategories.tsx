import { useState } from 'react';
import { Categoria, CategoriesResponse } from "../interfaces/AppInterfaces";
import { useEffect } from 'react';
import cafeApi from './../api/cafeApi';

export const useCategories = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [categories, setCategories] = useState<Categoria[]>([]);

    useEffect(() => {
      getCategories();
    }, [])
    
    const getCategories = async () => {
        const resp = await cafeApi.get<CategoriesResponse>('/api/categorias');
        setCategories(resp.data.categorias)
        setIsLoading(false)
    }

    return {
        isLoading,
        categories
    }
}
