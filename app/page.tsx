'use client';
import { useState, useEffect } from 'react';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts } from '@/store/productSlice';
import SearchBar from '@/components/SearchBar';
import ProductList from '@/components/ProductList';
import CartDrawer from '@/components/CartDrawer';
import CategoryFilter from '@/components/CategoryFilter';
import PriceSorter from '@/components/PriceSorter';
import { RootState } from '@/store/store';
import productsData from '../db.json';

export default function HomePage() {
  const dispatch = useDispatch();
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const cartItemsCount = useSelector((state: RootState) => state.cart.items.length);

  useEffect(() => {
    dispatch(setProducts(productsData.products));
  }, [dispatch]);

  return (
    <div className="container mx-auto p-4">
      <SearchBar />
      <div className="flex flex-col md:flex-row md:justify-between gap-4 my-4 items-center">

        <div className="flex flex-col md:flex-row items-center gap-4 w-full">
          <CategoryFilter className="w-full md:w-auto" />
          <PriceSorter className="w-full md:w-auto" />
        </div>

        <Button
          type="primary"
          onClick={() => setDrawerOpen(true)}
          className="w-full md:w-auto bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded"
        >
          View Cart ({cartItemsCount})
        </Button>

      </div>

      <ProductList />
      
      <CartDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  );
}
