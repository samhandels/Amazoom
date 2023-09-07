import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import './LandingPage.css';
import { fetchProducts } from "../../store/productsReducer";

export const LandingPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const productsObj = useSelector((state) => (state.products ? state.products : {}))

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const products = Object.values(productsObj)

    const sendToProduct = (id) => {
        history.push(`/products/${id}`);
    }

    const sendToAllProducts = () => {
        history.push('/products');
    }

    const truncateString = (s) => {
        if (!s) return;
        if (s.length < 29) return s;
        return s.substring(0, 29) + "...";
    }

    return (
        <div className="landing__container">
            <div className="landing_banner">
                <img src="https://m.media-amazon.com/images/I/718m-LaIwaL._SX3000_.jpg" alt="landing" />
                <div className="landing__categories">
                    <div className="landing__category">
                        <h3>Electronics Center</h3>
                        <img src="https://m.media-amazon.com/images/G/01/US-hq/2023/img/Consumer_Electronics/XCM_CUTTLE_1600596_3247825_512x512_2X_en_US._CB601492729_.png" alt="electronics" />
                        <span onClick={null}>Shop electronics</span>
                    </div>
                    <div className="landing__category">
                        <h3>Reading and Education</h3>
                        <img src="https://images-na.ssl-images-amazon.com/images/G/01/Books/Editorial/BOTYSF_BHP_Tile.jpg" alt="books" />
                        <span onClick={null}>Shop Books</span>
                    </div>
                    <div className="landing__category">
                        <h3>Sports and Athletics</h3>
                        <img src="https://images-na.ssl-images-amazon.com/images/G/01/sports/marinpow/AMZSO_Web_Block_500x350_Faves_01.png" alt="sports" />
                        <span onClick={null}>Shop Outdoors/Sports</span>
                    </div>
                    <div className="landing__category">
                        <h3>Other Products</h3>
                        <img src="https://images-na.ssl-images-amazon.com/images/G/01/US-hq/2022/img/Consumables/Everyday_Essentials/AMZQ3EE_Cross-1-StorefrontHero-D-1500x300-EN.jpg" alt="other" />
                        <span onClick={null}>Shop Other</span>
                    </div>
                </div>
            </div>
            <div className="landing__trending-container">
                <div className="landing__trending">
                    <div className="landing__trending-header">
                        <h3>Featured Products</h3>
                        <span onClick={sendToAllProducts}>Shop all products</span>
                    </div>
                    <div className="landing__trending-products">
                        {products.map(product => (
                            <div className="landing__trending-product" key={product?.id} onClick={() => sendToProduct(product?.id)}>
                                <div className="landing-product__image">
                                    <img src={product?.image} alt="product" />
                                </div>
                                <span>{truncateString(product?.name)}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;
