import axios from 'axios'
import Loading from '../../Components/Loading/Loading'
import Card from '../../Components/Card/Card';
import { useEffect, useState } from 'react';
import HomeSlider from '../../Components/HomeSlider/HomeSlider';
import SliderMain from '../../Components/SliderMain/SliderMain';
import { Helmet } from 'react-helmet';

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
      <Helmet>
        <title>ShopNow Store - Your Ultimate Shopping Destination</title>
        <meta name="description" content="Discover amazing deals on ShopNow Store. Shop the latest trends in fashion, electronics, home goods and more. Free shipping on eligible orders." />
        <meta name="author" content="Maria Zakaria" />
        <meta name="robots" content="index, follow" />
        <meta name="keywords" content="online shopping, best deals, fashion, electronics, home goods, free shipping" />
        <link rel="canonical" href={window.location.href} />

        <meta property="og:title" content="ShopNow Store - Your Ultimate Shopping Destination" />
        <meta property="og:description" content="Discover amazing deals on ShopNow Store. Shop the latest trends in fashion, electronics, home goods and more." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:image" content="https://img.freepik.com/free-vector/shopping-online_24877-49183.jpg?uid=R140459377&ga=GA1.1.1165056533.1738031764&semt=ais_hybrid" />
        <meta property="og:image:alt" content="ShopNow Store Image Description" />
        <meta property="og:site_name" content="ShopNow Store" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:updated_time" content="2025-02-09T12:00:00Z" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ShopNow Store - Your Ultimate Shopping Destination" />
        <meta name="twitter:description" content="Discover amazing deals on ShopNow Store. Shop the latest trends in fashion, electronics, home goods and more." />
        <meta name="twitter:image" content="https://img.freepik.com/free-vector/shopping-online_24877-49183.jpg?uid=R140459377&ga=GA1.1.1165056533.1738031764&semt=ais_hybrid" />
        <meta name="twitter:site" content="@shopnowstore" />
        <meta name="twitter:creator" content="@mariazakria" />
      </Helmet>

      <HomeSlider/>
      <SliderMain/>
      {!product ? <Loading/> : <div className="px-4 sm:px-0 grid sm:gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {product.map((product)=>{return <Card productInfo={product} key={product.id}/>})}
      </div> }
    </>
  )
}
