import React from 'react';
import NotfoundImage from '../../assets/images/error.jpg';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function Notfound() {
  return (
    <>
      <Helmet>
        <title>Page Not Found - ShopNow Store</title>
        <meta
          name="description"
          content="The page you're looking for cannot be found. Return to ShopNow Store homepage."
        />
        <meta name="robots" content="noindex, follow" />
        <meta name="author" content="Maria Zakaria" />
        <meta property="og:title" content="Page Not Found - ShopNow Store" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:site_name" content="ShopNow Store" />
        <meta property="og:locale" content="en_US" />
        <meta
          property="og:description"
          content="The page you're looking for cannot be found. Return to ShopNow Store homepage."
        />
        <meta property="og:image" content={NotfoundImage} />
        <meta property="og:image:alt" content="404 Page Not Found Illustration" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Page Not Found - ShopNow Store" />
        <meta name="twitter:description" content="The page you're looking for cannot be found. Return to ShopNow Store homepage." />
        <meta name="twitter:image" content={NotfoundImage} />
        <meta name="twitter:site" content="@shopnowstore" />
        <meta name="twitter:creator" content="@mariazakria" />
      </Helmet>

      <div className="h-96 min-h-full flex justify-center items-center flex-col">
        <img className="w-96" src={NotfoundImage} alt="Not found page" />
        <h2 className="mt-4 text-2xl text-center text-gray-600">
          Oops! The page you're looking for doesn't exist.{' '}
          <Link className="text-primary-600 hover:text-primary-600 hover:transition-colors duration-300" to="/">
            Back To Home
          </Link>
        </h2>
      </div>
    </>
  );
}
