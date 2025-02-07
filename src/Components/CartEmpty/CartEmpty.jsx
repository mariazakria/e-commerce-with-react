import { Link } from "react-router-dom"
import cartEmpty from "../../assets/images/supermarket-shopping-cart-concept-illustration_114360-22408.avif"

export default function CartEmpty() {
  return (
    <>
<div className="h-full flex justify-center items-center flex-col ">
        <img className="w-96" src={cartEmpty} alt="Not found page" />
        <h2 className="mt-4 text-2xl text-gray-600">
         Oops! Your Cart Is Empty..Add some items and come back later {" "}
         <Link className="text-primary-600 underline hover:text-primary-600 hover:underline-none hover:transition-all duration-300" to="/">
            Back To Products
            </Link>

        </h2>
      </div>
    </>
  )
}
