import { useContext, useEffect } from 'react';
import { cartContext } from '../../Context/Cart.context';
import { Link } from 'react-router-dom';

export default function CartItem({productInfo}) {
    const{count,price,product}= productInfo;
    const{imageCover,category,id,title }=product;
    const{removeProductFromCart, UpdateProduct} = useContext(cartContext)

    return (
        <div className='flex gap-2'>
            <div className="cart flex-1 grid sm:flex sm:items-center sm:justify-between gap-4 bg-gray-100 p-4 rounded-lg">
                <div className="flex items-center gap-4">
                    <img 
                        src={imageCover} 
                        alt={title} 
                        className='w-24 h-24 object-contain bg-white rounded-md' 
                    />
                    <div>
                        <Link to={`/product/${id}`}>
                            <h3 className='text-lg text-gray-700 font-semibold line-clamp-1 hover:line-clamp-none'>
                                {title}
                            </h3>
                        </Link>
                        <h4 className='text-gray-400 font-semibold mt-1'>
                            {category.name}
                        </h4>
                    </div>
                </div>

                <div className="flex justify-between items-center gap-8">
                    <div className="icons flex gap-3 items-center">
                        <button
                            onClick={() => UpdateProduct({
                                productId: id,
                                count: count - 1
                            })}
                            className="w-7 h-7 rounded-full bg-primary-600 text-white hover:bg-primary-700 flex justify-center items-center transition-colors duration-300"
                        >
                            <i className='fa-solid fa-minus text-sm'></i>
                        </button>

                        <span className='text-lg font-bold text-gray-800'>
                            {count}
                        </span>

                        <button
                            onClick={() => UpdateProduct({
                                productId: id,
                                count: count + 1
                            })}
                            className="w-7 h-7 rounded-full bg-primary-600 text-white hover:bg-primary-700 flex justify-center items-center transition-colors duration-300"
                        >
                            <i className='fa-solid fa-plus text-sm'></i>
                        </button>
                    </div>

                    <span className='text-lg font-bold text-primary-600'>
                        {price} L.E
                    </span>
                </div>
            </div>

            <button 
                onClick={() => removeProductFromCart({productId:id})}
                className='self-center rounded-lg p-4 bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-red-500 transition-all duration-300'
            >
                <i className='fa-solid fa-xmark'></i>
            </button>
        </div>
    );
}