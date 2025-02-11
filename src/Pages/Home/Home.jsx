import axios from 'axios'
import Loading from '../../Components/Loading/Loading'
import Card from '../../Components/Card/Card';
import { useEffect, useState } from 'react';
import HomeSlider from '../../Components/HomeSlider/HomeSlider';
import SliderMain from '../../Components/SliderMain/SliderMain';
import useConection from '../../Hook/UseConection/UseConection';

export default function Home() {
  const[product,setProducts] = useState(null)
  const Online = useConection();

  async function getProducts() {
    const options = {
      url:"https://ecommerce.routemisr.com/api/v1/products",
      method:"GET"
    }
    let {data} = await axios.request(options)
      setProducts(data.data)    
  }

  useEffect(()=>{
    if (Online) {
      getProducts()
    }
  },[Online])

  return (
    <>
    {!Online && (
      <div className="fixed top-0 left-0 w-full bg-red-500 text-white text-center p-2 z-50">
        No Internet Connection
      </div>
    )}
    <HomeSlider/>
    <SliderMain/>
    {!product ? <Loading/> : (
      <div className="px-4 sm:px-0 grid sm:gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {product.map((product)=>{return <Card productInfo={product} key={product.id}/>})}
      </div>
    )}
    </>
  )
}
