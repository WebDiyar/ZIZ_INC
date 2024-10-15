'use client';
import { Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { sortProducts } from '@/store/productSlice';
import { RootState } from '@/store/store';
import { FC } from 'react';

interface PriceSorterProps {
    className?: string; 
}

const PriceSorter: FC<PriceSorterProps> = ({className}) => {
    const dispatch = useDispatch();
    const sortOrder = useSelector((state: RootState) => state.product.sortOrder);

    const handleSort = (value: string) => {
        dispatch(sortProducts(value));
    };

    return (
        <Select value={sortOrder} onChange={handleSort} className={className}>
            <Select.Option value="default">Sort by Default</Select.Option>
            <Select.Option value="asc">Price: Low to High</Select.Option>
            <Select.Option value="desc">Price: High to Low</Select.Option>
        </Select>
    );
};

export default PriceSorter;