import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useSearch } from '../context/SearchContext';
import { useCourses } from '../context/CourseContext';
import CourseCard from '../components/CourseCard';
import SearchBar from '../components/SearchBar';
import { IoBookOutline, IoGridOutline, IoNewspaperOutline, IoPeopleOutline, IoSearchOutline } from 'react-icons/io5';

function SearchResult() {
  const [searchParams] = useSearchParams();
  const { searchQuery, setSearchQuery, searchResults, hasResults } = useSearch();
  const { enrolledCourses } = useCourses();
  const [activeTab, setActiveTab] = useState('courses');

  // Synchronize URL query parameter with context query
  const queryParam = searchParams.get('q');
  useEffect(() => {
    if (queryParam && queryParam !== searchQuery) {
      setSearchQuery(queryParam);
    }
  }, [queryParam, setSearchQuery, searchQuery]);

  return (
    <>
      {/* Header Block */}
      <section className="bg-isabelline py-12 border-b border-platinum/40 text-center">
        <div className="container flex flex-col gap-6">
          <h1 className="h1 section-title">Search Results</h1>
          
          {/* Reusable SearchBar */}
          <div className="w-full max-w-[600px] mx-auto">
            <SearchBar placeholder="Type keywords here to filter results instantly..." />
          </div>
        </div>
      </section>

      {/* Results Listings */}
      <section className="section search-results py-[50px] xl:py-[80px] bg-white">
        <div className="container max-w-[1000px] mx-auto px-4">
          
          {searchQuery.trim() ? (
            <>
              {/* Informative Query text */}
              <p className="text-[1.6rem] text-eerie-black-1 font-medium mb-6 text-left font-sans">
                Search results for: <strong className="text-kappel italic">"{searchQuery}"</strong>
              </p>

              {hasResults ? (
                <div className="flex flex-col gap-8">
                  {/* Results Categorized Tabs */}
                  <div className="flex flex-wrap border-b border-platinum/40 text-[1.4rem] font-spartan font-bold">
                    <button
                      onClick={() => setActiveTab('courses')}
                      className={`flex items-center gap-2 py-3 px-4 border-b-2 transition-all ${
                        activeTab === 'courses'
                          ? 'border-kappel text-kappel'
                          : 'border-transparent text-gray-web hover:text-eerie-black-1'
                      }`}
                    >
                      <IoBookOutline />
                      <span>Courses ({searchResults.courses.length})</span>
                    </button>

                    <button
                      onClick={() => setActiveTab('categories')}
                      className={`flex items-center gap-2 py-3 px-4 border-b-2 transition-all ${
                        activeTab === 'categories'
                          ? 'border-kappel text-kappel'
                          : 'border-transparent text-gray-web hover:text-eerie-black-1'
                      }`}
                    >
                      <IoGridOutline />
                      <span>Categories ({searchResults.categories.length})</span>
                    </button>

                    <button
                      onClick={() => setActiveTab('blogs')}
                      className={`flex items-center gap-2 py-3 px-4 border-b-2 transition-all ${
                        activeTab === 'blogs'
                          ? 'border-kappel text-kappel'
                          : 'border-transparent text-gray-web hover:text-eerie-black-1'
                      }`}
                    >
                      <IoNewspaperOutline />
                      <span>Articles ({searchResults.blogs.length})</span>
                    </button>

                    <button
                      onClick={() => setActiveTab('teachers')}
                      className={`flex items-center gap-2 py-3 px-4 border-b-2 transition-all ${
                        activeTab === 'teachers'
                          ? 'border-kappel text-kappel'
                          : 'border-transparent text-gray-web hover:text-eerie-black-1'
                      }`}
                    >
                      <IoPeopleOutline />
                      <span>Teachers ({searchResults.teachers.length})</span>
                    </button>
                  </div>

                  {/* Tab Contents */}
                  <div className="tab-contents">
                    {/* Courses Tab */}
                    {activeTab === 'courses' && (
                      searchResults.courses.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px] text-left">
                          {searchResults.courses.map((course) => {
                            const isEnrolled = enrolledCourses.some((e) => e.id === course.id);
                            return (
                              <CourseCard key={course.id} course={course} isEnrolled={isEnrolled} />
                            );
                          })}
                        </div>
                      ) : (
                        <div className="text-center py-12 text-gray-web italic font-sans text-[1.5rem]">
                          No matching courses found.
                        </div>
                      )
                    )}

                    {/* Categories Tab */}
                    {activeTab === 'categories' && (
                      searchResults.categories.length > 0 ? (
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                          {searchResults.categories.map((cat) => (
                            <li key={cat.id}>
                              <Link
                                to={`/courses?category=${cat.id}`}
                                className="flex items-center gap-4 p-4 rounded-[5px] border border-platinum/40 hover:bg-isabelline/20 hover:border-kappel transition-all shadow-sm"
                              >
                                <span
                                  className="w-[45px] h-[45px] rounded-full flex items-center justify-center p-2.5"
                                  style={{ backgroundColor: `hsla(${cat.color}, 0.1)` }}
                                >
                                  <img src={cat.icon} alt="" className="w-full h-full object-contain" />
                                </span>
                                <div>
                                  <h4 className="font-spartan text-[1.6rem] font-bold text-eerie-black-1">{cat.title}</h4>
                                  <p className="text-[1.3rem] text-kappel font-medium font-sans mt-0.5">{cat.coursesCount} courses</p>
                                </div>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <div className="text-center py-12 text-gray-web italic font-sans text-[1.5rem]">
                          No matching categories found.
                        </div>
                      )
                    )}

                    {/* Blogs Tab */}
                    {activeTab === 'blogs' && (
                      searchResults.blogs.length > 0 ? (
                        <ul className="flex flex-col gap-4 text-left font-sans text-[1.5rem]">
                          {searchResults.blogs.map((blog) => (
                            <li key={blog.id} className="p-5 border border-platinum/40 rounded-[8px] hover:shadow-sm transition-all flex flex-col sm:flex-row gap-4 items-start">
                              <img src={blog.image} alt="" className="w-[120px] h-[80px] rounded-[5px] object-cover bg-light-gray flex-shrink-0" />
                              <div className="flex-grow">
                                <span className="text-[1.2rem] uppercase text-kappel font-medium tracking-wide block">{blog.category}</span>
                                <Link to={`/blog/${blog.id}`} className="font-spartan text-[1.8rem] font-bold text-eerie-black-1 hover:text-kappel transition-all leading-snug mt-1 block">
                                  {blog.title}
                                </Link>
                                <p className="text-gray-web text-[1.4rem] mt-2 line-clamp-2">{blog.text}</p>
                              </div>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <div className="text-center py-12 text-gray-web italic font-sans text-[1.5rem]">
                          No matching articles found.
                        </div>
                      )
                    )}

                    {/* Teachers Tab */}
                    {activeTab === 'teachers' && (
                      searchResults.teachers.length > 0 ? (
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
                          {searchResults.teachers.map((teacher) => (
                            <li key={teacher.id} className="p-5 border border-platinum/40 rounded-[8px] bg-isabelline/10 hover:shadow-sm transition-all flex items-center gap-4">
                              <img src={teacher.avatar} alt="" className="w-[60px] h-[60px] rounded-full object-cover border border-kappel flex-shrink-0" />
                              <div>
                                <h4 className="font-spartan text-[1.6rem] font-bold text-eerie-black-1">{teacher.name}</h4>
                                <p className="text-[1.3rem] text-kappel uppercase font-semibold mt-0.5 tracking-wide leading-none">{teacher.role}</p>
                                <p className="text-[1.3rem] text-gray-web line-clamp-2 mt-1.5 font-sans leading-relaxed">{teacher.bio}</p>
                              </div>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <div className="text-center py-12 text-gray-web italic font-sans text-[1.5rem]">
                          No matching teachers found.
                        </div>
                      )
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-20 bg-isabelline/10 border border-platinum/40 rounded-[10px]">
                  <IoSearchOutline className="text-[6rem] text-quick-silver mx-auto mb-4" />
                  <h3 className="font-spartan text-[2.4rem] font-bold text-eerie-black-1">No Results Found</h3>
                  <p className="text-[1.5rem] text-gray-web mt-2 max-w-[400px] mx-auto leading-relaxed font-sans">
                    We couldn't find matches for <strong className="text-radical-red">"{searchQuery}"</strong> in our catalog. Try alternative terms.
                  </p>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12 text-gray-web italic font-sans text-[1.6rem]">
              Please type in the search bar above to query courses, topics, and educators.
            </div>
          )}

        </div>
      </section>
    </>
  );
}

export default SearchResult;
