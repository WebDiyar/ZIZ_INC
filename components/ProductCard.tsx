'use client';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '@/store/cartSlice';
import { Product } from '@/types';
import { RootState } from '@/store/store';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch();
  const cartItem = useSelector((state: RootState) => state.cart.items.find(item => item.id === product.id));
  const [showEffect, setShowEffect] = useState<boolean>(false);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    setShowEffect(true);
    setTimeout(() => setShowEffect(false), 300);
  };

  return (
    <div className={`bg-white shadow rounded p-4 ${showEffect ? 'scale-105 transition-transform' : ''}`}>
      <img src={product.image} alt={product.name} className="w-full h-64 object-contain mb-4" />
      <h2 className="text-lg font-semibold">{product.name}</h2>
      <p className="text-gray-500">${product.price}</p>
      <Button onClick={handleAddToCart}>
        Add to Cart {cartItem ? `(${cartItem.quantity})` : ''}
      </Button>
    </div>
  );
};

export default ProductCard;
