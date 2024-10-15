'use client';
import { Select } from 'antd';
import { useDispatch } from 'react-redux';
import { filterByCategory } from '@/store/productSlice';
import { FC } from 'react';

interface CategoryFilterProps {
    className?: string;
}

const CategoryFilter: FC<CategoryFilterProps> = ({ className }) => {
    const dispatch = useDispatch();

    const handleCategoryChange = (value: string) => {
        dispatch(filterByCategory(value));
    };

    return (
        <Select defaultValue="All Categories" onChange={handleCategoryChange} className={className}>
            <Select.Option value="all">All Categories</Select.Option>
            <Select.Option value="Electronics">Electronics</Select.Option>
            <Select.Option value="Clothing">Clothing</Select.Option>
            <Select.Option value="Books">Books</Select.Option>
            <Select.Option value="Accessories">Accessories</Select.Option>
            <Select.Option value="Home Appliances">Home Appliances</Select.Option>
        </Select>
    );
};

export default CategoryFilter;
