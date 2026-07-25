import React from 'react';
import category1 from '../assets/images/category-1.svg';
import category2 from '../assets/images/category-2.svg';
import category3 from '../assets/images/category-3.svg';
import category4 from '../assets/images/category-4.svg';

const categoriesData = [
  {
    id: 1,
    icon: category1,
    title: 'Online Degree Programs',
    text: '"Take the next step toward your career with an online degree."',
    courses: '7 Courses',
    color: '170, 75%, 41%', // hsl value parts
  },
  {
    id: 2,
    icon: category2,
    title: 'Non-Degree Programs',
    text: '"Build practical skills. Learn at your own pace. Advance your future."',
    courses: '4 Courses',
    color: '351, 83%, 61%',
  },
  {
    id: 3,
    icon: category3,
    title: 'Off-Campus Programs',
    text: 'Balance your studies, career, and life with flexible off campus learning.',
    courses: '8 Courses',
    color: '229, 75%, 58%',
  },
  {
    id: 4,
    icon: category4,
    title: 'Hybrid Distance Programs',
    text: 'Experience the perfect blend of online flexibility and in person learning.',
    courses: '8 Courses',
    color: '42, 94%, 55%',
  },
];

function Categories() {
  return (
    <section className="section category py-[75px] xl:py-[120px]" aria-label="category">
      <div className="container">
        <p className="section-subtitle text-radical-red">Categories</p>

        <h2 className="h2 section-title mb-[15px]">
          Online <span className="span">Classes</span> For Remote Learning.
        </h2>

        <p className="section-text text-gray-web mb-[40px]">
          Consectetur adipiscing elit sed do eiusmod tempor.
        </p>

        <ul className="grid-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[30px]">
          {categoriesData.map((item) => (
            <li key={item.id}>
              <div
                className="category-card p-[50px_30px] text-center rounded-[5px] transition-all"
                style={{ backgroundColor: `hsla(${item.color}, 0.1)` }}
              >
                <div
                  className="card-icon w-[80px] h-[80px] grid place-items-center rounded-full mx-auto mb-[30px]"
                  style={{ backgroundColor: `hsla(${item.color}, 0.1)` }}
                >
                  <img
                    src={item.icon}
                    width="40"
                    height="40"
                    loading="lazy"
                    alt={item.title}
                    className="block"
                  />
                </div>

                <h3 className="h3 mb-[15px]">
                  <a href="#" className="card-title text-eerie-black-1 hover:text-kappel transition-all">
                    {item.title}
                  </a>
                </h3>

                <p className="card-text text-eerie-black-1 text-[1.5rem] my-[15px] mb-[25px]">
                  {item.text}
                </p>

                <span
                  className="card-badge block text-[1.5rem] font-medium px-[18px] py-[2px] max-w-max mx-auto rounded-[5px]"
                  style={{
                    backgroundColor: `hsla(${item.color}, 0.1)`,
                    color: `hsl(${item.color})`,
                  }}
                >
                  {item.courses}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Categories;
