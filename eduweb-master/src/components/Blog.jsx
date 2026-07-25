import React from 'react';
import blogBg from '../assets/images/blog-bg.svg';
import blog1 from '../assets/images/blog-1.jpg';
import blog2 from '../assets/images/blog-2.jpg';
import blog3 from '../assets/images/blog-3.jpg';
import blogShape from '../assets/images/blog-shape.png';
import { IoArrowForwardOutline, IoCalendarOutline, IoChatbubblesOutline } from 'react-icons/io5';

const blogsData = [
  {
    id: 1,
    image: blog1,
    category: 'Online',
    title: 'Become A Better Blogger: Content Planning',
    date: 'june 11, 2026',
    comments: 'Com 09',
    text: 'Join a supportive learning community and gain the skills needed to grow with confidence',
  },
  {
    id: 2,
    image: blog2,
    category: 'Online',
    title: 'Become A Better Blogger: Content Planning',
    date: 'june 11, 2026',
    comments: 'Com 09',
    text: 'Learn from experienced instructors with practical courses that prepare you for real world success',
  },
  {
    id: 3,
    image: blog3,
    category: 'Online',
    title: 'Become A Better Blogger: Content Planning',
    date: 'june 10, 2026',
    comments: 'Com 09',
    text: 'Expand your knowledge through flexible programs designed to match your academic and career goals',
  },
];

function Blog() {
  return (
    <section
      className="section blog py-[75px] xl:py-[120px] bg-cover bg-no-repeat bg-center relative z-10"
      id="blog"
      aria-label="blog"
      style={{ backgroundImage: `url(${blogBg})` }}
    >
      <div className="container relative">
        <p className="section-subtitle text-radical-red">Latest Articles</p>

        <h2 className="h2 section-title mb-[40px]">Get News With Eduweb</h2>

        <ul className="grid-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px] gap-y-[60px]">
          {blogsData.map((blog) => (
            <li key={blog.id}>
              <div className="blog-card group relative">
                {/* Banner wrapper */}
                <figure className="card-banner relative rounded-[10px] overflow-hidden aspect-[370/370] bg-light-gray">
                  <img
                    src={blog.image}
                    width="370"
                    height="370"
                    loading="lazy"
                    alt={blog.title}
                    className="img-cover w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Black overlay on hover */}
                  <div className="absolute inset-0 bg-black-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </figure>

                {/* Card Content block */}
                <div className="card-content relative mx-[15px] bg-white p-[20px] rounded-[10px] shadow-[0_10px_50px_0_rgba(33,43,56,0.1)] -mt-[100px] z-[2]">
                  {/* Arrow Action Button */}
                  <a
                    href="#"
                    className="card-btn absolute -top-[40px] right-[30px] bg-kappel text-white text-[20px] p-[20px] rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:translate-y-[10px] hover:bg-radical-red focus:opacity-100 focus:translate-y-[10px] z-10"
                    aria-label="read more"
                  >
                    <IoArrowForwardOutline aria-hidden="true" />
                  </a>

                  <a href="#" className="card-subtitle block uppercase text-kappel font-medium text-[1.5rem] tracking-[0.5px]">
                    {blog.category}
                  </a>

                  <h3 className="h3 my-[10px] mb-[15px]">
                    <a href="#" className="card-title text-eerie-black-1 hover:text-kappel transition-all line-clamp-2">
                      {blog.title}
                    </a>
                  </h3>

                  {/* Metadata */}
                  <ul className="card-meta-list flex flex-wrap gap-[10px_20px] mb-[20px]">
                    <li className="card-meta-item flex items-center gap-[10px] text-eerie-black-1 text-[1.5rem]">
                      <IoCalendarOutline className="text-kappel text-[18px]" aria-hidden="true" />
                      <span className="span">{blog.date}</span>
                    </li>

                    <li className="card-meta-item flex items-center gap-[10px] text-eerie-black-1 text-[1.5rem]">
                      <IoChatbubblesOutline className="text-kappel text-[18px]" aria-hidden="true" />
                      <span className="span">{blog.comments}</span>
                    </li>
                  </ul>

                  <p className="card-text text-gray-web text-[1.5rem] leading-[1.6]">
                    {blog.text}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {/* Absolute Background Shape */}
        <img
          src={blogShape}
          width="186"
          height="186"
          loading="lazy"
          alt=""
          className="hidden xl:block absolute top-0 left-0 -z-10"
        />
      </div>
    </section>
  );
}

export default Blog;
