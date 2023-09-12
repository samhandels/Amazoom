import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { removeFromCart, updateCart, getCart } from '../../store/cartReducer';

export const CartItem = ({ item }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [quantity, setQuantity] = useState(item.quantity);

    useEffect(() => {
        dispatch(getCart());
    }, [quantity, dispatch]);

    const sendToProduct = (id) => {
        history.push(`/products/${id}`);
    };

    const removeFromCartHandler = (productId) => {
        dispatch(removeFromCart(productId));
        window.location.reload();
    };


    let stockLength = item.quantity;
    if (item.product.stock_quantity > item.quantity) {
        stockLength = item.product.stock_quantity;
    }

    return (
        <div className='cart__item' key={item.id}>
            <div className='item__left'>
                <img src={item.product.image} alt={item.product.name} onClick={() => sendToProduct(item.product.id)} />
            </div>
            <div className='item__right'>
                <div className='item__details'>
                    <span className='item__name' onClick={() => sendToProduct(item.product.id)}>{item.product.name}</span>
                    <span className='item__price'>${item.product.price}</span>
                    <p className='product__buy-in-stock item__stock'>In Stock</p>
                    <img src='/images/prime-logo.png' alt='prime' className='prime-logo item__prime' />
                </div>
                <div className='item__edit-delete'>
                    {item.product.stock_quantity > -1 ? (
                        <select
                            value={quantity}
                            onChange={(e) => {
                                const newQuantity = parseInt(e.target.value);
                                setQuantity(newQuantity);
                                dispatch(updateCart(newQuantity, item.product.id));
                            }}
                            className='product__buy-quantity'
                        >
                            {Array.from({ length: stockLength }, (_, i) => i + 1).map((num) => (
                                <option key={num} value={num}>Qty: {num}</option>
                            ))}
                        </select>
                    ) : (
                        <p className='product__buy-out-of-stock item__stock'>Out of Stock</p>
                    )}

                    <span onClick={() => removeFromCartHandler(item.product.id)}>Remove from cart</span>
                </div>
            </div>
        </div>
    );
}
