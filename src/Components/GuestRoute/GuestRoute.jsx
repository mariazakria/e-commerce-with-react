import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { UserContext } from '../../Context/User.context';

export default function GuestRoute({children}) {
  // hyro7 ybos 3la eltoken w yshof fe token wla mn usecontext
  const {token} = useContext(UserContext)
  if(!token){
    return children
    }else{
        return <Navigate to="/"/>
    }
  
}
