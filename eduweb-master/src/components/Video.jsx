import React, { useState } from 'react';
import videoBg from '../assets/images/video-bg.png';
import videoBanner from '../assets/images/video-banner.jpg';
import videoShape1 from '../assets/images/video-shape-1.png';
import videoShape2 from '../assets/images/video-shape-2.png';
import { IoPlay, IoCloseOutline } from 'react-icons/io5';

function Video() {
  const [isOpen, setIsOpen] = useState(false);

  const openVideo = () => setIsOpen(true);
  const closeVideo = () => setIsOpen(false);

  return (
    <>
      <section
        className="video bg-cover bg-no-repeat bg-[center_top] py-[75px] xl:py-[120px] overflow-hidden"
        aria-label="video"
        style={{ backgroundImage: `url(${videoBg})` }}
      >
        <div className="container">
          <div className="video-card relative xl:max-w-[75%] xl:mx-auto">
            {/* Banner */}
            <div className="video-banner relative rounded-tr-[80px] rounded-bl-[120px] overflow-hidden group aspect-[970/550] bg-light-gray">
              <img
                src={videoBanner}
                width="970"
                height="550"
                loading="lazy"
                alt="video banner"
                className="img-cover w-full h-full object-cover"
              />

              {/* Black overlay inside video cover */}
              <div className="absolute inset-0 bg-black-30 group-hover:bg-black-50 transition-colors duration-300"></div>

              {/* Play Button */}
              <button
                className="play-btn absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-radical-red text-white text-[30px] p-[16px] md:p-[25px] rounded-full z-10 animate-pulse-slow cursor-pointer hover:scale-105 active:scale-95 transition-transform"
                aria-label="play video"
                onClick={openVideo}
              >
                <IoPlay aria-hidden="true" />
              </button>
            </div>

            {/* Absolute Shapes */}
            <img
              src={videoShape1}
              width="1089"
              height="605"
              loading="lazy"
              alt=""
              className="hidden xl:block absolute top-[-50px] left-0 -z-10 pointer-events-none"
            />

            <img
              src={videoShape2}
              width="158"
              height="174"
              loading="lazy"
              alt=""
              className="hidden xl:block absolute top-[-80px] right-[120px] z-10 pointer-events-none"
            />
          </div>
        </div>
      </section>

      {/* Video Modal (Premium Feature) */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/90 z-[999] flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden shadow-2xl">
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-white hover:text-radical-red text-4xl z-[1000] cursor-pointer"
              onClick={closeVideo}
              aria-label="Close modal"
            >
              <IoCloseOutline />
            </button>

            {/* Video player (using a placeholder responsive embed code) */}
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </>
  );
}

export default Video;
