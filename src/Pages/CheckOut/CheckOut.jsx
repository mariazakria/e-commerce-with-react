import { useFormik } from "formik";
import { useContext, useState } from "react";
import { cartContext } from "../../Context/Cart.context";
import { UserContext } from "../../Context/User.context";
import { data, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function CheckOut() {
    const{token} = useContext(UserContext)
  const {cart} = useContext(cartContext)
  const navigate = useNavigate()
  const[paymentMethod,setpaymentMethod] =useState(null)
  console.log(cart);
  
    async function OnlinePayment(values){
        const loading = toast.loading("We Are Creating Your Order...")
       try{
        const options ={
            url:`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cart.cartId}?url=${location.origin}`,
            method:"POST",
            headers:{
                token,
            },
            data:values,
        }
        const {data} = await axios.request(options)
        if(data.status == "success"){
            toast.success("redirecting you to stripe")
            setTimeout(()=>{
                location.href = data.session.url
            },2000)
        }
       }catch(error){
        console.log(error);
        
       }finally{
        toast.dismiss(loading)
       }

    }

    async function CreateCashOrder(values){
        const loading = toast.loading("We Are Creating Your Order...")
       try{
        const options ={
            url:`https://ecommerce.routemisr.com/api/v1/orders/${cart.cartId}`,
            method:"POST",
            headers:{
                token,
            },
            data:values,
        }
        const {data} = await axios.request(options)
        if(data.status == "success"){
            toast.success("Your Order Has been created")
            setTimeout(()=>{navigate("/alloreders")},2000)
        }
       }catch(error){
        console.log(error);
        
       }finally{
        toast.dismiss(loading)
       }

    }
    const formik = useFormik({
        initialValues:{
        "shippingAddress":{
        "details": "",
        "phone": "",
        "city": ""
        },
        },
        onSubmit: (values) => {
            if(paymentMethod == "cash"){
                CreateCashOrder(values)
            }
            if(paymentMethod == "onlie"){
                OnlinePayment(values)
            }
        },
        

    })

//   const calculateTotal = () => {
//     return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
//   };

return (
    <div className="min-h-screen bg-gray-50 py-12">
       <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
             {/* Shipping Information */}
             <div className="md:w-2/3">
                <div className="bg-white rounded-lg shadow-md p-6">
                   <h2 className="text-2xl font-semibold mb-6 text-gray-700">Shipping Details</h2>
                   <form onSubmit={formik.handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                            City
                            </label>
                            <input
                               id="shippingAddress.city"
                               type="text"
                               name="shippingAddress.city"
                               value={formik.values.shippingAddress.city}
                               onChange={formik.handleChange}
                               onBlur={formik.handleBlur}
                               placeholder="Enter your city"
                               className="w-full outline-none px-4 py-3 border border-gray-300 rounded-md focus:ring-2  transition-all duration-200"
                               required
                               />
                         </div>
                         <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                            Phone Number
                            </label>
                            <input
                               id="shippingAddress.phone"
                               type="tel"
                               onBlur={formik.handleBlur}
                               name="shippingAddress.phone"
                               value={formik.values.shippingAddress.phone}                      onChange={formik.handleChange}
                               placeholder="Enter your phone number"
                               className="w-full outline-none px-4 py-3 border border-gray-300 rounded-md focus:ring-2  transition-all duration-200"
                               required
                               />
                         </div>
                      </div>
                      <div>
                         <label className="block text-sm font-medium text-gray-700 mb-2">
                         Address Details
                         </label>
                         <textarea
                            id="shippingAddress.details"
                            name="shippingAddress.details"
                            onBlur={formik.handleBlur}
                            value={formik.values.shippingAddress.details} 
                            onChange={formik.handleChange}
                            placeholder="Enter your complete address details"
                            rows="4"
                            className="w-full px-4 py-3 border outline-none border-gray-300 rounded-md focus:ring-2  transition-all duration-200 resize-none"
                            required
                            ></textarea>
                      </div>
                      <div className="flex gap-3 justify-end flex-col md:flex-row">
                         <button
                         onClick={()=>{
                            setpaymentMethod("cash")
                         }}
                            type="submit"
                            className="text-white btn px-3 py-2 bg-blue-500  hover:bg-blue-700 transition-colors duration-200 font-semibold"
                            >
                         Cash Order
                         </button>
                         <button
                         onClick={()=>{
                            setpaymentMethod("online")
                         }}
                            type="submit"
                            className="text-white btn px-3 py-2 bg-green-500 hover:bg-green-700 transition-colors duration-200 font-semibold"
                            >
                         Online Payment
                         </button>
                      </div>
                   </form>
                </div>
             </div>
             {/* Order Summary */}
             {/* <div className="md:w-1/3">
                <div className="bg-white rounded-lg shadow-md p-6">
                   <h2 className="text-2xl font-semibold mb-6 text-gray-700">Order Summary</h2>
                   <div className="space-y-4">
                      {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center space-x-4 border-b pb-4">
                         <div className="w-20 h-20 rounded-md overflow-hidden">
                            <img
                               src={item.image}
                               alt={item.name}
                               className="w-full h-full object-cover"
                               />
                         </div>
                         <div className="flex-1">
                            <h3 className="text-sm font-medium text-gray-800">{item.name}</h3>
                            <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                            <p className="text-sm font-semibold text-blue-600">${item.price.toFixed(2)}</p>
                         </div>
                      </div>
                      ))}
                   </div>
                   <div className="mt-6 border-t pt-6">
                      <div className="flex justify-between mb-2">
                         <span className="text-sm text-gray-600">Subtotal</span>
                         <span className="text-sm font-semibold">${calculateTotal().toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                         <span className="text-sm text-gray-600">Shipping</span>
                         <span className="text-sm font-semibold">$10.00</span>
                      </div>
                      <div className="flex justify-between border-t pt-2 mt-2">
                         <span className="text-base font-semibold text-gray-800">Total</span>
                         <span className="text-base font-semibold text-blue-600">
                         ${(calculateTotal() + 10).toFixed(2)}
                         </span>
                      </div>
                   </div>
                </div>
             </div> */}
          </div>
       </div>
    </div>
    );
}
