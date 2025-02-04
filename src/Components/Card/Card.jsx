import React from 'react';

export default function Card({ productInfo }) {
  const { category, imageCover, price, ratingsAverage, title, description } = productInfo;

  return (
    <>
      <div className="mb-8 card group rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform duration-300  hover:scale-100  hover:border hover:border-primary-600">
        <div className="relative">
          <img src={imageCover} alt={title} className="card-img" />
          {/* <div className="layer group-hover:opacity-100 transition-opacity duration-300 gap-2 flex justify-center items-center absolute w-full h-full left-0 top-0 bg-slate-400 bg-opacity-35 opacity-0">
            <div className="icon cursor-pointer w-8 h-8 rounded-full bg-primary-500 text-white flex justify-center items-center">
              <i className="fa-solid fa-eye"></i>
            </div>
            <div className="icon cursor-pointer w-8 h-8 rounded-full bg-primary-500 text-white flex justify-center items-center">
              <i className="fa-solid fa-cart-shopping"></i>
            </div>
          </div> */}
        </div>

        <div className="space-y-3 card-body p-4">
          <header>
            <h3 className="text-lg text-gray-600 font-semibold line-clamp-1">{title}</h3>
            <h4 className="text-primary-500 font-semibold">{category.name}</h4>
          </header>
          <p className="text-gray-400 line-clamp-2 text-sm">{description}</p>
          <span className="text-primary-800 font-semibold">{price} L.E</span>

          <div className="flex items-center justify-between">
            <div className="icon cursor-pointer w-8 h-8 rounded-full bg-primary-500 text-white flex justify-center items-center">
              <i className="fa-solid fa-heart"></i>
            </div>
            <div className="flex items-center space-x-1">
              <span>{ratingsAverage}</span>
              <i className="fa-solid fa-star text-yellow-300"></i>
            </div>
          </div>

          <div className="relative">
            <div className="w-full mt-3 flex justify-end">
              <button className="ms-5 rounded-lg px-2 py-2 text-light fw-bold bg-primary-600 text-white font-semibold opacity-0 translate-y-5 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
