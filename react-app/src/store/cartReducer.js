// TYPES
const GET_CART = 'cart/GET_CART';
const ADD_TO_CART = 'cart/ADD_TO_CART';
const REMOVE_FROM_CART = 'cart/REMOVE_FROM_CART';
const UPDATE_CART = 'cart/UPDATE_CART';

// ACTIONS
export const getCartAction = (cart) => ({
    type: GET_CART,
    payload: cart
});

export const addToCartAction = (cartItem) => ({
    type: ADD_TO_CART,
    payload: cartItem
});

export const removeFromCartAction = (itemId) => ({
    type: REMOVE_FROM_CART,
    payload: itemId
});

export const updateCartAction = (cartItem) => ({
    type: UPDATE_CART,
    payload: cartItem
});

// THUNKS
export const getCart = () => async (dispatch) => {
    const response = await fetch('/api/cart');
    if (response.ok) {
        const data = await response.json();
        dispatch(getCartAction(data));
        return data;
    }
};

export const addToCart = (quantity, productId) => async (dispatch) => {
    const response = await fetch(`/api/products/${productId}/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity })
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(addToCartAction(data));
        return data;
    }
};

export const removeFromCart = (productId) => async (dispatch) => {
    const response = await fetch(`/api/cart/${productId}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        dispatch(removeFromCartAction(productId));
    }
};

export const updateCart = (quantity, productId) => async (dispatch) => {
    const response = await fetch(`/api/cart/${productId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity })
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(updateCartAction(data));
        return data;
    }
};

// REDUCER
const initialState = { items: {}, total: 0 };

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CART:
            return {
                ...state,
                items: action.payload?.cart?.cart_item?.reduce((acc, item) => {
                    acc[item.id] = item;
                    return acc;
                }, {}),
                total: action.payload.cart.total_price
            };
        case ADD_TO_CART:
            return {
                ...state,
                items: {
                    ...state.items,
                    [action.payload.cart_item.id]: action.payload.cart_item
                },
                total: state.total + action.payload.cart_item.subtotal
            };
        case REMOVE_FROM_CART:
            const newState = { ...state };
            delete newState.items[action.payload];
            return newState;
        case UPDATE_CART:
            return {
                ...state,
                items: {
                    ...state.items,
                    [action.payload.cart_item.id]: action.payload.cart_item
                },
                total: state.total + action.payload.cart_item.subtotal
            };
        default:
            return state;
    }
};
