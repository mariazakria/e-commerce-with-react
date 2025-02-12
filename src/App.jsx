import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './Pages/Login/Login'
import Signup from './Pages/Signup/Signup'
import Home from './Pages/Home/Home'
import Layout from './Components/Layout/Layout'
import Notfound from './Pages/Notfound/Notfound'
import { Toaster } from 'react-hot-toast'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'
import GuestRoute from './Components/GuestRoute/GuestRoute'
import UserProvider from './Context/User.context'
import CartProvider from './Context/Cart.context'
import WishlistProvider from './Context/Wishlist.context'
import Cart from './Pages/Cart/Cart'
import CartEmpty from './Components/CartEmpty/CartEmpty'
import ProductDetails from './Pages/ProductDetails/ProductDetails'
import CheckOut from './Pages/CheckOut/CheckOut'
import Orders from './Pages/Orders/Orders'
import Brands from './Pages/Brands/Brands'
import Products from './Pages/Products/Products'
import Categories from './Pages/Categories/Categories'
import Favorite from './Pages/Favorite/Favorite'
import ResetPassword from './Pages/ResetPassword/ResetPassword'

export default function App() {
  const routes = createBrowserRouter([
    {
      path: '/',
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: '*',
          element: <Notfound />
        },
        {
          path: 'cartempty',
          element: <CartEmpty />
        },
        {
          path: 'allorders',
          element: <Orders />
        },
        {
          path: 'brands',
          element: <Brands />
        },
        {
          path: 'products',
          element: <Products />
        },
        {
          path: 'categories',
          element: <Categories />
        },
        {
          path:"cart",
          element:<Cart/>
        },
        {
          path:"product/:id",
          element:<ProductDetails/>
        },
        {
          index: true,
          element: <Home />
        },
        {
          path:"checkout",
          element:<CheckOut/>
        },
        {
          path:"wishlist",
          element:<Favorite/>
        }
      ],
    },
    {
      path:'/',
      element: <GuestRoute><Layout/></GuestRoute>,
      children:[
        {
          path: 'signup',
          element: <Signup />
        },
        {
          path: 'login',
          element: <Login />
        },
        {
          path: 'reset-password',
          element: <ResetPassword />
        }
      ]
    }
  ]);
  
  return (
    <>
      <UserProvider>
        <WishlistProvider>
          <CartProvider>
            <RouterProvider router = {routes}/>
          </CartProvider>
        </WishlistProvider>
      </UserProvider>
      <Toaster />
    </>
  )
}