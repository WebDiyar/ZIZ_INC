import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '@/types';

interface ProductState {
    products: Product[];
    filteredProducts: Product[];
    searchQuery: string;
    sortOrder: string;
    category: string;
}

const initialState: ProductState = {
    products: [],
    filteredProducts: [],
    searchQuery: '',
    sortOrder: 'default',
    category: 'all',
};

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setProducts: (state, action: PayloadAction<Product[]>) => {
            state.products = action.payload;
            state.filteredProducts = action.payload;
        },
        searchProducts: (state, action: PayloadAction<string>) => {
            const query = action.payload.toLowerCase();
            state.searchQuery = query;
            const searchedProducts = state.products.filter(product =>
                product.name.toLowerCase().includes(query)
            );
            state.filteredProducts = state.category === 'all'
                ? searchedProducts
                : searchedProducts.filter(product => product.category === state.category);
        },
        sortProducts: (state, action: PayloadAction<string>) => {
            const sortOrder = action.payload;
            state.sortOrder = sortOrder;
            if (sortOrder === 'default') {
                state.filteredProducts = state.category === 'all'
                    ? state.products
                    : state.products.filter(product => product.category === state.category);
            } else {
                state.filteredProducts = [...state.filteredProducts].sort((a, b) =>
                    sortOrder === 'asc' ? a.price - b.price : b.price - a.price
                );
            }
        },
        filterByCategory: (state, action: PayloadAction<string>) => {
            const category = action.payload;
            state.category = category;
            state.sortOrder = 'default';
            const filteredByCategory = category === 'all'
                ? state.products
                : state.products.filter(product => product.category === category);
            state.filteredProducts = state.searchQuery
                ? filteredByCategory.filter(product =>
                    product.name.toLowerCase().includes(state.searchQuery)
                )
                : filteredByCategory;
        },
    },
});

export const { setProducts, searchProducts, sortProducts, filterByCategory } = productSlice.actions;
export default productSlice.reducer;
