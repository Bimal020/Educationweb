import React from 'react';
import { Link } from 'react-router-dom';
import { IoTimeOutline, IoStar, IoLibraryOutline, IoPeopleOutline } from 'react-icons/io5';

function CourseCard({ course, isEnrolled }) {
  const { id, title, image, duration, level, price, rating, reviewsCount, lessons, students } = course;

  return (
    <div className="course-card group relative bg-white rounded-[5px] overflow-hidden shadow-[0_6px_15px_0_rgba(0,0,0,0.05)] border border-platinum/40 flex flex-col h-full">
      {/* Course Banner */}
      <figure className="card-banner aspect-[370/220] bg-light-gray overflow-hidden relative">
        <img
          src={image}
          width="370"
          height="220"
          loading="lazy"
          alt={title}
          className="img-cover w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 group-focus-within:scale-110"
        />
        {isEnrolled && (
          <span className="absolute top-[10px] left-[10px] bg-kappel text-white font-spartan text-[1.2rem] font-bold px-[8px] py-[4px] rounded-[3px] tracking-wide uppercase shadow-sm">
            Enrolled
          </span>
        )}
      </figure>

      {/* Duration Badge */}
      <div className="abs-badge absolute top-[10px] right-[10px] bg-selective-yellow text-white flex items-center gap-[5px] px-[8px] py-[6px] pb-[3px] rounded-[3px] font-spartan text-[1.4rem]">
        <IoTimeOutline className="text-[18px]" aria-hidden="true" />
        <span className="span">{duration}</span>
      </div>

      {/* Content */}
      <div className="card-content p-[25px] flex flex-col flex-grow">
        <span className="badge block bg-kappel-15 text-kappel max-w-max px-[10px] leading-[25px] rounded-[3px] font-spartan text-[1.4rem] font-medium">
          {level}
        </span>

        <h3 className="h3 my-[15px] mb-[8px] flex-grow">
          <Link
            to={`/courses/${id}`}
            className="card-title text-eerie-black-1 hover:text-kappel transition-all line-clamp-2"
          >
            {title}
          </Link>
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
            ({rating.toFixed(1)} /{reviewsCount} Rating)
          </p>
        </div>

        <data className="price block text-radical-red font-spartan text-[1.8rem] font-semibold mb-[15px]">
          ${price.toFixed(2)}
        </data>

        {/* Meta items */}
        <ul className="card-meta-list flex items-center flex-wrap gap-[5px_0px] border-t border-platinum/40 pt-[15px] mt-auto">
          <li className="flex items-center gap-[5px]">
            <IoLibraryOutline className="text-quick-silver text-[18px]" aria-hidden="true" />
            <span className="span text-eerie-black-1 text-[1.3rem] font-medium">{lessons} Lessons</span>
          </li>

          <span className="text-platinum px-[10px]">|</span>

          <li className="flex items-center gap-[5px]">
            <IoPeopleOutline className="text-quick-silver text-[18px]" aria-hidden="true" />
            <span className="span text-eerie-black-1 text-[1.3rem] font-medium">{students} Students</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default CourseCard;
