import { useContext, useEffect } from 'react';
import { cartContext } from '../../Context/Cart.context';
import { Link } from 'react-router-dom';
export default function CartItem({productInfo}) {
    const{count,price,product}= productInfo;
    const{imageCover,category,id,title }=product;
   const{removeProductFromCart, UpdateProduct} =  useContext(cartContext)
  return (
    <>
   <div className='flex gap-2'>
   <div className="cart flex grow items-center justify-between bg-gray-100 py-4 px-6 rounded-lg">
   <img src={imageCover} alt={title} className='w-24 h-24 border-white object-cover rounded-md' />
   <h3 className='text-lg text-gray-700 font-semibold line-clamp-1 hover:line-clamp-none'><Link to={`/product/${id}`}>{title}</Link></h3>
   <h4 className=' text-gray-400 font-semibold'> {category.name}</h4>
   <div className="count ">

      <div className="icons flex gap-3 items-center">


         <div
         onClick={()=>{
            UpdateProduct({
               productId:id,
               count: count + 1
            })
                     }}
          className="plus w-6 h-6 rounded-full bg-red-500 text-white flex justify-center items-center cursor-pointer">
                        <i className='fa-solid fa-plus'></i>
         </div>
         <span className='text-lg font-bold text-gray-800'>{count}</span>

         <div onClick={()=>{
UpdateProduct({
   productId:id,
   count: count - 1
})
         }}
          className="minus w-6 h-6 rounded-full bg-red-500 text-white flex justify-center items-center cursor-pointer"> <i className='fa-solid fa-minus'></i></div>
      </div>
   </div>
   <span>{price} L.E</span>

</div>
<button  onClick={() => removeProductFromCart({productId:id})}
 className='rounded-md p-3 bg-gray-100 hover:bg-gray-200 transition-colors duration-300 '>
    <i className='fa-solid fa-xmark'></i>
</button>
   </div>

    </>
  )
}
