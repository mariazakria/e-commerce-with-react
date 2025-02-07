import { createContext, useContext, useState } from "react";
import  { UserContext } from "./User.context";
import axios from "axios";
import toast from "react-hot-toast";
import { data } from "react-router-dom";

export const cartContext = createContext(null)


export default function CartProvider({children}){
    const {token} = useContext(UserContext)
    const[cart,SetCartInfo] = useState(null)
// productId => props hb3to ha5do mn elcart w elfunction btsht8l
// Addproduct
async function addProductToCart({productId}){

        // *Add
        console.log("addProductToCart");
        const loading = toast.loading("Adding Product...")
        try{
            const options = {
                url: "https://ecommerce.routemisr.com/api/v1/cart",
                method:"POST",
                headers:{
                    token: token,
                },
                data:{
                    productId:productId
                }
            }
            const {data} = await axios.request(options)
            console.log(data);
            
            if(data.status == "success"){
                toast.success("Product added successfully to your cart");
                // elfun de 3shan lma aro7 llcart mya5odsh w2t w yzwd hwa awl m tsht8l hy3dl state 3la tol w ykon kol elproduct mwgoda
                getProductFromCart();
            }
        }catch(error){
            console.log(error);
        }finally{
            toast.dismiss(loading)
        }
    }

    // GET CART
    async function getProductFromCart(){
        try{
            const options = {
                url:"https://ecommerce.routemisr.com/api/v1/cart",
                method:"GET",
                headers:{
                    token:token,
                }
            }
            const{data} = await axios.request(options)
            SetCartInfo(data)
            console.log(data);
            
        }catch(error){
            console.log(error);
            
        }
        
    }
    // REMOVE CART
    async function removeProductFromCart({productId}){
        const loading = toast.loading("waiting to remove Product...")
        try{
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
                method:"DELETE",
                headers:{
                    token:token,
                }
            }
            
            const{data} = await axios.request(options)
            toast.success("Product removed from your cart successfully!");
            SetCartInfo(data)
            console.log(data);
            
        }catch(error){
            console.log(error);
            
        }finally{
            toast.dismiss(loading)
        }
        
    }

    //  *CLEAR CART
    async function ClearCart(){
        const loading = toast.loading("Clear Cart...")

        try{
            const options = {
                url:"https://ecommerce.routemisr.com/api/v1/cart",
                method:"DELETE",
                headers:{
                    token:token,
                }
            }
            const{data} = await axios.request(options)
            toast.success("Cart cleared successfully!");
            if(data.message == "success"){
                SetCartInfo({
                    ...cart, //save ba2y eldata
                numOfCartItems: 0, //bs 5leha 0 fadia
                })
                // // clear all
                // SetCartInfo(null)
                // hat b2a eldata b3d m b2t mfesh 
                // getProductFromCart();
            }
            console.log(data);
            
        }catch(error){
            console.log(error);
            
        }finally{
            toast.dismiss(loading)
        }
        
    }

    // UPDATE
    async function UpdateProduct({productId,count}){
        try{
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
                method:"PUT",
                headers:{
                    token,
                },
                data: {
                    count: count
                }
            }
            const {data} = await axios.request(options)
            console.log(data);
            
            if(data.status == "success"){
                SetCartInfo(data)
            }
            toast.success("The product has been updated successfully!");
        }catch(error){
            console.log(error);
            
        }
        
    }


    return<cartContext.Provider value={{addProductToCart,getProductFromCart,cart,removeProductFromCart, ClearCart ,UpdateProduct }}>

{children}
    </cartContext.Provider>
}