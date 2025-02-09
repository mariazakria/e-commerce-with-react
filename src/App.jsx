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
import Cart from './Pages/Cart/Cart'
import CartEmpty from './Components/CartEmpty/CartEmpty'
import ProductDetails from './Pages/ProductDetails/ProductDetails'
export default function App() {
  const routes = createBrowserRouter([
    {
      // hys2l elly hna bs 3amla protected route wla la
      path: "/",
      element: (
        <ProtectedRoute>
          {/* bb3t layout props llhome kda */}
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
      ],
    },
    // dol msh hys2lhom
    {
      path:'/',
      element: <GuestRoute><Layout/></GuestRoute>,
      children:[
        {
          path: '/signup',
          element: <Signup />
        },
        {
          path: '/login',
          element: <Login />
        }
      ]
    }
    
  ]);
  
    
  return (
    <>
  
    <UserProvider>
    <CartProvider>
    <RouterProvider router = {routes}/>

      </CartProvider>

    </UserProvider>
    <Toaster />

    </>
  )
}
