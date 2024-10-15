import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '@/types';

interface CartItem extends Product {
    quantity: number;
}

interface CartState {
    items: CartItem[];
    total: number;
}

const initialState: CartState = {
    items: [],
    total: 0,
};

const saveToLocalStorage = (state: CartState) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('cart', JSON.stringify(state.items));
    }
};

const calculateTotal = (items: CartItem[]) => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<Product>) => {
            const existingItem = state.items.find(item => item.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }
            state.total = Math.max(calculateTotal(state.items), 0); 
            saveToLocalStorage(state);
        },
        removeFromCart: (state, action: PayloadAction<number>) => {
            const index = state.items.findIndex(item => item.id === action.payload);
            if (index > -1) {
                state.items.splice(index, 1);
            }
            state.total = Math.max(calculateTotal(state.items), 0);
            saveToLocalStorage(state);
        },
        updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
            const { id, quantity } = action.payload;
            const item = state.items.find(item => item.id === id);
            if (item) {
                item.quantity = quantity;
            }
            state.total = Math.max(calculateTotal(state.items), 0);
            saveToLocalStorage(state);
        },
    },
});

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
