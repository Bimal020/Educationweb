import React from 'react';
import Hero from '../components/Hero.jsx';
import Categories from '../components/Categories.jsx';
import About from '../components/About.jsx';
import FeaturedCourses from '../components/FeaturedCourses.jsx';
import Video from '../components/Video.jsx';
import Blog from '../components/Blog.jsx';
import Testimonials from '../components/Testimonials.jsx';
import FAQ from '../components/FAQ.jsx';

const statsData = [
  {
    id: 1,
    title: '29.3k',
    text: 'Student Enrolled',
    color: '170, 75%, 41%', // hsl format
  },
  {
    id: 2,
    title: '32.4K',
    text: 'Class Completed',
    color: '351, 83%, 61%',
  },
  {
    id: 3,
    title: '100%',
    text: 'Satisfaction Rate',
    color: '260, 100%, 67%',
  },
  {
    id: 4,
    title: '354+',
    text: 'Top Instructors',
    color: '42, 94%, 55%',
  },
];

function Home() {
  return (
    <>
      {/* Hero Banner Area */}
      <Hero />

      {/* Course Categories directory */}
      <Categories />

      {/* About Us teaser */}
      <About />

      {/* Popular/Featured Courses list */}
      <FeaturedCourses />

      {/* Video demonstration preview */}
      <Video />

      {/* Local Statistics Grid */}
      <section className="section stats py-[75px] xl:py-[120px] bg-white" aria-label="stats">
        <div className="container">
          <ul className="grid-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[30px]">
            {statsData.map((stat) => (
              <li key={stat.id}>
                <div
                  className="stats-card text-center p-[25px] rounded-[10px] transition-all"
                  style={{ backgroundColor: `hsla(${stat.color}, 0.1)` }}
                >
                  <h3
                    className="card-title font-spartan text-[3.2rem] md:text-[3.8rem] lg:text-[4.5rem] font-semibold leading-[1.1] mb-[5px]"
                    style={{ color: `hsl(${stat.color})` }}
                  >
                    {stat.title}
                  </h3>
                  <p className="card-text font-spartan text-eerie-black-1 uppercase tracking-wider font-semibold text-[1.4rem]">
                    {stat.text}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Latest Articles list */}
      <Blog />

      {/* Testimonials section */}
      <Testimonials />

      {/* FAQ accordions */}
      <FAQ />
    </>
  );
}

export default Home;
