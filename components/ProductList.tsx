'use client';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import ProductCard from './ProductCard';
import PaginationComponent from './PaginationComponent';
import { RootState } from '@/store/store';

const ProductList = () => {
    const products = useSelector((state: RootState) => state.product.filteredProducts);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 10;
    const totalPages = Math.ceil(products.length / productsPerPage);

    const handlePageChange = (page: number) => setCurrentPage(page);

    const displayedProducts = products.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage);

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
            <PaginationComponent currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </>
    );
};

export default ProductList;
