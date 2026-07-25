import React from 'react';
import course1 from '../assets/images/course-1.jpg';
import course2 from '../assets/images/course-2.jpg';
import course3 from '../assets/images/course-3.jpg';
import { IoTimeOutline, IoStar, IoLibraryOutline, IoPeopleOutline, IoArrowForwardOutline } from 'react-icons/io5';

const coursesData = [
  {
    id: 1,
    image: course1,
    duration: '3 Weeks',
    badge: 'Beginner',
    title: 'Build Responsive Real- World Websites with HTML and CSS',
    rating: 5.0,
    reviewsCount: 7,
    price: '2900.00',
    lessons: '8 Lessons',
    students: '20 Students',
  },
  {
    id: 2,
    image: course2,
    duration: '8 Weeks',
    badge: 'Advanced',
    title: 'Java Programming Masterclass for Software Developers',
    rating: 4.5,
    reviewsCount: 9,
    price: '3000.00',
    lessons: '15 Lessons',
    students: '35 Students',
  },
  {
    id: 3,
    image: course3,
    duration: '3 Weeks',
    badge: 'Intermediate',
    title: 'The Complete  Course for Content Creators',
    rating: 4.9,
    reviewsCount: 7,
    price: '3500.00',
    lessons: '13 Lessons',
    students: '18 Students',
  },
];

function Courses() {
  return (
    <section className="section course py-[75px] xl:py-[120px] bg-isabelline" id="courses" aria-label="course">
      <div className="container">
        <p className="section-subtitle text-radical-red">Popular Courses</p>

        <h2 className="h2 section-title mb-[40px]">Pick A Course To Get Started</h2>

        <ul className="grid-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px]">
          {coursesData.map((course) => (
            <li key={course.id}>
              <div className="course-card group relative bg-white rounded-[5px] overflow-hidden shadow-[0_6px_15px_0_rgba(0,0,0,0.05)]">
                {/* Course Banner */}
                <figure className="card-banner aspect-[370/220] bg-light-gray overflow-hidden">
                  <img
                    src={course.image}
                    width="370"
                    height="220"
                    loading="lazy"
                    alt={course.title}
                    className="img-cover w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 group-focus-within:scale-110"
                  />
                </figure>

                {/* Duration Badge */}
                <div className="abs-badge absolute top-[10px] right-[10px] bg-selective-yellow text-white flex items-center gap-[5px] px-[8px] py-[6px] pb-[3px] rounded-[3px] font-spartan text-[1.4rem]">
                  <IoTimeOutline className="text-[18px]" aria-hidden="true" />
                  <span className="span">{course.duration}</span>
                </div>

                {/* Content */}
                <div className="card-content p-[25px]">
                  <span className="badge block bg-kappel-15 text-kappel max-w-max px-[10px] leading-[25px] rounded-[3px] font-spartan text-[1.4rem] font-medium">
                    {course.badge}
                  </span>

                  <h3 className="h3 my-[15px] mb-[8px]">
                    <a
                      href="#"
                      className="card-title text-eerie-black-1 hover:text-kappel transition-all line-clamp-2"
                    >
                      {course.title}
                    </a>
                  </h3>

                  {/* Rating */}
                  <div className="wrapper flex items-center gap-[10px] mb-[8px]">
                    <div className="rating-wrapper flex items-center gap-[3px]">
                      <IoStar className="text-selective-yellow text-[16px]" />
                      <IoStar className="text-selective-yellow text-[16px]" />
                      <IoStar className="text-selective-yellow text-[16px]" />
                      <IoStar className="text-selective-yellow text-[16px]" />
                      <IoStar className="text-selective-yellow text-[16px]" />
                    </div>

                    <p className="rating-text text-eerie-black-1 text-[1.4rem] font-medium">
                      ({course.rating.toFixed(1)} /{course.reviewsCount} Rating)
                    </p>
                  </div>

                  <data className="price block text-radical-red font-spartan text-[1.8rem] font-semibold mb-[15px]">
                    {course.price}
                  </data>

                  {/* Meta items */}
                  <ul className="card-meta-list flex items-center flex-wrap gap-[5px_0px]">
                    <li className="flex items-center gap-[5px]">
                      <IoLibraryOutline className="text-quick-silver text-[18px]" aria-hidden="true" />
                      <span className="span text-eerie-black-1 text-[1.3rem] font-medium">{course.lessons}</span>
                    </li>

                    <span className="text-platinum px-[10px]">|</span>

                    <li className="flex items-center gap-[5px]">
                      <IoPeopleOutline className="text-quick-silver text-[18px]" aria-hidden="true" />
                      <span className="span text-eerie-black-1 text-[1.3rem] font-medium">{course.students}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <a href="#" className="btn has-before mx-auto mt-[60px]">
          <span className="span">Browse more courses</span>
          <IoArrowForwardOutline aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}

export default Courses;
