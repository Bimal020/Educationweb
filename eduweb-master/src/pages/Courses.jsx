import React, { useState, useMemo } from 'react';
import { useCourses } from '../context/CourseContext';
import CourseCard from '../components/CourseCard';
import Pagination from '../components/Pagination';
import { IoFunnelOutline, IoCloseOutline } from 'react-icons/io5';

function Courses() {
  const { courses, categories, enrolledCourses } = useCourses();
  
  // States for filter and sort criteria
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [maxPrice, setMaxPrice] = useState(100);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('popular');
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const coursesPerPage = 4;

  // Filter and sort computation using useMemo
  const processedCourses = useMemo(() => {
    let result = [...courses];

    // Category filter
    if (selectedCategory !== 'all') {
      result = result.filter((c) => c.categoryId === selectedCategory);
    }

    // Level filter
    if (selectedLevel !== 'all') {
      result = result.filter((c) => c.level.toLowerCase() === selectedLevel.toLowerCase());
    }

    // Price filter
    result = result.filter((c) => c.price <= maxPrice);

    // Rating filter
    result = result.filter((c) => c.rating >= minRating);

    // Sorting logic
    if (sortBy === 'popular') {
      result.sort((a, b) => b.students - a.students);
    } else if (sortBy === 'newest') {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [courses, selectedCategory, selectedLevel, maxPrice, minRating, sortBy]);

  // Pagination bounds computation
  const totalPages = Math.ceil(processedCourses.length / coursesPerPage);
  
  const paginatedCourses = useMemo(() => {
    const startIdx = (currentPage - 1) * coursesPerPage;
    return processedCourses.slice(startIdx, startIdx + coursesPerPage);
  }, [processedCourses, currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedLevel('all');
    setMaxPrice(100);
    setMinRating(0);
    setSortBy('popular');
    setCurrentPage(1);
  };

  return (
    <>
      {/* Header Block */}
      <section className="bg-isabelline py-12 border-b border-platinum/40 text-center">
        <div className="container">
          <h1 className="h1 section-title">Courses Catalog</h1>
          <p className="section-text text-gray-web max-w-2xl mx-auto mt-2">
            Explore advanced computer science structures, responsive design, and professional video editing masterclasses.
          </p>
        </div>
      </section>

      {/* Main Grid catalog */}
      <section className="section courses-catalog py-[50px] md:py-[75px] xl:py-[100px] bg-white">
        <div className="container grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 relative">
          
          {/* Sidebar Filters (Desktop view) */}
          <aside className="hidden lg:flex flex-col gap-6 border border-platinum/50 rounded-[10px] p-6 bg-isabelline/20 self-start shadow-sm">
            <div className="flex justify-between items-center pb-4 border-b border-platinum/40">
              <h3 className="font-spartan text-[1.8rem] font-bold text-eerie-black-1 flex items-center gap-2">
                <IoFunnelOutline className="text-kappel" />
                <span>Filters</span>
              </h3>
              <button onClick={resetFilters} className="text-[1.4rem] text-radical-red hover:underline font-medium">
                Reset
              </button>
            </div>

            {/* Category Filter */}
            <div className="flex flex-col gap-2">
              <h4 className="font-spartan text-[1.5rem] font-bold text-eerie-black-1 mb-1">Categories</h4>
              <select
                value={selectedCategory}
                onChange={(e) => { setSelectedCategory(e.target.value); setCurrentPage(1); }}
                className="p-3 bg-white border border-platinum/60 rounded-[5px] text-[1.4rem] focus:outline-none focus:ring-2 focus:ring-kappel"
              >
                <option value="all">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.title}</option>
                ))}
              </select>
            </div>

            {/* Level Filter */}
            <div className="flex flex-col gap-2">
              <h4 className="font-spartan text-[1.5rem] font-bold text-eerie-black-1 mb-1">Complexity Level</h4>
              <select
                value={selectedLevel}
                onChange={(e) => { setSelectedLevel(e.target.value); setCurrentPage(1); }}
                className="p-3 bg-white border border-platinum/60 rounded-[5px] text-[1.4rem] focus:outline-none focus:ring-2 focus:ring-kappel"
              >
                <option value="all">All Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            {/* Price Filter */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center text-[1.4rem] text-eerie-black-1 font-semibold">
                <span>Max Price</span>
                <span className="text-radical-red">${maxPrice}</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                step="5"
                value={maxPrice}
                onChange={(e) => { setMaxPrice(Number(e.target.value)); setCurrentPage(1); }}
                className="w-full accent-kappel"
              />
            </div>

            {/* Rating Filter */}
            <div className="flex flex-col gap-2">
              <h4 className="font-spartan text-[1.5rem] font-bold text-eerie-black-1 mb-1">Average Rating</h4>
              <div className="flex flex-col gap-2 text-[1.4rem]">
                {[4.5, 4.0, 3.5, 0].map((rating) => (
                  <label key={rating} className="flex items-center gap-2 text-eerie-black-1 cursor-pointer font-medium font-sans">
                    <input
                      type="radio"
                      name="rating"
                      checked={minRating === rating}
                      onChange={() => { setMinRating(rating); setCurrentPage(1); }}
                      className="accent-kappel w-4 h-4"
                    />
                    <span>{rating === 0 ? 'Any Rating' : `${rating} Stars & Up`}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Content Column */}
          <div className="flex flex-col gap-6">
            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-isabelline/20 border border-platinum/40 rounded-[10px] p-4">
              <span className="text-[1.5rem] font-medium text-eerie-black-1">
                Showing <strong className="text-kappel">{processedCourses.length}</strong> courses
              </span>

              <div className="flex items-center gap-4 w-full sm:w-auto">
                <button
                  onClick={() => setIsMobileFilterOpen(true)}
                  className="lg:hidden flex items-center justify-center gap-2 p-3 bg-kappel text-white rounded-[5px] text-[1.4rem] font-spartan font-bold flex-1"
                >
                  <IoFunnelOutline />
                  <span>Filters</span>
                </button>

                <select
                  value={sortBy}
                  onChange={(e) => { setSortBy(e.target.value); setCurrentPage(1); }}
                  className="p-3 bg-white border border-platinum/60 rounded-[5px] text-[1.4rem] focus:outline-none focus:ring-2 focus:ring-kappel flex-1 sm:flex-none font-sans"
                >
                  <option value="popular">Popular Enrolments</option>
                  <option value="newest">Newest Releases</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Courses Catalog Grid */}
            {paginatedCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px]">
                {paginatedCourses.map((course) => {
                  const isEnrolled = enrolledCourses.some((e) => e.id === course.id);
                  return (
                    <CourseCard key={course.id} course={course} isEnrolled={isEnrolled} />
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-20 bg-isabelline/10 border border-platinum/40 rounded-[10px]">
                <h3 className="font-spartan text-[2.4rem] font-bold text-eerie-black-1">No Courses Found</h3>
                <p className="text-[1.5rem] text-gray-web mt-2 max-w-[400px] mx-auto leading-relaxed">
                  Try adjusting your filter settings or resetting the inputs to view more options.
                </p>
                <button onClick={resetFilters} className="btn has-before mx-auto mt-6">
                  Reset All Filters
                </button>
              </div>
            )}

            {/* Pagination Controls */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </section>

      {/* Mobile Filters Drawer Overlay */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 bg-black/50 z-[200] flex justify-end xl:hidden">
          <div className="w-[300px] h-full bg-white p-6 shadow-2xl overflow-y-auto flex flex-col gap-6">
            <div className="flex justify-between items-center pb-4 border-b border-platinum/60">
              <h3 className="font-spartan text-[1.8rem] font-bold text-eerie-black-1">Filters</h3>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="text-[2.6rem] text-eerie-black-1 hover:text-radical-red"
              >
                <IoCloseOutline />
              </button>
            </div>

            {/* Category Filter */}
            <div className="flex flex-col gap-2">
              <h4 className="font-spartan text-[1.5rem] font-bold text-eerie-black-1">Categories</h4>
              <select
                value={selectedCategory}
                onChange={(e) => { setSelectedCategory(e.target.value); setCurrentPage(1); }}
                className="p-3 bg-white border border-platinum/60 rounded-[5px] text-[1.4rem] focus:outline-none focus:ring-2 focus:ring-kappel"
              >
                <option value="all">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.title}</option>
                ))}
              </select>
            </div>

            {/* Level Filter */}
            <div className="flex flex-col gap-2">
              <h4 className="font-spartan text-[1.5rem] font-bold text-eerie-black-1">Complexity Level</h4>
              <select
                value={selectedLevel}
                onChange={(e) => { setSelectedLevel(e.target.value); setCurrentPage(1); }}
                className="p-3 bg-white border border-platinum/60 rounded-[5px] text-[1.4rem] focus:outline-none focus:ring-2 focus:ring-kappel"
              >
                <option value="all">All Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            {/* Price Filter */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center text-[1.4rem] text-eerie-black-1 font-semibold">
                <span>Max Price</span>
                <span className="text-radical-red">${maxPrice}</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                step="5"
                value={maxPrice}
                onChange={(e) => { setMaxPrice(Number(e.target.value)); setCurrentPage(1); }}
                className="w-full accent-kappel"
              />
            </div>

            {/* Rating Filter */}
            <div className="flex flex-col gap-2">
              <h4 className="font-spartan text-[1.5rem] font-bold text-eerie-black-1">Average Rating</h4>
              <div className="flex flex-col gap-2 text-[1.4rem]">
                {[4.5, 4.0, 3.5, 0].map((rating) => (
                  <label key={rating} className="flex items-center gap-2 text-eerie-black-1 cursor-pointer font-medium font-sans">
                    <input
                      type="radio"
                      name="mobile-rating"
                      checked={minRating === rating}
                      onChange={() => { setMinRating(rating); setCurrentPage(1); }}
                      className="accent-kappel w-4 h-4"
                    />
                    <span>{rating === 0 ? 'Any Rating' : `${rating} Stars & Up`}</span>
                  </label>
                ))}
              </div>
            </div>

            <button
              onClick={() => setIsMobileFilterOpen(false)}
              className="btn has-before w-full justify-center py-4 mt-4"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Courses;
