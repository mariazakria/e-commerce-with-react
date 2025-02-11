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

export default function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />
        },
        {
          path: "login",
          element: <GuestRoute><Login /></GuestRoute>
        },
        {
          path: "signup",
          element: <GuestRoute><Signup /></GuestRoute>
        },
        {
          path: "products",
          element: <Products />
        },
        {
          path: "categories",
          element: <Categories />
        },
        {
          path: "brands",
          element: <Brands />
        },
        {
          path: "wishlist",
          element: <ProtectedRoute><Favorite /></ProtectedRoute>
        },
        {
          path: "cart",
          element: <ProtectedRoute><Cart /></ProtectedRoute>
        },
        {
          path: "product/:id",
          element: <ProductDetails />
        },
        {
          path: "checkout",
          element: <ProtectedRoute><CheckOut /></ProtectedRoute>
        },
        {
          path: "allorders",
          element: <ProtectedRoute><Orders /></ProtectedRoute>
        },
        {
          path: "*",
          element: <Notfound />
        }
      ]
    }
  ])

  return (
    <>
      <UserProvider>
        <WishlistProvider>
          <CartProvider>
            <RouterProvider router={routes} />
            <Toaster />
          </CartProvider>
        </WishlistProvider>
      </UserProvider>
    </>
  )
}