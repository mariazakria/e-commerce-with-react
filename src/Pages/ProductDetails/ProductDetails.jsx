import axios from 'axios'
import img from '../../assets/images/slider-image-1.jpeg'
import { useContext, useEffect, useState } from 'react';
import Loading from '../../Components/Loading/Loading';
import { useParams } from 'react-router-dom';
import { cartContext } from '../../Context/Cart.context';
import ReactImageGallery from 'react-image-gallery';
export default function ProductDetails() {
  const{addProductToCart} =  useContext(cartContext)
    const[productDetails,SetproductDetails] = useState(null)
    const {id} = useParams()
console.log(id);


    async function getProductDetails(){
       try{
        const options = {
            url:`https://ecommerce.routemisr.com/api/v1/products/${id}`,
            method:"GET"
        }
        const{data} = await axios.request(options)
        SetproductDetails(data.data)
        console.log("DATA = ",data);
       }catch(error){
        console.log(error);
        
       }
        
    }
    useEffect(() => {
      getProductDetails();
    }, [id]);

    
    return(
      <>
      {productDetails ?   
      <section className='grid gap-5 grid-cols-12'>
         <div className='col-span-3'>
            <ReactImageGallery 
            showFullscreenButton={true}
            showPlayButton={false}
            showNav={false}
             items={productDetails.images.map((image)=>{
               return {
                  original:image,
                  thumbnail:image,
               }
            })}/>
         </div>
         <div className='col-span-9 space-y-4'>
            <div className="body-header">
               <h2 className='text-2xl font-semibold text-gray-600'>{productDetails.title}</h2>
               <h3 className='text-primary-500'>{productDetails.category.name}</h3>
            </div>
            <p className='text-gray-400'>{productDetails.description}</p>

            <div className=" flex justify-between items-center">
               <span>{productDetails.price} L.E</span>
               <div className="rating flex justify-between items-center">
                  <i className='mr-2 fa-solid fa-star text-yellow-400'></i>
                  <span>{productDetails.ratingsAverage}</span>
               </div>
            </div>
            
            <div>
               <div className="mt-2 flex items-center space-x-3">
                  <button
                     onClick={()=>{
                  UpdateProduct({
                  productId:id,
                  count: count - 1
                  })
                  }}
                  className="px-3 py-1 border rounded-md hover:bg-gray-100"
                  >
                  <i className='fa-solid fa-minus'></i>
                  </button>
                  <span className="text-gray-900">1</span>
                  <button
                     onClick={()=>{
                  UpdateProduct({
                  productId:id,
                  count: count + 1
                  })
                  }}
                  className="px-3 py-1 border rounded-md hover:bg-gray-100"
                  >
                  <i className='fa-solid fa-plus'></i>
                  </button>
               </div>
            </div>
            <button onClick={()=>{
            addProductToCart({productId : id})
            }} 
            className="btn uppercase w-full bg-primary-500 hover:bg-primary-600 text-white font-bold">Add To Cart</button>
         </div>
      </section>
      : 
      <Loading/>
      }
      </>
      )
}
