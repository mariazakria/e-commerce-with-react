import axios from 'axios';
import { useFormik } from 'formik'
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { object, string, ref } from 'yup';

export default function Signup() {
    const navigate = useNavigate()
// fe case an b3t llbackend w tl3 fe error en el accout mwgod hna ana 3aiza a3ml render tany 
// w yzhr error f hna h7tag state

// flbdaia aslun m3ndesh error
const[accountExistError,setAccountExistError] = useState(null);


    const phoneRegex = /^01[0125][0-9]{8}$/
    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/ 
    const validationSchema = object({
        name: string().required('Name is required').min(3, 'Name must be at least 3 characters').max(20, 'Name must be at most 20 characters'),
        email: string().required('Email is required').email('email is invalid'),
        password: string().required('Password is required').matches(passwordRegex, 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
        rePassword: string().required('Re-password is required').oneOf([ref("password"), null], 'rePassword should bs same  Password'),
        phone: string().required('Phone is required').matches(phoneRegex, 'sorry,we can accept egyption numbers only')
      });
async function sendDataToRegister(values){
    // toast.loading ==> btrg3 id
    const loading = toast.loading("waiting...")
    try{
        const options = {
            url:"https://ecommerce.routemisr.com/api/v1/auth/signup",
            method:"POST",
            data:values
        }
        let {data} = await axios.request(options)
        console.log(data);
        if(data.message == "success"){
                toast.success("User Created Successfully")
        }
        // setInterval(() => {
            // ysht8l kol 2sec
        // }, interval);

        
        // y3od 2sec
        setTimeout(()=>{navigate("/login")},2000)
        
    }catch(error){
        setAccountExistError(error.response.data.message)
        // toast.error("Account Already Exists")
        toast.error(error.response.data.message)
        console.log(error);
        
    }finally{
        toast.dismiss(loading)
    }
    
}

    const formik = useFormik({
        initialValues:{
            name: "",
            email:"",
            password:"",
            rePassword:"",
            phone:""
        },
        validationSchema,
        onSubmit:sendDataToRegister

        
    })
  return (
    <>
    <h1  className='text-xl text-slate-700 font-semibold mb-5'><i className='fa-regular fa-circle-user mr-2'></i> Register Now:</h1>
    
      <form className='space-y-3' onSubmit={formik.handleSubmit}>
<div className="name">
    <input type="text" className='form-control w-full' placeholder='Type Your Name' id='name' value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur}  />
    {formik.errors.name && formik.touched.name && <p className='text-red-600 font-medium '>*{formik.errors.name}</p>}
    </div>
<div className="email">
    <input type="email" className='form-control w-full' placeholder='Email Address' id='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}  />
    {formik.errors.email &&formik.touched.email && <p className='text-red-600 font-medium '>*{formik.errors.email}</p>}
    {/* {accountExistError &&  <p className='text-red-600 font-medium '>*{accountExistError}</p>} */}

</div>
<div className="password">
    <input type="password" className='form-control w-full' placeholder='Password' id='password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}  />
    {formik.errors.password &&formik.touched.password && <p className='text-red-600 font-medium '>*{formik.errors.password}</p>}

</div>
<div className="rePassword">
    <input type="password" className='form-control w-full' placeholder='confirm rePassword' id='rePassword' value={formik.values.rePassword}  onChange={formik.handleChange} onBlur={formik.handleBlur} />
    {formik.errors.rePassword &&formik.touched.rePassword && <p className='text-red-600 font-medium '>*{formik.errors.rePassword}</p>}

</div>
<div className="phone">
    <input type="tel" className='form-control w-full' placeholder='Enter Your Phone' id='phone' value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur}  />
    {formik.errors.phone &&formik.touched.phone && <p className='text-red-600 font-medium '>*{formik.errors.phone}</p>}
</div>
<button type='submit' className='btn mt-8 uppercase bg-primary-500 hover:bg-primary-700 text-white font-bold w-full'>SignUp</button>

      </form>
    </>
  )
}
