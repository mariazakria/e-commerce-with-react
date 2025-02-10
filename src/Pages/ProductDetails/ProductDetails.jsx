import axios from 'axios'
import { useContext, useEffect, useState } from 'react';
import Loading from '../../Components/Loading/Loading';
import { Link, useParams } from 'react-router-dom';
import { cartContext } from '../../Context/Cart.context';
import ReactImageGallery from 'react-image-gallery';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Card from '../../Components/Card/Card';
import { Helmet } from 'react-helmet';

export default function ProductDetails() {
  const { addProductToCart } = useContext(cartContext);
  const [productDetails, setProductDetails] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState(null);
  const { id } = useParams();  // الحصول على الـ id من الرابط
  console.log(id);

  async function getProductDetails() {
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/products/${id}`,
        method: "GET"
      };
      const { data } = await axios.request(options);
      setProductDetails(data.data);
      console.log("DATA = ", data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProductDetails();
  }, [id]);

  async function getRelatedProduct() {
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/products?category[in]=${productDetails.category._id}`,
        method: 'GET'
      };
      let { data } = await axios.request(options);
      setRelatedProducts(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (productDetails === null) { return }
    getRelatedProduct();
  }, [productDetails]);

  return (
    <>
      {productDetails ? (
        <>
          <Helmet>
            <title>{productDetails.title} - ShopNow Store</title>
            <meta 
              name="description" 
              content={productDetails.description.length > 160 
                ? productDetails.description.substring(0, 157) + '...' 
                : productDetails.description} 
            />
            <meta name="author" content="Maria Zakaria" />
            <meta name="robots" content="index, follow" />
            <meta 
              name="keywords" 
              content={`${productDetails.title}, ${productDetails.category.name}, online shopping, ShopNow Store, ${productDetails.brand?.name || ''}`} 
            />
            
            <meta property="og:title" content={`${productDetails.title} - ShopNow Store`} />
            <meta property="og:type" content="product" />
            <meta property="og:url" content={window.location.href} />
            <meta property="og:site_name" content="ShopNow Store" />
            <meta property="og:locale" content="en_US" />
            <meta property="og:description" content={productDetails.description} />
            <meta property="og:image" content={productDetails.imageCover} />
            <meta property="og:image:alt" content={productDetails.title} />
            
            <meta property="product:price:amount" content={productDetails.price} />
            <meta property="product:price:currency" content="EGP" />
            <meta property="product:availability" content={productDetails.quantity > 0 ? 'in stock' : 'out of stock'} />
            <meta property="product:condition" content="new" />
            <meta property="product:brand" content={productDetails.brand?.name || 'ShopNow Store'} />
            <meta property="product:category" content={productDetails.category.name} />
            
            <meta name="twitter:card" content="product" />
            <meta name="twitter:title" content={`${productDetails.title} - ShopNow Store`} />
            <meta name="twitter:description" content={productDetails.description} />
            <meta name="twitter:image" content={productDetails.imageCover} />
            <meta name="twitter:site" content="@shopnowstore" />
            <meta name="twitter:creator" content="@mariazakria" />
            
            <link rel="canonical" href={window.location.href} />
          </Helmet>

          <section className='px-3 sm:py-3 sm:px-0 grid gap-5 grid-cols-12 '>
            <div className='col-span-12 md:col-span-5'>
              <ReactImageGallery
                showFullscreenButton={true}
                showPlayButton={false}
                showNav={false}
                items={productDetails.images.map((image) => {
                  return {
                    original: image,
                    thumbnail: image,
                  };
                })}
              />
            </div>
            <div className=' col-span-12 md:col-span-7 space-y-4'>
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

              <button onClick={() => {
                addProductToCart({ productId: id })
              }}
                className="btn uppercase w-full bg-primary-500 hover:bg-primary-600 text-white font-bold">
                Add To Cart
              </button>
            </div>
          </section>
          <section className="py-8 px-3 sm:px-0">
            <div className="mb-8">
              <h2 className="text-2xl text-gray-600 font-semibold">Related Products</h2>
            </div>
            {relatedProducts ? (
              <Slider
                dots={false}
                infinite={true}
                speed={500}
                slidesToShow={6}
                slidesToScroll={1}
                pauseOnHover={false}
                autoplay={true}
                autoplaySpeed={3000}
                arrows={false}
                responsive={[
                  {
                    breakpoint: 1024,
                    settings: {
                      slidesToShow: 4,
                    }
                  },
                  {
                    breakpoint: 768,
                    settings: {
                      slidesToShow: 2,
                    }
                  },
                  {
                    breakpoint: 480,
                    settings: {
                      slidesToShow: 1,
                    }
                  }
                ]}
                className="related-products-slider"
              >
                {relatedProducts.map((product) => (
                  <div key={product.id} className="px-2">
                    <Link to={`/product/${product.id}`}>
                      <Card productInfo={product} />
                    </Link>
                  </div>
                ))}
              </Slider>
            ) : (
              <Loading />
            )}
          </section>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}
