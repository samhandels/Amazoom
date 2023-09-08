import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchSingleProduct, fetchProducts } from "../../store/productsReducer";


export const ProductDetails = () => {
    const { productId } = useParams();
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products);


    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchSingleProduct(productId));
    }, [dispatch, productId]);

    return (
        <div>product details page</div>
    )
}
