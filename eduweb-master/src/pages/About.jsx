import React from 'react';
import AboutComponent from '../components/About.jsx';
import Testimonials from '../components/Testimonials.jsx';
import FAQ from '../components/FAQ.jsx';
import { teachers } from '../data/mockData';

function About() {
  return (
    <>
      {/* About Header */}
      <section className="bg-isabelline py-12 border-b border-platinum/40 text-center">
        <div className="container">
          <h1 className="h1 section-title">About Our Academy</h1>
          <p className="section-text text-gray-web max-w-2xl mx-auto mt-2">
            Over a decade of excellence in delivering premium education, online courses, and digital skill developments.
          </p>
        </div>
      </section>

      {/* Main Core About layout */}
      <AboutComponent />

      {/* Meet the Trainers team */}
      <section className="section teachers py-[75px] xl:py-[120px] bg-white border-t border-platinum/20" aria-label="teachers">
        <div className="container">
          <p className="section-subtitle text-radical-red">Our Experts</p>
          <h2 className="h2 section-title mb-[40px]">Meet Our Dedicated Instructors</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px]">
            {teachers.map((teacher) => (
              <div key={teacher.id} className="bg-isabelline/35 border border-platinum/40 rounded-[10px] p-6 text-center hover:shadow-md transition-all">
                <div className="w-[120px] h-[120px] rounded-full overflow-hidden mx-auto mb-4 border-2 border-kappel shadow-sm">
                  <img src={teacher.avatar} alt={teacher.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="font-spartan text-[2rem] font-bold text-eerie-black-1">{teacher.name}</h3>
                <p className="text-[1.4rem] text-kappel uppercase font-semibold mt-1 mb-3 tracking-wider">{teacher.role}</p>
                <p className="text-[1.4rem] text-gray-web leading-[1.6] px-2 font-sans">{teacher.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Embedded Testimonials */}
      <Testimonials />

      {/* Interactive FAQs Accordion */}
      <FAQ />
    </>
  );
}

export default About;
