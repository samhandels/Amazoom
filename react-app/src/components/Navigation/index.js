import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import samazonLogo from './samazonwhite.png';
import shoppingcart from './shopping-cart-white.png';
import USAFlag from './USA-Flag.png';


function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <div className='main-nav-bar'>
      <div>
        <NavLink className="samazon-logo" exact to="/">
          <img className='samazon-logo-img' src={samazonLogo} alt="Samazon Logo" />
        </NavLink>
        <span className="deliver-address">Deliver to {sessionUser ? <>{sessionUser.username} <br /> {sessionUser.address}</> : 'Guest'}</span>
      </div>
      <div className="search-bar">
        <input
          className="search-bar-input"
          type="text"
          placeholder="Search for anything"
        />
        <i className="fa-solid fa-magnifying-glass" style={{color: "#343433",}} onClick={null}></i>
      </div>
      <ul className='nav-ul'>
        <li className='language'>
          <img className='USA-Flag' src={USAFlag} />
          EN
        </li>
        {isLoaded && (
          <li className='nav-li'>
            <ProfileButton className="nav-link profile-button" user={sessionUser} />
          </li>
        )}
        <li className='nav-li'>
          <div className="returns-orders">
            <div className="returns">Returns <br/> & Orders</div>

          </div>
        </li>
        <li className='nav-li'>
          <NavLink exact to="/cart">
            <div className="cart">
              <img className='shoppingcart' src={shoppingcart}></img>
            </div>
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Navigation;
