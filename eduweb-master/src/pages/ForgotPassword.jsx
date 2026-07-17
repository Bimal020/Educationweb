import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { IoMailOutline, IoArrowBackOutline } from 'react-icons/io5';

function ForgotPassword() {
  const { forgotPassword, error, clearError } = useAuth();
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();
  const [successMsg, setSuccessMsg] = useState('');
  const [actionError, setActionError] = useState('');

  useEffect(() => {
    clearError();
  }, [clearError]);

  const onSubmit = async (data) => {
    setSuccessMsg('');
    setActionError('');
    try {
      const response = await forgotPassword(data.email);
      setSuccessMsg(response.message || 'Reset password credentials link sent to email!');
      reset();
    } catch (err) {
      setActionError(err.message || 'Failed to request reset password.');
    }
  };

  return (
    <section className="min-h-[80vh] flex items-center justify-center py-12 px-4 bg-isabelline/25">
      <div className="w-full max-w-[450px] bg-white border border-platinum/60 rounded-[10px] p-[30px] md:p-[40px] shadow-md text-center">
        
        <h2 className="font-spartan text-[2.8rem] md:text-[3.2rem] font-bold text-eerie-black-1 mb-2">Forgot Password</h2>
        <p className="text-[1.5rem] text-gray-web mb-6 font-sans">
          Enter your email address and we'll mock send you a link to reset your credentials.
        </p>

        {successMsg && (
          <div className="mb-5 p-4 bg-green-100 text-green-700 rounded-[5px] text-[1.4rem] font-sans border border-green-200 text-left">
            {successMsg}
          </div>
        )}

        {(actionError || error) && (
          <div className="mb-5 p-4 bg-red-100 text-red-700 rounded-[5px] text-[1.4rem] font-sans border border-red-200 text-left">
            {actionError || error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 text-left">
          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="font-spartan text-[1.4rem] font-semibold text-eerie-black-1">Email Coordinates</label>
            <input
              type="text"
              placeholder="e.g. name@example.com"
              className="p-3 rounded-[5px] bg-white border border-platinum/60 focus:outline-none focus:ring-2 focus:ring-kappel text-[1.5rem] font-sans"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Invalid email address',
                },
              })}
            />
            {errors.email && <span className="text-red-500 text-[1.3rem]">{errors.email.message}</span>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn has-before w-full justify-center py-4 mt-4 flex gap-2 items-center text-[1.6rem]"
          >
            <span>{isSubmitting ? 'Requesting Reset...' : 'Send Reset Link'}</span>
            <IoMailOutline className="text-2xl" />
          </button>
        </form>

        <div className="mt-6 flex justify-center">
          <Link to="/login" className="flex items-center gap-2 text-kappel hover:text-radical-red text-[1.5rem] font-bold transition-all">
            <IoArrowBackOutline className="text-xl" />
            <span>Back to Login</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ForgotPassword;
