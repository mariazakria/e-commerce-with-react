import { useEffect, useState } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import Loading from '../../Components/Loading/Loading';

export default function Brands() {
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true); 

    async function getBrands() {
        try {
            const { data } = await axios.request({
                url: 'https://ecommerce.routemisr.com/api/v1/brands',
                method: 'GET'
            });
            setBrands(data.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);  
        }
    }

    useEffect(() => {
        getBrands();
    }, []);

    return (
        <>
            <Helmet>
                <title>Top Brands - ShopNow Store | Best Deals & Exclusive Offers</title>
                <meta name="author" content="Maria Zakaria" />
                <meta property="og:price:currency" content="EGP" />
                <meta property="og:image" content="https://img.freepik.com/free-vector/esports-collaboration-abstract-concept-illustration_335657-2195.jpg?uid=R140459377&ga=GA1.1.1165056533.1738031764&semt=ais_hybrid" />
                <meta property="og:type" content="product" />
                <meta name="description" content="Buy Product Name at Your E-commerce Store. High quality, affordable, and fast shipping. Limited stock available!" />
                <meta name="keywords" content="Product Name, online shopping, buy product, best price, product features, fast shipping" />
                <meta property="og:description" content="Buy Product Name at Your E-commerce Store. High quality, affordable, and fast shipping. Limited stock available!" />
                <meta property="og:title" content="Top Brands - ShopNow Store | Best Deals & Exclusive Offers" />
                <link rel="icon" href="../../assets/images/favicon.png" type="image/x-icon" />
            </Helmet>

            <div className="container mx-auto px-4 py-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-8">Our Brands</h2>

                {loading ? (
                    <Loading />  
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {brands.map((brand) => (
                            <div key={brand._id} className="group">
                                <div className="transition-transform duration-300 group-hover:-translate-y-1">
                                    <div className="aspect-square overflow-hidden rounded-lg mb-2">
                                        <img 
                                            src={brand.image} 
                                            alt={brand.name}
                                            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}