// TYPES
const GET_CART = 'cart/GET_CART';
const ADD_TO_CART = 'cart/ADD_TO_CART';
const REMOVE_FROM_CART = 'cart/REMOVE_FROM_CART';
const UPDATE_CART = 'cart/UPDATE_CART';
const PLACE_ORDER = 'cart/PLACE_ORDER';

// ACTIONS
export const getCartAction = (cart) => ({
    type: GET_CART,
    payload: cart
});

export const addToCartAction = (cartItem) => ({
    type: ADD_TO_CART,
    payload: cartItem
});

export const removeFromCartAction = (data) => ({
    type: REMOVE_FROM_CART,
    payload: data
});

export const updateCartAction = (cartItem) => ({
    type: UPDATE_CART,
    payload: cartItem
});

export const placeOrderAction = (order) => ({
    type: PLACE_ORDER,
    payload: order
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
        console.log("DATA IN ADD TO CART THUNK ******", data)
        dispatch(addToCartAction(data));
        return data;
    }
};

export const removeFromCart = (productId) => async (dispatch) => {
    const response = await fetch(`/api/cart/${productId}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(removeFromCartAction(data));
        return data;
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
        dispatch(getCartAction(data));
        return data;
    }
};

export const thunkPlaceOrder = () => async (dispatch) => {
    const response = await fetch(`/api/cart/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(placeOrderAction());
        dispatch(getCart());

        return { ok: true, data };
    } else {
        const errData = await response.json();
        return { ok: false, error: errData };
    }
};



// REDUCER
const initialState = { };

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CART:
            return {
                ...action.payload
            }
        case ADD_TO_CART:
            return {
                ...state, ...action.payload
            };
        case REMOVE_FROM_CART:
            return {
                ...action.payload
            }
        case UPDATE_CART:
            return {
                ...state, ...action.payload
            };
        case PLACE_ORDER:
            return {

            };
        default:
            return state;
    }
};
