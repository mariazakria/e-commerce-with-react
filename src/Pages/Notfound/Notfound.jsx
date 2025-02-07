import React from 'react';
import NotfoundImage from '../../assets/images/error.jpg';
import { Link } from 'react-router-dom';

export default function Notfound() {
  return (
    <>
      <div className="h-96 min-h-full flex justify-center items-center flex-col">
        <img className="w-96" src={NotfoundImage} alt="Not found page" />
        <h2 className="mt-4 text-2xl text-gray-600">
          Oops! The page you're looking for doesn't exist.{' '}
          <Link className="text-primary-600 hover:text-primary-600 hover:transition-colors duration-300" to="/">
            Back To Home
          </Link>
        </h2>
      </div>
    </>
  );
}
