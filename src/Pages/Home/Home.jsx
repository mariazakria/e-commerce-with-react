import axios from 'axios'
import Loading from '../../Components/Loading/Loading'
import Card from '../../Components/Card/Card';
import { useEffect, useState } from 'react';
import HomeSlider from '../../Components/HomeSlider/HomeSlider';
import SliderMain from '../../Components/SliderMain/SliderMain';
import useConection from '../../Hook/UseConection/UseConection';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export default function Home() {
  const Online = useConection();

  async function getProducts() {
    const options = {
      url:"https://ecommerce.routemisr.com/api/v1/products",
      method:"GET"
    }
    return await axios.request(options)
  }
  const queryHome = useQuery({})
  console.log("queryHome",queryHome);
  
const {data, isError, isLoading, } = useQuery({
// elawl kan string now array => array 3shan btsm7 adef details aktr
  queryKey:["queryHome"],
  // function api
  queryFn: getProducts,
  // staletime b3d 5000 second  htb2a adema....stale y3ni b2t adema
    // elly msh most5dm esmo inactive
  // kol sa3ten 3dlha
  staleTime: 2 * 60 * 60 * 1000,
  // by3ml fetch lldata aro7 lldata aw arg3 f y3ml fetch lldata => lw eldata stale f by3ml request yshof eladema
  refetchOnMount: true,
  // elw2t elly by3ml fetch w yb3t request b3dha
  refetchInterval: 5000,
// kol sania 
  refetchIntervalInBackground:true,
refetchOnWindowFocus:false,
refetchOnReconnect:true,


})

if(isLoading) return <Loading/>


  return (
    <>
    {!Online && (
      <div className="fixed top-0 left-0 w-full bg-red-500 text-white text-center p-2 z-50">
        No Internet Connection
      </div>
    )}
    <HomeSlider/>
    <SliderMain/>
    <div className="px-4 sm:px-0 grid sm:gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {data?.data?.data?.map((product) => (
          <Card productInfo={product} key={product.id} />
        ))}
      </div>

    )
    </>
  )
}
