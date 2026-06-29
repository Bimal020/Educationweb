import React, { useState, useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/index.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { CourseProvider } from './context/CourseContext.jsx';
import { SearchProvider } from './context/SearchContext.jsx';
import { IoChevronUp } from 'react-icons/io5';

function App() {
  const [showScrollBtn, setShowScrollBtn] = useState(false);

  useEffect(() => {
    const toggleScrollBtn = () => {
      if (window.scrollY > 200) {
        setShowScrollBtn(true);
      } else {
        setShowScrollBtn(false);
      }
    };

    window.addEventListener('scroll', toggleScrollBtn);
    return () => window.removeEventListener('scroll', toggleScrollBtn);
  }, []);

  const handleScrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AuthProvider>
      <CourseProvider>
        <SearchProvider>
          {/* Main Router Provider */}
          <RouterProvider router={router} />

          {/* Floating Back to Top Button */}
          <a
            href="#top"
            onClick={handleScrollToTop}
            className={`fixed bottom-[40px] right-[30px] bg-kappel text-white text-[20px] p-[15px] rounded-full z-[999] shadow-lg transition-all duration-300 ${
              showScrollBtn
                ? 'opacity-100 translate-y-0 pointer-events-auto'
                : 'opacity-0 translate-y-[10px] pointer-events-none'
            }`}
            aria-label="back to top"
          >
            <IoChevronUp aria-hidden="true" />
          </a>
        </SearchProvider>
      </CourseProvider>
    </AuthProvider>
  );
}

export default App;
