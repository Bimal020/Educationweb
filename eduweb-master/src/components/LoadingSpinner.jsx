import React from 'react';

function LoadingSpinner({ fullPage = false }) {
  if (fullPage) {
    return (
      <div className="fixed inset-0 bg-white/70 z-[9999] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-[50px] h-[50px] border-4 border-kappel-15 border-t-kappel rounded-full animate-spin"></div>
          <p className="font-spartan font-medium text-[1.6rem] text-eerie-black-1 tracking-wide">Loading EduWeb...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center py-8">
      <div className="w-[40px] h-[40px] border-4 border-kappel-15 border-t-kappel rounded-full animate-spin"></div>
    </div>
  );
}

export default LoadingSpinner;
