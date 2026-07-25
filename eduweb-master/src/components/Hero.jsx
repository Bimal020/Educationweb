import React from 'react';
import heroBg from '../assets/images/hero-bg.svg';
import heroBanner1 from '../assets/images/hero-banner-1.jpg';
import heroBanner2 from '../assets/images/hero-banner-2.jpg';
import heroShape1 from '../assets/images/hero-shape-1.svg';
import heroShape2 from '../assets/images/hero-shape-2.png';
import { IoArrowForwardOutline } from 'react-icons/io5';

function Hero() {
  return (
    <section
      className="section hero pt-[calc(75px+80px)] md:pt-[calc(75px+90px)] xl:pt-[calc(120px+120px)] bg-cover bg-no-repeat bg-center"
      id="home"
      aria-label="home"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      <div className="container grid gap-[40px] xl:grid-cols-2 xl:items-center xl:gap-[80px]">
        <div className="hero-content">
          <h1 className="h1 section-title text-left mb-[18px]">
            The Best Program to <span className="span">Enroll</span> for Exchange
          </h1>

          <p className="hero-text text-[1.8rem] text-eerie-black-1 text-center md:text-left mb-[20px] md:mb-[30px] leading-[1.75]">
            Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit.
          </p>

          <a href="#" className="btn has-before mx-auto md:mx-0">
            <span className="span">Find courses</span>
            <IoArrowForwardOutline aria-hidden="true" />
          </a>
        </div>

        <figure className="hero-banner grid grid-cols-[1fr_0.8fr] md:grid-cols-[1fr_0.9fr] items-start gap-[30px] relative z-10">
          <div className="img-holder one aspect-[270/300] bg-light-gray overflow-hidden rounded-tr-[70px] rounded-bl-[110px] md:justify-self-end">
            <img
              src={heroBanner1}
              width="270"
              height="300"
              alt="hero banner"
              className="img-cover w-full h-full object-cover"
            />
          </div>

          <div className="img-holder two aspect-[240/370] bg-light-gray overflow-hidden rounded-tl-[50px] rounded-br-[90px] md:mt-[100px]">
            <img
              src={heroBanner2}
              width="240"
              height="370"
              alt="hero banner"
              className="img-cover w-full h-full object-cover"
            />
          </div>

          {/* Decorative shapes */}
          <img
            src={heroShape1}
            width="380"
            height="190"
            alt=""
            className="hidden md:block absolute bottom-[-40px] left-[-10px]"
          />

          <img
            src={heroShape2}
            width="622"
            height="551"
            alt=""
            className="hidden xl:block absolute top-[-80px] right-[-20px] -z-10"
          />
        </figure>
      </div>
    </section>
  );
}

export default Hero;
