import React, { useState } from 'react';
import { testimonials } from '../data/mockData';
import { IoStar, IoChevronBack, IoChevronForward } from 'react-icons/io5';

function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const current = testimonials[activeIndex];

  return (
    <section className="section testimonials py-[75px] xl:py-[120px] bg-white border-t border-platinum/30" aria-label="testimonials">
      <div className="container max-w-[800px] mx-auto text-center px-4 relative">
        <p className="section-subtitle text-radical-red">Testimonials</p>
        <h2 className="h2 section-title mb-[40px]">What Our Students Say</h2>

        <div className="relative bg-isabelline/40 p-[30px] md:p-[50px] rounded-[10px] border border-platinum/40 shadow-sm transition-all duration-300 min-h-[300px] flex flex-col justify-center items-center">
          {/* Avatar */}
          <div className="w-[80px] h-[80px] rounded-full overflow-hidden mb-[20px] border-2 border-kappel shadow-md">
            <img src={current.avatar} alt={current.name} className="w-full h-full object-cover" />
          </div>

          {/* Rating */}
          <div className="flex items-center gap-[3px] mb-[15px] justify-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <IoStar
                key={i}
                className={`text-[18px] ${
                  i < current.rating ? 'text-selective-yellow' : 'text-light-gray'
                }`}
              />
            ))}
          </div>

          {/* Content */}
          <p className="text-[1.6rem] text-eerie-black-1 italic leading-[1.8] mb-[25px] max-w-[600px] font-sans">
            "{current.content}"
          </p>

          {/* Author */}
          <h4 className="font-spartan text-[1.8rem] font-bold text-eerie-black-1">{current.name}</h4>
          <p className="text-[1.4rem] text-kappel uppercase font-medium mt-1 tracking-wider">{current.role}</p>

          {/* Navigation Controls */}
          <button
            onClick={handlePrev}
            className="absolute left-2 md:-left-6 top-1/2 -translate-y-1/2 bg-white text-eerie-black-1 p-3 rounded-full shadow-md hover:bg-kappel hover:text-white transition-all z-10 border border-platinum/40"
            aria-label="Previous testimonial"
          >
            <IoChevronBack className="text-xl" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-2 md:-right-6 top-1/2 -translate-y-1/2 bg-white text-eerie-black-1 p-3 rounded-full shadow-md hover:bg-kappel hover:text-white transition-all z-10 border border-platinum/40"
            aria-label="Next testimonial"
          >
            <IoChevronForward className="text-xl" />
          </button>
        </div>

        {/* Index Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`h-2.5 rounded-full transition-all ${
                i === activeIndex ? 'w-8 bg-kappel' : 'w-2.5 bg-light-gray'
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
