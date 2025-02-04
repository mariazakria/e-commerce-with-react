import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import styles from './Navbar.module.css'; 
import { UserContext } from '../../Context/User.context';

export default function Navbar() {
   let {token , logout} = useContext(UserContext)
  return (
    <nav className='bg-slate-100 shadow-sm py-3'>
    <div className="container flex items-center align-center gap-12">
       <div>
          <Link to={'/'}>
          <span className={`fw-bold text-2xl text-primary-600`}>
          <i className={`fa-brands fa-shopify ${styles.sIcon}`}></i>
          hopN
          <i className={`fa-solid fa-eye text-xl   ${styles.showIcon}`}></i>w
          </span>
          </Link>
       </div>
      {token && (<>
         <ul className='flex gap-5 items-center'>
          <li>
             <NavLink className={({isActive}) => {
                return `relative before:absolute before:w-0 before:h-0.5 before:bg-primary-500 before:-bottom-1 before:left-0 hover:before:w-full before:transition-[width] before:duration-300 ${isActive ? "before:!w-full font-semibold" : ""}`
                }}  to="/">Home
             </NavLink>
          </li>
          <li>
             <NavLink className={({isActive}) => {
                return `relative before:absolute before:w-0 before:h-0.5 before:bg-primary-500 before:-bottom-1 before:left-0 hover:before:w-full before:transition-[width] before:duration-300 ${isActive ? "before:!w-full font-semibold" : ""}`
                }}  to="/cart">Cart
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
                }}  to="/product">Product
             </NavLink>
          </li>
          <li>
             <NavLink className={({isActive}) => {
                return `relative before:absolute before:w-0 before:h-0.5 before:bg-primary-500 before:-bottom-1 before:left-0 hover:before:w-full before:transition-[width] before:duration-300 ${isActive ? "before:!w-full font-semibold" : ""}`
                }}  to="/brands">Brands
             </NavLink>
          </li>
       </ul>
       <div className="relative cart ml-auto cursor-pointer">
          <i className="fa-solid fa-cart-plus text-lg"></i>
          <div className="absolute flex justify-center items-center right-0 top-0 cart-counter translate-x-1/2 -translate-y-1/2 h-5 w-5 bg-primary-600 rounded-full text-white">
             <i className="fa-solid fa-spinner text-sm fa-spin" aria-hidden="true"></i>
          </div>
       </div>
      </>)}
       <ul className={`flex gap-5 items-center ${!token && "ms-auto"}`}>
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
       <ul className='flex gap-5 items-center'>
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
