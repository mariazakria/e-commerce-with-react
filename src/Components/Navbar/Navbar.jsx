import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import styles from './Navbar.module.css'; 
import { UserContext } from '../../Context/User.context';
import { cartContext } from '../../Context/Cart.context';

export default function Navbar() {
   let {token , logout} = useContext(UserContext)
   const{cart,getProductFromCart} = useContext(cartContext)
   const [isMenuOpen, setIsMenuOpen] = useState(false);
   // elmoshkla : an f kol mra hygeb haga 8er elcart msh hygebli el3dd
   //el7l :  kol mra y3ml render ysh8lha w y3ml edit l number elcart
useEffect(()=>{
   getProductFromCart()
},[])
  return (
    <nav className='bg-slate-100 shadow px-2  sm:px-0 py-3 fixed top-0 left-0 right-0 z-50'>
    <div className="container flex items-center align-center gap-12">
       <div className=''>
          <Link to={'/'}>
          <span className={`fw-bold text-lg sm:text-2xl text-primary-600`}>
          <i className={`fa-brands fa-shopify ${styles.sIcon}`}></i>
          hopN
          <i className={`fa-solid fa-eye text-xl   ${styles.showIcon}`}></i>w
          </span>
          </Link>
       </div>
      {token && (<>
        

          <ul 
            className={`flex gap-5 items-center ${isMenuOpen ? 'block' : 'hidden'} flex-col absolute top-14 left-0 bg-slate-100 w-full p-4 shadow-lg ${isMenuOpen ? 'z-10' : ''} lg:flex lg:static lg:flex-row lg:gap-5 lg:w-auto lg:p-0 lg:shadow-none`}
          >

          <li>
             <NavLink className={({isActive}) => {
                return `relative before:absolute before:w-0 before:h-0.5 before:bg-primary-500 before:-bottom-1 before:left-0 hover:before:w-full before:transition-[width] before:duration-300 ${isActive ? "before:!w-full font-semibold" : ""}`
                }}  to="/">Home
             </NavLink>
          </li>
          <li>
             <NavLink className={({isActive}) => {
                return `relative before:absolute before:w-0 before:h-0.5 before:bg-primary-500 before:-bottom-1 before:left-0 hover:before:w-full before:transition-[width] before:duration-300 ${isActive ? "before:!w-full font-semibold" : ""}`
                }}  to="/product">Products
             </NavLink>
          </li>
          <li>
             <NavLink className={({isActive}) => {
                return `relative before:absolute before:w-0 before:h-0.5 before:bg-primary-500 before:-bottom-1 before:left-0 hover:before:w-full before:transition-[width] before:duration-300 ${isActive ? "before:!w-full font-semibold" : ""}`
                }}  to="/categories">Categories
             </NavLink>
          </li>
        
          <li>
             <NavLink className={({isActive}) => {
                return `relative before:absolute before:w-0 before:h-0.5 before:bg-primary-500 before:-bottom-1 before:left-0 hover:before:w-full before:transition-[width] before:duration-300 ${isActive ? "before:!w-full font-semibold" : ""}`
                }}  to="/brands">Brands
             </NavLink>
          </li>
          <li>
             <NavLink className={({isActive}) => {
                return `relative before:absolute before:w-0 before:h-0.5 before:bg-primary-500 before:-bottom-1 before:left-0 hover:before:w-full before:transition-[width] before:duration-300 ${isActive ? "before:!w-full font-semibold" : ""}`
                }}  to="/allorders">Orders
             </NavLink>
          </li>
       </ul>
       <Link to="/cart" className="relative cart ml-auto cursor-pointer">
          <i className="fa-solid fa-cart-plus text-lg"></i>
          <div className="absolute flex justify-center items-center right-0 top-0 cart-counter translate-x-1/2 -translate-y-1/2 h-5 w-5 bg-primary-600 rounded-full text-white">
             {cart == null ? <i className="fa-solid fa-spinner text-sm fa-spin" aria-hidden="true"></i> : 
              <span className='text-sm'>{cart.numOfCartItems}</span>}
            
          </div>
       </Link>
      </>)}
      {token && (
  <>
    <ul 
      className={`flex gap-5 items-center ${isMenuOpen ? 'block' : 'hidden'} absolute     bottom-[8.8rem] left-0 bg-slate-100 w-full p-4 shadow-lg items-center justify-center text-xl ${isMenuOpen ? 'z-10' : ''} lg:flex lg:static lg:flex-row lg:gap-5 lg:w-auto lg:p-0 lg:shadow-none`}
    >
      <li>
        <Link to="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-instagram"></i>
        </Link>
      </li>
      <li>
        <Link to="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-facebook-f"></i>
        </Link>
      </li>
      <li>
        <Link to="https://www.tiktok.com" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-tiktok"></i>
        </Link>
      </li>
      <li>
        <Link to="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-twitter"></i>
        </Link>
      </li>
      <li>
        <Link to="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-linkedin-in"></i>
        </Link>
      </li>
      <li>
        <Link to="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-youtube"></i>
        </Link>
      </li>
    </ul>
  </>
)}

<ul className={`flex gap-5 items-center ${!token ? "!ms-auto !justify-between" : ""}`}>
         {!token && <>
            <li>
             <NavLink className={({isActive}) => {
                return `relative before:absolute before:w-0 before:h-0.5 before:bg-primary-500 before:-bottom-1 before:left-0 hover:before:w-full before:transition-[width] before:duration-300 ${isActive ? "before:!w-full font-semibold" : ""}`
                }}  to="/login">Login
             </NavLink>
          </li>
          <li>
             <NavLink className={({isActive}) => {
                return `relative before:absolute before:w-0 before:h-0.5 before:bg-primary-500 before:-bottom-1 before:left-0 hover:before:w-full before:transition-[width] before:duration-300 ${isActive ? "before:!w-full font-semibold" : ""}`
                }}  to="/signup">Signup
             </NavLink>
          </li>
         </>}
        {token && <>
         <button 
                        className="relative lg:hidden flex items-center text-primary-500"

            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <i className="fa-solid fa-bars text-2xl"></i> 
          </button></>
        }
         {token && <>
            <li onClick={logout}>
             <NavLink to="/login">
                <i className="text-primary-500 fas fa-sign-out-alt text-xl"></i>
             </NavLink>
          </li>
         </>}
       </ul>
    </div>
 </nav>
  );
}
