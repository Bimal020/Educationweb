import React from 'react';
import { useForm } from 'react-hook-form';
import { IoArrowForwardOutline } from 'react-icons/io5';

function Newsletter() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    alert(`Thank you for subscribing to our newsletter with email: ${data.newsletter_email}`);
    reset();
  };

  return (
    <section className="section newsletter py-[60px] bg-kappel text-white rounded-[10px] my-10 shadow-md max-w-[1185px] mx-auto px-6 md:px-12 flex flex-col lg:flex-row justify-between items-center gap-6">
      <div className="text-center lg:text-left max-w-[500px]">
        <h3 className="font-spartan text-[2.6rem] md:text-[3.2rem] font-bold mb-2">Subscribe to our newsletter</h3>
        <p className="text-[1.5rem] text-white/80 leading-[1.6]">
          Stay updated with the latest courses, video production strategies, and frontend web development techniques.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full lg:max-w-[500px] flex flex-col sm:flex-row gap-3 items-start">
        <div className="w-full flex flex-col gap-1">
          <input
            type="text"
            placeholder="Your email address"
            className="w-full p-4 rounded-[5px] bg-white text-eerie-black-1 text-[1.5rem] focus:outline-none focus:ring-2 focus:ring-radical-red"
            {...register('newsletter_email', {
              required: 'Email is required',
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Invalid email address',
              },
            })}
          />
          {errors.newsletter_email && (
            <span className="text-red-300 text-[1.3rem] mt-1 font-sans">{errors.newsletter_email.message}</span>
          )}
        </div>

        <button type="submit" className="btn bg-eerie-black-2 text-white hover:bg-radical-red flex gap-2 justify-center items-center py-4 w-full sm:w-auto px-6 whitespace-nowrap">
          <span>Subscribe</span>
          <IoArrowForwardOutline className="text-xl" />
        </button>
      </form>
    </section>
  );
}

export default Newsletter;
