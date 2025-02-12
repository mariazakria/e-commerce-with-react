import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function ResetPassword() {
  const navigate = useNavigate();
  const [isCodeVerified, setIsCodeVerified] = useState(false);

  // Check for email on component mount
  useEffect(() => {
    const resetEmail = localStorage.getItem('resetEmail');
    if (!resetEmail) {
      toast.error('No email found. Please request a reset code again.');
      navigate('/login');
    }
  }, [navigate]);

  const resetCodeSchema = Yup.object({
    resetCode: Yup.string()
      .required('Reset code is required')
      .length(6, 'Reset code must be 6 digits'),
  });

  const newPasswordSchema = Yup.object({
    newPassword: Yup.string()
      .required('New password is required')
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
      ),
    confirmPassword: Yup.string()
      .required('Confirm password is required')
      .oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
  });

  const resetCodeFormik = useFormik({
    initialValues: {
      resetCode: '',
    },
    validationSchema: resetCodeSchema,
    onSubmit: async (values) => {
      try {
        const resetEmail = localStorage.getItem('resetEmail');
        
        if (!resetEmail) {
          toast.error('No email found. Please request a reset code again.');
          navigate('/login');
          return;
        }

        const { data } = await axios.post(
          'https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', 
          { 
            resetCode: values.resetCode 
          }
        );
        
        console.log('Verify Reset Code Response:', data);
        
        if (data.status === 'Success') {
          toast.success('Reset code verified');
          setIsCodeVerified(true);
        } else {
          toast.error('Invalid reset code');
        }
      } catch (error) {
        console.error('Verify Reset Code Error:', error.response?.data);
        toast.error(error.response?.data?.message || 'Failed to verify reset code');
      }
    },
  });

  const newPasswordFormik = useFormik({
    initialValues: {
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: newPasswordSchema,
    onSubmit: async (values) => {
      try {
        const resetEmail = localStorage.getItem('resetEmail');
        
        if (!resetEmail) {
          toast.error('No email found. Please request a reset code again.');
          navigate('/login');
          return;
        }

        const { data } = await axios.put(
          'https://ecommerce.routemisr.com/api/v1/auth/resetPassword', 
          { 
            email: resetEmail,
            newPassword: values.newPassword 
          }
        );
        
        console.log('Reset Password Response:', data);
        
        toast.success('Password reset successfully');
        localStorage.removeItem('resetEmail');
        navigate('/login');
      } catch (error) {
        console.error('Reset Password Error:', error.response?.data);
        toast.error(error.response?.data?.message || 'Failed to reset password');
      }
    },
  });

  return (
    <div className="reset-password-container max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {!isCodeVerified ? 'Verify Reset Code' : 'Reset Password'}
      </h2>

      {!isCodeVerified ? (
        <form onSubmit={resetCodeFormik.handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              id="resetCode"
              name="resetCode"
              placeholder="Enter 6-digit reset code"
              className="form-control w-full"
              value={resetCodeFormik.values.resetCode}
              onChange={resetCodeFormik.handleChange}
              onBlur={resetCodeFormik.handleBlur}
              maxLength={6}
            />
            {resetCodeFormik.errors.resetCode && resetCodeFormik.touched.resetCode && (
              <p className="text-red-500 text-sm mt-1">
                {resetCodeFormik.errors.resetCode}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="btn bg-primary-500 hover:bg-primary-700 text-white w-full"
          >
            Verify Reset Code
          </button>
        </form>
      ) : (
        <form onSubmit={newPasswordFormik.handleSubmit} className="space-y-4">
          <div>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              placeholder="New Password"
              className="form-control w-full"
              value={newPasswordFormik.values.newPassword}
              onChange={newPasswordFormik.handleChange}
              onBlur={newPasswordFormik.handleBlur}
            />
            {newPasswordFormik.errors.newPassword && newPasswordFormik.touched.newPassword && (
              <p className="text-red-500 text-sm mt-1">
                {newPasswordFormik.errors.newPassword}
              </p>
            )}
          </div>

          <div>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm New Password"
              className="form-control w-full"
              value={newPasswordFormik.values.confirmPassword}
              onChange={newPasswordFormik.handleChange}
              onBlur={newPasswordFormik.handleBlur}
            />
            {newPasswordFormik.errors.confirmPassword && newPasswordFormik.touched.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {newPasswordFormik.errors.confirmPassword}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="btn bg-primary-500 hover:bg-primary-700 text-white w-full"
          >
            Reset Password
          </button>
        </form>
      )}
    </div>
  );
}
