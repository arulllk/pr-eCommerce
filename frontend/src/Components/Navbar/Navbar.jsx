import React, { useContext, useState } from 'react'
import './Navbar.css'

import logo from '../assets/logo.png';
import cart_icon from '../assets/cart_icon.png'
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';

const Navbar = () => {
    const [menu,sentMenu] = useState('shop')
    const {getTotalCartItems} = useContext(ShopContext);
  return (     
    <div className="navbar">
        <div className="nav-logo">
            <img src={logo} alt='E commerce' />
            <p>Shopper</p>
        </div>
        <ul className="nav-menu">
            <li onClick={()=>sentMenu("shop")}><Link to="/">Shop</Link> {menu === 'shop' ? <hr/> : <></>}</li>
            <li onClick={()=>sentMenu("men")}><Link to="/mens">Men</Link> {menu === 'men' ? <hr/> : <></>}</li>
            <li onClick={()=>sentMenu("women")}><Link to="/womens">Women</Link> {menu === 'women' ? <hr/> : <></>}</li>
            <li onClick={()=>sentMenu("kids")}><Link to="/kids">Kids</Link> {menu === 'kids' ? <hr/> : <></>}</li>
        </ul>
        <div className="nav-login-cart">
            <Link to="/login" ><button>Login</button></Link>
            <Link to="/cart" ><img  src={cart_icon} alt="" /> </Link>
            <div className="nav-cart-count">{getTotalCartItems()}</div>
        </div>
    </div>    
  )
}

export default Navbar 