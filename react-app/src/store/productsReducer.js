//Types
const LOAD_PRODUCTS = 'samazon/products/LOAD_PRODUCTS';
const LOAD_SINGLE_PRODUCT = 'samazon/products/LOAD_SINGLE_PRODUCT';
const CREATE_PRODUCT = 'samazon/products/ADD_PRODUCT';
const UPDATE_PRODUCT = 'samazon/products/UPDATE_PRODUCT';
const DELETE_PRODUCT = 'samazon/products/DELETE_PRODUCT';


//actions
const loadProducts = (products) => ({
    type: LOAD_PRODUCTS,
    products
});

const loadSingleProduct = (product) => ({
    type: LOAD_SINGLE_PRODUCT,
    product
});

const createProduct = (product) => ({
    type: CREATE_PRODUCT,
    product
});

const updateProduct = (product) => ({
    type: UPDATE_PRODUCT,
    product
});

const deleteProduct = (productId) => ({
    type: DELETE_PRODUCT,
    productId
});


//thunks
export const fetchProducts = () => async (dispatch) => {
    const response = await fetch('/api/products');
    if (response.ok) {
        const products = await response.json();
        dispatch(loadProducts(products));
    }
};

export const fetchSingleProduct = (productId) => async (dispatch) => {
    const response = await fetch(`/api/products/${productId}`);
    if (response.ok) {
        const product = await response.json();
        dispatch(loadSingleProduct(product));
    }
};

export const fetchcreateProduct = (productData) => async (dispatch) => {
    const response = await fetch('/api/products/new', {
        method: 'POST',
        body: JSON.stringify(productData)
    });
    if (response.ok) {
        const product = await response.json();
        dispatch(createProduct(product));
    }
};

export const editProduct = (productId, productData) => async (dispatch) => {
    const response = await fetch(`/api/products/${productId}`, {
        method: 'PUT',
        body: JSON.stringify(productData)
    });
    if (response.ok) {
        const product = await response.json();
        dispatch(updateProduct(product));
    }
};

export const removeProduct = (productId) => async (dispatch) => {
    const response = await fetch(`/api/products/delete/${productId}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        dispatch(deleteProduct(productId));
    }
};


//reducer
const initialState = {
    allProducts: {},
    singleProduct: {},

};

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_PRODUCTS:
            return { ...state, allProducts: { ...action.products } };
        case LOAD_SINGLE_PRODUCT:
            return { ...state, singleProduct: action.product };
        case CREATE_PRODUCT:
            return { ...state, allProducts: { ...state.allProducts, [action.product.id]: action.product } };
        case UPDATE_PRODUCT:
            return { ...state, allProducts: { ...state.allProducts, [action.product.id]: action.product } };
        case DELETE_PRODUCT:
            const newState = { ...state };
            delete newState.allProducts[action.productId];
            return newState;
        default:
            return state;
    }
};

export default productReducer;
