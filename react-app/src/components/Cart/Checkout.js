import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { thunkPlaceOrder, getCart } from '../../store/cartReducer';
import samazonLogo from './samazonblack.png';

export const Checkout = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.session.user);
    const cart = useSelector(state => state.cart);
    const cartItems = cart ? Object.values(cart) : [];

    useEffect(() => {
        dispatch(getCart());
    }, [dispatch]);


    // if (!cart || !cart.total || !cart.items) {
    //     history.push('/cart');
    // }

    const placeOrder = async () => {
        const res = await dispatch(thunkPlaceOrder());
        await dispatch(getCart());
        if (res.ok) {
            history.push('/');
        }
    };

    const itemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0); //total quantity of items


    return (
        <div className='checkout__container'>
            <div className='checkout__header'>
                <img src={samazonLogo} alt='logo' />
                <p>Checkout (<span>{itemCount} items</span>)</p>
                <img className="lock-img" src='https://m.media-amazon.com/images/G/01/x-locale/checkout/truespc/secured-ssl._CB485936932_.png' alt='lock' />
            </div>
            <div className='checkout__content-container'>
                <div className='checkout__content'>
                    <div className='checkout__left'>
                        <div className='checkout__address'>
                            <h3>Shipping Address</h3>
                            <div className='checkout__address-content'>
                                <p>{user?.username}</p>
                                <p>{user?.address}</p>
                                <span>Not available for pickup</span>
                            </div>
                        </div>
                        <div className='checkout__items'>
                            <h3>Review items and shipping</h3>
                            <div className='checkout__items-content'>
                                {cartItems.map(item => (
                                    <div className='checkout__item' key={item.id}>
                                        <div className='checkout__item-header'>
                                            <h4>Delivery date: </h4>
                                            <p>Items shipped from Samazon</p>
                                        </div>
                                        <div className='checkout__item-content'>
                                            <div className='checkout__item-left'>
                                                <img src={item.product?.image} alt={item.product?.name} />
                                            </div>
                                            <div className='checkout__item-right'>
                                                <span className='checkout__item-title'>{item.product?.name}</span>
                                                <p className='checkout__item-price'><span>${item.product?.price}</span> Prime FREE Delivery</p>
                                                <p>& FREE Returns</p>
                                                <p className='checkout__item-quantity'>Quantity: <span>{item.quantity}</span></p>
                                                <span className='checkout__item-sold'>Sold by: Samazon</span>
                                            </div>
                                            <div></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className='checkout__right'>
                        <div className='checkout__right-header'>
                            <button className='cart__checkout' onClick={placeOrder}>Place your order</button>
                            <p>By placing your order, you agree to Samazon's conditions</p>
                        </div>
                        <div className='checkout__right-summary'>
                            <h3>Order Summary</h3>
                            <div className='checkout__right-summary-content'>
                                <div className='checkout__right-summary-left'>
                                    <p>Items ({itemCount}):</p>
                                    {/* <p>Items ({Object.values(cart.items).length}):</p> */}
                                    <p className='space'>Shipping & handling:</p>
                                    <p>Total before tax:</p>
                                    <p>Estimated tax to be collected:</p>
                                    <span>Order Total:</span>
                                </div>
                                <div className='checkout__right-summary-right'>
                                    <p>${cart.total}</p>
                                    <p className='checkout__right-summary-right-border space'>$5.00</p>
                                    <p>${(parseFloat(cart.total) + 5).toFixed(2)}</p>
                                    <p>${(parseFloat(cart.total) * 0.029).toFixed(2)}</p>
                                    <span>${(parseFloat(cart.total) + 5 + (parseFloat(cart.total) * 0.029)).toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
