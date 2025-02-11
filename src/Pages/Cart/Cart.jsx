import { useContext, useEffect } from "react"
import { cartContext } from "../../Context/Cart.context"
import Loading from "../../Components/Loading/Loading";
import CartItem from "../../Components/CartItem/CartItem";
import cartEmpty from "../../assets/images/shopping-cart-logo-shopping-basket-design-vector-illustration-b.png"
import CartEmpty from "../../Components/CartEmpty/CartEmpty";
import { Link } from "react-router-dom";

export default function Cart() {
   const {getProductFromCart, cart,ClearCart} =  useContext(cartContext)
   
   useEffect(() => {
     // Set document title and meta tags
     document.title = "Your Shopping Cart - ShopNow Store";
     
     // Create or update meta description
     let metaDescription = document.querySelector('meta[name="description"]');
     if (!metaDescription) {
       metaDescription = document.createElement('meta');
       metaDescription.name = "description";
       document.head.appendChild(metaDescription);
     }
     metaDescription.content = "View and manage the items in your shopping cart at My Ecommerce Site. Secure checkout and fast delivery.";

     // Create or update Open Graph tags
     let ogTitle = document.querySelector('meta[property="og:title"]');
     if (!ogTitle) {
       ogTitle = document.createElement('meta');
       ogTitle.setAttribute('property', 'og:title');
       document.head.appendChild(ogTitle);
     }
     ogTitle.content = "Your Shopping Cart - My Ecommerce Site";

     let ogDescription = document.querySelector('meta[property="og:description"]');
     if (!ogDescription) {
       ogDescription = document.createElement('meta');
       ogDescription.setAttribute('property', 'og:description');
       document.head.appendChild(ogDescription);
     }
     ogDescription.content = "View and manage the items in your shopping cart at My Ecommerce Site. Secure checkout and fast delivery.";

     let ogImage = document.querySelector('meta[property="og:image"]');
     if (!ogImage) {
       ogImage = document.createElement('meta');
       ogImage.setAttribute('property', 'og:image');
       document.head.appendChild(ogImage);
     }
     ogImage.content = cartEmpty;

     let ogUrl = document.querySelector('meta[property="og:url"]');
     if (!ogUrl) {
       ogUrl = document.createElement('meta');
       ogUrl.setAttribute('property', 'og:url');
       document.head.appendChild(ogUrl);
     }
     ogUrl.content = window.location.href;

     // Cleanup function to remove added meta tags if needed
     return () => {
       document.title = "ShopNow";
     };
   }, []);

   useEffect(()=>{getProductFromCart();},[])

  return (
   <>
   {cart == null ? <Loading/> :
   <section>
   <div className="flex space-x-4 items-center">
      <i className="fa-brands fa-opencart text-3xl "></i>
      <h2 className="text-xl pl-4 relative font-semibold text-slate-600 before:absolute before:w-1 before:h-full before:bg-slate-600 before:-left-1 before:top-1/2 before:-translate-y-1/2">Your Shopping Cart</h2>
   </div>
   {cart.numOfCartItems == 0 ? 
      <CartEmpty/>
   : 
   <>
   <div className="space-y-3 mt-6">
      {cart.data.products.map((product)=>(
      <CartItem key={product._id} productInfo={product}/>
      ))}
      <div className="px-2 flex-col sm:flex-row sm:py-0 mt-5 flex gap-4 sm:gap-0  sm:items-center justify-between">
         <p className="text-xl">
            <i className="fa-solid fa-sack-dollar text-2xl mr-2 text-primary-600"></i>    
            Your Total Price <span className="text-primary-600 font-semibold underline">{cart.data.totalCartPrice}</span>
         </p>
       <div className="flex flex-col gap-3">
       <button onClick={ClearCart} className="btn uppercase bg-primary-600 hover:transition-colors duration-500 hover:bg-primary-700 text-white font-bold ">
          <i className="fa-solid fa-trash mr-2"></i>
          Clear Cart
         </button>
       </div>
      </div>
   </div>
   <Link 
  to="/checkout" 
  className="text-primary-600 inline-block text-center mt-8 border-2 w-full border-primary-600 px-2 py-1  font-bold rounded-md hover:bg-primary-600 hover:text-white transition-all"
>
  Next Step(Payment)
</Link>
   </>
   }
</section>
    }
   </>
  )
}
