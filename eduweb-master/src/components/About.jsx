import React from 'react';
import aboutBanner from '../assets/images/about-banner.jpg';
import aboutShape1 from '../assets/images/about-shape-1.svg';
import aboutShape2 from '../assets/images/about-shape-2.svg';
import aboutShape3 from '../assets/images/about-shape-3.png';
import aboutShape4 from '../assets/images/about-shape-4.svg';
import { IoCheckmarkDoneOutline } from 'react-icons/io5';

function About() {
  return (
    <section className="section about py-[75px] xl:py-[120px] overflow-hidden" id="about" aria-label="about">
      <div className="container grid gap-[30px] lg:grid-cols-[1fr_0.6fr] lg:items-center lg:gap-[60px] xl:gap-[110px]">
        {/* Banner Area */}
        <figure className="about-banner relative z-10 md:p-[60px] md:pr-0">
          <div className="img-holder aspect-[520/370] bg-light-gray overflow-hidden rounded-[10px] md:max-w-max md:mx-auto xl:mx-0">
            <img
              src={aboutBanner}
              width="520"
              height="370"
              loading="lazy"
              alt="about banner"
              className="img-cover w-full h-full object-cover"
            />
          </div>

          {/* Decorative Shapes */}
          <img
            src={aboutShape1}
            width="360"
            height="420"
            loading="lazy"
            alt=""
            className="hidden md:block absolute top-[-40px] right-[-70px] -z-10"
          />

          <img
            src={aboutShape2}
            width="371"
            height="220"
            loading="lazy"
            alt=""
            className="absolute bottom-[-100px] left-[-60px] animate-bounce-slow"
          />

          <img
            src={aboutShape3}
            width="722"
            height="528"
            loading="lazy"
            alt=""
            className="hidden xl:block absolute top-[-20px] left-[-100px] -z-10"
          />
        </figure>

        {/* Content Area */}
        <div className="about-content relative z-10">
          <p className="section-subtitle text-radical-red text-left">About Us</p>

          <h2 className="h2 section-title text-left mb-[15px]">
            Over 10 Years in <span className="span">Distant learning</span> for Skill Development
          </h2>

          <p className="section-text text-gray-web text-left mb-[25px]">
            "Achieve your academic and career goals through flexible, high quality education designed to fit your schedule and lifestyle."
          </p>

          <ul className="about-list">
            <li className="about-item my-[15px] flex items-center gap-[15px]">
              <IoCheckmarkDoneOutline className="text-selective-yellow text-[24px] stroke-[15px]" aria-hidden="true" />
              <span className="span text-eerie-black-1 font-spartan font-medium text-[1.6rem]">Expert Trainers</span>
            </li>

            <li className="about-item my-[15px] flex items-center gap-[15px]">
              <IoCheckmarkDoneOutline className="text-selective-yellow text-[24px] stroke-[15px]" aria-hidden="true" />
              <span className="span text-eerie-black-1 font-spartan font-medium text-[1.6rem]">Online Remote Learning</span>
            </li>

            <li className="about-item my-[15px] flex items-center gap-[15px]">
              <IoCheckmarkDoneOutline className="text-selective-yellow text-[24px] stroke-[15px]" aria-hidden="true" />
              <span className="span text-eerie-black-1 font-spartan font-medium text-[1.6rem]">Lifetime Access</span>
            </li>
          </ul>

          <img
            src={aboutShape4}
            width="100"
            height="100"
            loading="lazy"
            alt=""
            className="hidden xl:block absolute top-[30px] right-[-60px] -z-10"
          />
        </div>
      </div>
    </section>
  );
}

export default About;
