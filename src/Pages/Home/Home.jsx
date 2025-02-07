import axios from 'axios'
import Loading from '../../Components/Loading/Loading'
import Card from '../../Components/Card/Card';
import { useEffect, useState } from 'react';
import HomeSlider from '../../Components/HomeSlider/HomeSlider';
import SliderMain from '../../Components/SliderMain/SliderMain';

export default function Home() {
  const[product,setProducts] = useState(null)
  async function getProducts() {
    const options = {
      url:"https://ecommerce.routemisr.com/api/v1/products",
      method:"GET"
    }
    let {data} = await axios.request(options)
      setProducts(data.data)    
    
  }
  useEffect(()=>{getProducts()},[])
  return (
    <>
    <HomeSlider/>
    <SliderMain/>
    {!product ? <Loading/> : <div className="px-4 sm:px-0 grid sm:gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
      {product.map((product)=>{return <Card productInfo={product} key={product.id}/>})}
    </div> }
    
    </>
  )
}
