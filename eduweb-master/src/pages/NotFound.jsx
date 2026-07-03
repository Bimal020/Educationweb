import React from 'react';
import { Link } from 'react-router-dom';
import { IoHomeOutline } from 'react-icons/io5';

function NotFound() {
  return (
    <section className="min-h-[70vh] flex flex-col justify-center items-center py-12 px-4 text-center">
      <div className="container max-w-md mx-auto flex flex-col items-center">
        <h1 className="font-spartan text-[8rem] md:text-[12rem] font-extrabold text-radical-red leading-[1]">404</h1>
        <h2 className="font-spartan text-[2.4rem] md:text-[3.2rem] font-bold text-eerie-black-1 mt-4 mb-2">
          Page Not Found
        </h2>
        <p className="text-[1.6rem] text-gray-web leading-[1.7] mb-8 font-sans">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link to="/" className="btn has-before flex items-center gap-2">
          <IoHomeOutline className="text-xl" />
          <span>Back to Homepage</span>
        </Link>
      </div>
    </section>
  );
}

export default NotFound;
