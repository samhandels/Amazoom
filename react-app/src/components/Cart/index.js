import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCart } from '../../store/cartReducer';
import { useHistory } from 'react-router-dom';
import './Cart.css';
import { CartItem } from './CartItem';

export const Cart = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const cart = useSelector(state => state.cart);
    const cartItems = cart ? Object.values(cart) : null;
    console.log("cartItems inside of cart index --------------------------",cartItems)

    useEffect(() => {
        console.log("getCart in Cart Index.js useEffect -------------", getCart)
        dispatch(getCart());
    }, [dispatch]);

    console.log("CART inside of cart/index.js ********************",cart)

    const sendToCheckout = () => {
        history.push('/checkout');
    };

    return (
        <div className='cart__container'>
            {cartItems.length ? (
                <div className='cart__content'>
                    <div className='cart__left'>
                        <span>Shopping Cart</span>
                        <div className='cart__items'>
                            {cartItems.map(item => (
                                <CartItem item={item} key={item.id} />
                            ))}
                        </div>
                        <div className='cart__total'>
                            <p className='total'>Subtotal ({cartItems.length} items): <span>${cart.total}</span></p>
                        </div>
                    </div>
                    <div className='cart__right'>
                        <p className='total'>Subtotal ({cartItems.length} items): <span>${cart.total}</span></p>
                        <button className='cart__checkout' onClick={sendToCheckout}>Proceed to checkout</button>
                    </div>
                </div>
            ) : (
                <div className='cart__no-items'>
                    <span>Your Samazon Cart is empty.</span>
                    <p>Go to <span onClick={() => history.push('/products')}>all products?</span></p>
                </div>
            )}
        </div>
    );
};
