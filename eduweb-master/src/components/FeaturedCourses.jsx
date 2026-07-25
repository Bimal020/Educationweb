import React from 'react';
import { Link } from 'react-router-dom';
import { useCourses } from '../context/CourseContext';
import CourseCard from './CourseCard';
import { IoArrowForwardOutline } from 'react-icons/io5';

function FeaturedCourses() {
  const { courses, enrolledCourses } = useCourses();

  // Show only featured courses, limit to 3 for Home page display
  const featured = courses.filter((c) => c.isFeatured).slice(0, 3);

  return (
    <section className="section course py-[75px] xl:py-[120px] bg-isabelline" id="courses" aria-label="course">
      <div className="container">
        <p className="section-subtitle text-radical-red">Popular Courses</p>

        <h2 className="h2 section-title mb-[40px]">Pick A Course To Get Started</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px]">
          {featured.map((course) => {
            const isEnrolled = enrolledCourses.some((e) => e.id === course.id);
            return (
              <CourseCard key={course.id} course={course} isEnrolled={isEnrolled} />
            );
          })}
        </div>

        <Link to="/courses" className="btn has-before mx-auto mt-[60px]">
          <span className="span">Browse more courses</span>
          <IoArrowForwardOutline aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}

export default FeaturedCourses;
