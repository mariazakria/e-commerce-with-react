import axios from 'axios';
import { useFormik } from 'formik'
import { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { object, string, ref } from 'yup';
import { UserContext } from '../../Context/User.context';

export default function Login() {
  const{SetToken} =  useContext(UserContext)
  const navigate = useNavigate()
  const[accountExistError,setAccountExistError] = useState(null);
  const[forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const[showForgotPasswordForm, setShowForgotPasswordForm] = useState(false);
  const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/ 
  
  async function forgotPassword(email) {
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        method: "POST",
        data: { email }
      }
      const { data } = await axios.request(options);
      
      console.log('Forgot Password Response:', data);
      
      if (data.statusMsg === "success") {
        toast.success("Reset code sent to your email");
        localStorage.setItem('resetEmail', forgotPasswordEmail);
        navigate("/reset-password");
      }
    } catch (error) {
      console.error('Forgot Password Error:', error.response?.data);
      toast.error(error.response?.data?.message || "Failed to send reset code");
    }
  }

  const validationSchema = object({
    email: string().required('Email is required').email('email is invalid'),
    password: string().required('Password is required').matches(passwordRegex, 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
  });

  async function sendDataToRegister(values){
    const loading = toast.loading("waiting...")
    try{
      const options = {
        url:"https://ecommerce.routemisr.com/api/v1/auth/signin",
        method:"POST",
        data:values
      }
      let {data} = await axios.request(options)
      console.log(data);
      if(data.message == "success"){
        localStorage.setItem("Token",data.token)
        SetToken(data.token)
        toast.success("You have been logged in successfully")
      }
      setTimeout(()=>{navigate("/")},2000)
    }catch(error){
      setAccountExistError(error.response.data.message)
      toast.error(error.response.data.message)
    }finally{
      toast.dismiss(loading);
    }
  }
    
  const formik = useFormik({
    initialValues:{
      email:"",
      password:"",
    },
    validationSchema,
    onSubmit:sendDataToRegister
  })

  const handleForgotPasswordSubmit = (e) => {
    e.preventDefault();
    forgotPassword(forgotPasswordEmail);
  }

  return (
    <>
      {!showForgotPasswordForm ? (
        <>
          <h1 className='text-xl text-slate-700 font-semibold mb-5'>
            <i className='fa-regular fa-circle-user mr-2'></i> Login Now:
          </h1>
    
          <form className='space-y-3' onSubmit={formik.handleSubmit}>
            <div className="email">
              <input 
                type="email" 
                className='form-control w-full' 
                placeholder='Email Address' 
                id='email' 
                value={formik.values.email} 
                onChange={formik.handleChange} 
                onBlur={formik.handleBlur}  
              />
              {formik.errors.email && formik.touched.email && 
                <p className='text-red-600 font-medium'>*{formik.errors.email}</p>
              }
            </div>

            <div className="password">
              <input 
                type="password" 
                className='form-control w-full' 
                placeholder='Password' 
                id='password' 
                value={formik.values.password} 
                onChange={formik.handleChange} 
                onBlur={formik.handleBlur}  
              />
              {formik.errors.password && formik.touched.password && 
                <p className='text-red-600 font-medium'>*{formik.errors.password}</p>
              }
            </div>

            <div className="forgot-password-link text-right">
              <button 
                type="button" 
                onClick={() => setShowForgotPasswordForm(true)} 
                className="text-primary-500 hover:underline text-sm"
              >
                Forgot Password?
              </button>
            </div>

            <button 
              type='submit' 
              className='btn mt-4 uppercase bg-primary-500 hover:bg-primary-700 text-white font-bold w-full'
            >
              Login
            </button>
          </form>
        </>
      ) : (
        <>
          <h1 className='text-xl text-slate-700 font-semibold mb-5'>
            Forgot Password
          </h1>
    
          <form className='space-y-3' onSubmit={handleForgotPasswordSubmit}>
            <div className="email">
              <input 
                type="email" 
                className='form-control w-full' 
                placeholder='Enter your email' 
                value={forgotPasswordEmail} 
                onChange={(e) => setForgotPasswordEmail(e.target.value)}
                required
              />
            </div>

            <div className="actions flex justify-between">
              <button 
                type="button" 
                onClick={() => setShowForgotPasswordForm(false)} 
                className="btn bg-gray-200 text-gray-800 hover:bg-gray-300"
              >
                Back to Login
              </button>
              <button 
                type='submit' 
                className='btn uppercase bg-primary-500 hover:bg-primary-700 text-white'
              >
                Send Reset Code
              </button>
            </div>
          </form>
        </>
      )}
    </>
  )
}
