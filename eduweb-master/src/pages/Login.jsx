import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { IoLogInOutline, IoArrowForwardOutline } from 'react-icons/io5';

function Login() {
  const { login, savedEmail, error, clearError } = useAuth();
  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm();
  const [authError, setAuthError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Clear global context error on mount
  useEffect(() => {
    clearError();
  }, [clearError]);

  // Autofill remember me email if present
  useEffect(() => {
    if (savedEmail) {
      setValue('email', savedEmail);
      setValue('rememberMe', true);
    }
  }, [savedEmail, setValue]);

  // Determine redirect page after login
  const from = location.state?.from?.pathname || '/profile';

  const onSubmit = async (data) => {
    setAuthError('');
    try {
      await login(data.email, data.password, data.rememberMe);
      navigate(from, { replace: true });
    } catch (err) {
      setAuthError(err.message || 'Login failed, please check credentials.');
    }
  };

  return (
    <section className="min-h-[80vh] flex items-center justify-center py-12 px-4 bg-isabelline/25">
      <div className="w-full max-w-[450px] bg-white border border-platinum/60 rounded-[10px] p-[30px] md:p-[40px] shadow-md text-center">
        
        <h2 className="font-spartan text-[2.8rem] md:text-[3.2rem] font-bold text-eerie-black-1 mb-2">Welcome Back</h2>
        <p className="text-[1.5rem] text-gray-web mb-6 font-sans">Login to access your educational dashboard.</p>

        {authError && (
          <div className="mb-5 p-4 bg-red-100 text-red-700 rounded-[5px] text-[1.4rem] font-sans border border-red-200 text-left">
            {authError}
          </div>
        )}

        {error && (
          <div className="mb-5 p-4 bg-red-100 text-red-700 rounded-[5px] text-[1.4rem] font-sans border border-red-200 text-left">
            {error}
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

          {/* Password */}
          <div className="flex flex-col gap-1">
            <label className="font-spartan text-[1.4rem] font-semibold text-eerie-black-1">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              className="p-3 rounded-[5px] bg-white border border-platinum/60 focus:outline-none focus:ring-2 focus:ring-kappel text-[1.5rem] font-sans"
              {...register('password', { required: 'Password is required' })}
            />
            {errors.password && <span className="text-red-500 text-[1.3rem]">{errors.password.message}</span>}
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex justify-between items-center text-[1.4rem] font-sans mt-1">
            <label className="flex items-center gap-2 text-eerie-black-1 font-medium cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 text-kappel focus:ring-kappel border-platinum/60 rounded"
                {...register('rememberMe')}
              />
              Remember Me
            </label>
            <Link to="/forgot-password" className="text-kappel hover:underline font-semibold">
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn has-before w-full justify-center py-4 mt-4 flex gap-2 items-center text-[1.6rem]"
          >
            <span>{isSubmitting ? 'Logging in...' : 'Login'}</span>
            <IoLogInOutline className="text-2xl" />
          </button>
        </form>

        <p className="text-[1.5rem] text-gray-web mt-6 font-sans">
          Don't have an account?{' '}
          <Link to="/register" className="text-kappel font-bold hover:underline">
            Register for free
          </Link>
        </p>
      </div>
    </section>
  );
}

export default Login;
