import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { IoPersonAddOutline } from 'react-icons/io5';

function Register() {
  const { register: authRegister, error, clearError } = useAuth();
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm();
  const [registerError, setRegisterError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    clearError();
  }, [clearError]);

  const passwordValue = watch('password');

  const onSubmit = async (data) => {
    setRegisterError('');
    try {
      await authRegister(data.email, data.password, data.name);
      navigate('/profile');
    } catch (err) {
      setRegisterError(err.message || 'Registration failed.');
    }
  };

  return (
    <section className="min-h-[80vh] flex items-center justify-center py-12 px-4 bg-isabelline/25">
      <div className="w-full max-w-[480px] bg-white border border-platinum/60 rounded-[10px] p-[30px] md:p-[40px] shadow-md text-center">
        
        <h2 className="font-spartan text-[2.8rem] md:text-[3.2rem] font-bold text-eerie-black-1 mb-2">Create Account</h2>
        <p className="text-[1.5rem] text-gray-web mb-6 font-sans">Start your learning journey on EduWeb today.</p>

        {registerError && (
          <div className="mb-5 p-4 bg-red-100 text-red-700 rounded-[5px] text-[1.4rem] font-sans border border-red-200 text-left">
            {registerError}
          </div>
        )}

        {error && (
          <div className="mb-5 p-4 bg-red-100 text-red-700 rounded-[5px] text-[1.4rem] font-sans border border-red-200 text-left">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 text-left">
          {/* Full Name */}
          <div className="flex flex-col gap-1">
            <label className="font-spartan text-[1.4rem] font-semibold text-eerie-black-1">Full Name</label>
            <input
              type="text"
              placeholder="e.g. John Doe"
              className="p-3 rounded-[5px] bg-white border border-platinum/60 focus:outline-none focus:ring-2 focus:ring-kappel text-[1.5rem] font-sans"
              {...register('name', { required: 'Full Name is required' })}
            />
            {errors.name && <span className="text-red-500 text-[1.3rem]">{errors.name.message}</span>}
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="font-spartan text-[1.4rem] font-semibold text-eerie-black-1">Email Address</label>
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
              placeholder="Min 6 characters"
              className="p-3 rounded-[5px] bg-white border border-platinum/60 focus:outline-none focus:ring-2 focus:ring-kappel text-[1.5rem] font-sans"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters long',
                },
              })}
            />
            {errors.password && <span className="text-red-500 text-[1.3rem]">{errors.password.message}</span>}
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col gap-1">
            <label className="font-spartan text-[1.4rem] font-semibold text-eerie-black-1">Confirm Password</label>
            <input
              type="password"
              placeholder="Verify password"
              className="p-3 rounded-[5px] bg-white border border-platinum/60 focus:outline-none focus:ring-2 focus:ring-kappel text-[1.5rem] font-sans"
              {...register('confirmPassword', {
                required: 'Please confirm your password',
                validate: (val) => val === passwordValue || 'Passwords do not match',
              })}
            />
            {errors.confirmPassword && (
              <span className="text-red-500 text-[1.3rem]">{errors.confirmPassword.message}</span>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn has-before w-full justify-center py-4 mt-4 flex gap-2 items-center text-[1.6rem]"
          >
            <span>{isSubmitting ? 'Registering...' : 'Register'}</span>
            <IoPersonAddOutline className="text-2xl" />
          </button>
        </form>

        <p className="text-[1.5rem] text-gray-web mt-6 font-sans">
          Already have an account?{' '}
          <Link to="/login" className="text-kappel font-bold hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </section>
  );
}

export default Register;
