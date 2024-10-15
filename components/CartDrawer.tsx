'use client';
import { Drawer, Button, List, InputNumber, Empty } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, updateQuantity } from '@/store/cartSlice';
import { RootState } from '@/store/store';

const CartDrawer: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const total = useSelector((state: RootState) => Math.max(state.cart.total, 0));
    const dispatch = useDispatch();

    const handleQuantityChange = (id: number, value: number | null) => {
        if (value !== null) {
            dispatch(updateQuantity({ id, quantity: value }));
        }
    };

    return (
        <Drawer
            title="Your Cart"
            placement="right"
            onClose={onClose}
            open={open}
            className="lg:w-1/3 md:w-1/2 w-full max-h-screen overflow-y-auto" 
            styles={{ body: { padding: '16px', display: 'flex', flexDirection: 'column' } }}
        >
            {cartItems.length > 0 ? (
                <>
                    <List
                        dataSource={cartItems}
                        renderItem={(item) => (
                            <List.Item
                                className="flex justify-between items-center border-b pb-4 gap-4"
                                actions={[
                                    <InputNumber
                                        min={1}
                                        value={item.quantity}
                                        onChange={(value) => handleQuantityChange(item.id, value)}
                                        key={item.id}
                                        className="w-20"
                                    />,
                                    <Button onClick={() => dispatch(removeFromCart(item.id))} key={`remove-${item.id}`}>
                                        Remove
                                    </Button>,
                                ]}
                            >
                                <div className="flex items-center space-x-4 w-full">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-16 h-16 object-cover rounded-md"
                                    />
                                    <div className="flex flex-col space-y-1 flex-grow">
                                        <h3 className="font-semibold text-sm md:text-base">{item.name}</h3>
                                        <p className="text-xs md:text-sm">${item.price} x {item.quantity}</p>
                                    </div>
                                </div>
                            </List.Item>
                        )}
                    />
                    <div className="flex justify-between items-center mt-4 text-lg font-semibold">
                        <span>Total:</span>
                        <span>${total}</span>
                    </div>
                    <Button
                        type="primary"
                        className="w-full mt-4 bg-green-500 hover:bg-green-600"
                    >
                        Checkout
                    </Button>
                </>
            ) : (
                <Empty description="Your cart is empty" />
            )}
        </Drawer>
    );
};

export default CartDrawer;
