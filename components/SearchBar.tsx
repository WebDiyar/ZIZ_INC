'use client';
import { Input } from 'antd';
import { useDispatch } from 'react-redux';
import { searchProducts } from '@/store/productSlice';

const SearchBar = () => {
    const dispatch = useDispatch();

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(searchProducts(e.target.value));
    };

    return <Input placeholder="Search products..." onChange={handleSearch} />;
};

export default SearchBar;
