import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import logoLight from '../assets/images/logo-light.svg';
import footerBg from '../assets/images/footer-bg.png';
import {
  IoArrowForwardOutline,
  IoLogoFacebook,
  IoLogoLinkedin,
  IoLogoInstagram,
  IoLogoTwitter,
  IoLogoYoutube,
} from 'react-icons/io5';

function Footer() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    alert(`Thank you for subscribing to our newsletter with email: ${data.email_address}`);
    reset();
  };

  return (
    <footer
      className="footer bg-eerie-black-2 text-gray-x-11 text-[1.5rem] bg-no-repeat bg-cover bg-center"
      style={{ backgroundImage: `url(${footerBg})` }}
    >
      <div className="footer-top section py-[75px] xl:py-[120px] grid gap-[30px] md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-[1fr_0.6fr_0.6fr_1.2fr]">
        <div className="container grid gap-[30px] md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-[1fr_0.6fr_0.6fr_1.2fr] col-span-full">
          {/* Brand Info */}
          <div className="footer-brand md:col-span-2 lg:col-span-1 xl:col-span-1">
            <Link to="/" className="logo mb-4 block">
              <img src={logoLight} width="162" height="50" alt="EduWeb logo" />
            </Link>

            <p className="footer-brand-text mb-[20px] leading-[1.6]">
              We deliver quality services with professionalism and care. Our goal is to provide reliable solutions and ensure customer satisfaction through continuous improvement."
            </p>

            <div className="wrapper flex gap-[5px] mb-2">
              <span className="span font-medium text-white">Add:</span>
              <address className="address not-italic">60-40 Beltar Udayapur Nepal</address>
            </div>

            <div className="wrapper flex gap-[5px] mb-2">
              <span className="span font-medium text-white">Call:</span>
              <a href="tel:025-234129" className="footer-link hover:text-kappel transition-all">
                025-234129
              </a>
            </div>

            <div className="wrapper flex gap-[5px] mb-2">
              <span className="span font-medium text-white">Email:</span>
              <a href="mailto:infobeltar@eduweb.com" className="footer-link hover:text-kappel transition-all">
                infobeltar@eduweb.com
              </a>
            </div>
          </div>

          {/* Platform Links */}
          <ul className="footer-list">
            <li>
              <p className="footer-list-title text-white font-spartan text-[2.3rem] font-semibold mb-[10px]">
                Online Platform
              </p>
            </li>
            <li>
              <Link to="/about" className="footer-link block py-[5px] hover:text-kappel transition-all">About</Link>
            </li>
            <li>
              <Link to="/courses" className="footer-link block py-[5px] hover:text-kappel transition-all">Courses</Link>
            </li>
            <li>
              <Link to="/about" className="footer-link block py-[5px] hover:text-kappel transition-all">Instructor</Link>
            </li>
            <li>
              <Link to="/" className="footer-link block py-[5px] hover:text-kappel transition-all">Events</Link>
            </li>
            <li>
              <Link to="/profile" className="footer-link block py-[5px] hover:text-kappel transition-all">Instructor Profile</Link>
            </li>
            <li>
              <Link to="/" className="footer-link block py-[5px] hover:text-kappel transition-all">Purchase Guide</Link>
            </li>
          </ul>

          {/* Essential Links */}
          <ul className="footer-list">
            <li>
              <p className="footer-list-title text-white font-spartan text-[2.3rem] font-semibold mb-[10px]">
                Links
              </p>
            </li>
            <li>
              <Link to="/contact" className="footer-link block py-[5px] hover:text-kappel transition-all">Contact Us</Link>
            </li>
            <li>
              <Link to="/courses" className="footer-link block py-[5px] hover:text-kappel transition-all">Gallery</Link>
            </li>
            <li>
              <Link to="/blog" className="footer-link block py-[5px] hover:text-kappel transition-all">News & Articles</Link>
            </li>
            <li>
              <Link to="/about" className="footer-link block py-[5px] hover:text-kappel transition-all">FAQ's</Link>
            </li>
            <li>
              <Link to="/login" className="footer-link block py-[5px] hover:text-kappel transition-all">Sign In/Registration</Link>
            </li>
            <li>
              <Link to="/" className="footer-link block py-[5px] hover:text-kappel transition-all">Coming Soon</Link>
            </li>
          </ul>

          {/* Contact & Newsletter */}
          <div className="footer-list md:col-span-2 lg:col-span-1 xl:col-span-1">
            <p className="footer-list-title text-white font-spartan text-[2.3rem] font-semibold mb-[10px]">
              Contacts
            </p>

            <p className="footer-list-text mb-[20px] leading-[1.6]">
              Enter your email address to register to our newsletter subscription
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="newsletter-form my-[20px] mb-[35px] sm:flex sm:items-start sm:gap-[10px]">
              <div className="w-full flex flex-col gap-1">
                <input
                  type="text"
                  placeholder="Your email"
                  className="input-field block w-full bg-white text-eerie-black-1 p-[12px] rounded-[5px] focus:outline-none focus:ring-2 focus:ring-kappel"
                  {...register('email_address', {
                    required: 'Email is required',
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: 'Invalid email address',
                    },
                  })}
                />
                {errors.email_address && (
                  <span className="text-red-500 text-[1.2rem] mt-1 font-sans">{errors.email_address.message}</span>
                )}
              </div>

              <button type="submit" className="btn has-before min-w-full sm:min-w-max justify-center sm:py-[10px] whitespace-nowrap">
                <span className="span">Subscribe</span>
                <IoArrowForwardOutline aria-hidden="true" />
              </button>
            </form>

            {/* Social List */}
            <ul className="social-list flex gap-[25px]">
              <li>
                <a href="#" className="social-link text-[20px] hover:text-kappel transition-all" aria-label="Facebook">
                  <IoLogoFacebook />
                </a>
              </li>
              <li>
                <a href="#" className="social-link text-[20px] hover:text-kappel transition-all" aria-label="LinkedIn">
                  <IoLogoLinkedin />
                </a>
              </li>
              <li>
                <a href="#" className="social-link text-[20px] hover:text-kappel transition-all" aria-label="Instagram">
                  <IoLogoInstagram />
                </a>
              </li>
              <li>
                <a href="#" className="social-link text-[20px] hover:text-kappel transition-all" aria-label="Twitter">
                  <IoLogoTwitter />
                </a>
              </li>
              <li>
                <a href="#" className="social-link text-[20px] hover:text-kappel transition-all" aria-label="YouTube">
                  <IoLogoYoutube />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer Bottom copyright */}
      <div className="footer-bottom border-t border-eerie-black-1 py-[30px]">
        <div className="container">
          <p className="copyright text-center">
            Copyright 2026 All Rights Reserved by{' '}
            <a href="#" className="copyright-link inline-block text-kappel hover:underline">
              code with bimal and pragyan
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
