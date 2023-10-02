import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import { LandingPage } from "./components/LandingPage";
import { AllProducts } from "./components/AllProducts";
import { ProductDetails } from "./components/ProductDetails";
import { Footer } from "./components/Footer"
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { ProductForm } from "./components/ProductForm";
import { Cart } from "./components/Cart";
import { Checkout } from "./components/Cart/Checkout.js";
import { FilteredProducts } from "./components/FilteredProducts";


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (

    <div className="main-container">
      <Navigation isLoaded={isLoaded} />
      <div className="content">
      {isLoaded && (
        <Switch>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route exact path="/products/search/:searchInput">
            <FilteredProducts />
          </Route>
          <Route exact path="/products/new">
            <ProductForm />
          </Route>
          <Route path="/products/:productId">
            <ProductDetails />
          </Route>
          <Route path="/products">
            <AllProducts />
          </Route>
          <Route path="/cart">
            <Cart />
          </Route>
          <Route path="/checkout">
            <Checkout />
          </Route>
        </Switch>
      )}
      </div>
      <Footer />
    </div>

  );
}

export default App;
