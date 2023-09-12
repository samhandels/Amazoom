//Types
const LOAD_PRODUCTS = 'products/LOAD_PRODUCTS';
const LOAD_SINGLE_PRODUCT = 'products/LOAD_SINGLE_PRODUCT';
const CREATE_PRODUCT = 'products/ADD_PRODUCT';
const UPDATE_PRODUCT = 'products/UPDATE_PRODUCT';
const DELETE_PRODUCT = 'products/DELETE_PRODUCT';
const CLEAR_SINGLE_PRODUCT = 'products/CLEAR_SINGLE_PRODUCT';

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

const clearSingleProductAction = () => ({
    type: CLEAR_SINGLE_PRODUCT,
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
        // const products = {}
        // products.singleProduct = { ...product }
        dispatch(loadSingleProduct(product));
    }
};

export const fetchcreateProduct = (productData) => async (dispatch) => {
    try {
        console.log("PRODUCTDATA IN Thunk CREATE PRODUCT", productData)

        const formData = new FormData();

        for (const key in productData) {
            if (key === 'image') {
                formData.append('image', productData.image);
            } else {
                formData.append(key, productData[key]);
            }
        }
        const response = await fetch('/api/products/new', {
            method: 'POST',
            body: formData
        });
        if (response.ok) {
            const product = await response.json();
            dispatch(createProduct(product));
            return product
        } else {
            const errors = await response.json();
            console.log("ERRORS", errors);
            return errors;
        }
    } catch (error) {
        console.error('Error creating product:', error);
    }
};


export const editProduct = (productId, productData) => async (dispatch) => {
    const response = await fetch(`/api/products/${productId}`, {
        method: 'PUT',
        body: productData
    });
    if (response.ok) {
        const product = await response.json();
        dispatch(updateProduct(product));
        return product;
    }
};

export const removeProduct = (productId) => async (dispatch) => {
    const response = await fetch(`/api/products/${productId}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        dispatch(deleteProduct(productId));
    }
};

export const clearSingleProduct = () => async (dispatch) => {
    try {
        dispatch(clearSingleProductAction());
    } catch (error) {
        console.error('Error clearing singleProduct:', error);
    }
};


//reducer
const initialState = {};

export const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        // case LOAD_PRODUCTS:
        //     return { ...state, ...action.products };
        case LOAD_PRODUCTS: {
            const productsObj = {};
            action.products.forEach(product => {
                productsObj[product.id] = product;
            });
            return { ...state, allProducts: productsObj };
        }
        case LOAD_SINGLE_PRODUCT:
            return { ...state, singleProduct: action.product };
        // case CREATE_PRODUCT: {
        //     const newState = { ...state };
        //     const productData = action.product.product;
        //     const allProducts = {...state.allProducts, [productData.id]: productData }
        //     newState.allProducts = allProducts
        //     newState.singleProduct = { ...productData };
        //     return newState;
        // }
        case CREATE_PRODUCT: {
            const productData = action.product.product;
            return {
                ...state,
                allProducts: {
                    ...state.allProducts,
                    [productData.id]: productData
                },
                singleProduct: { ...productData }
            };
        }
        case UPDATE_PRODUCT:
            const updatedProducts = { ...state };
            const updatedProduct = action.product;
            if (updatedProducts[updatedProduct.id]) {
                updatedProducts[updatedProduct.id] = updatedProduct;
        }
    return updatedProducts;
        case DELETE_PRODUCT:
            const newState = { ...state };
            delete newState[action.productId];
            return newState;
        case CLEAR_SINGLE_PRODUCT:
            if (state.singleProduct !== null) {
                const { singleProduct, ...newState } = state;
                return newState;
            }
            return state;
        default:
            return state;
    }
};
