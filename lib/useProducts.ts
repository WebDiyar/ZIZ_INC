import { useEffect, useState } from 'react';
import { Product } from '../types/index';

const useProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch('http://localhost:3001/products');
            const data: Product[] = await response.json();
            setProducts(data);
        };
        fetchProducts();
    }, []);

    return products;
};

export default useProducts;
