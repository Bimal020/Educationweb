import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import {
  IoHeartOutline,
  IoTrashOutline,
  IoCartOutline,
  IoArrowForwardOutline,
  IoStar,
  IoCheckmarkCircle,
} from 'react-icons/io5';

function Wishlist() {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart, isInCart } = useCart();

  return (
    <div className="wishlist-page bg-slate-50/50 dark:bg-slate-900 min-h-screen py-[40px] md:py-[60px]">
      <div className="container">
        {/* Breadcrumb Header */}
        <div className="mb-8 text-left">
          <div className="flex items-center gap-2 text-[1.4rem] text-gray-web font-medium mb-2">
            <Link to="/" className="hover:text-kappel transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-eerie-black-1 dark:text-slate-100 font-semibold">Wishlist</span>
          </div>
          <h1 className="h1 font-spartan text-left text-eerie-black-1 dark:text-slate-100 font-bold">
            Saved Courses ({wishlistItems.length})
          </h1>
        </div>

        {wishlistItems.length === 0 ? (
          /* Empty Wishlist View */
          <div className="bg-white dark:bg-slate-800 border border-platinum/60 dark:border-slate-700 rounded-[12px] p-12 text-center max-w-[600px] mx-auto shadow-sm my-8">
            <div className="w-[100px] h-[100px] bg-red-100 text-radical-red rounded-full flex items-center justify-center mx-auto mb-6 text-5xl">
              <IoHeartOutline />
            </div>
            <h2 className="font-spartan text-[2.4rem] font-bold text-eerie-black-1 dark:text-slate-100 mb-2">
              Your Wishlist is Empty
            </h2>
            <p className="text-[1.5rem] text-gray-web dark:text-slate-400 font-sans mb-8">
              Save your favorite courses here to enroll or review them later.
            </p>
            <Link to="/courses" className="btn has-before mx-auto text-[1.6rem] inline-flex">
              <span>Explore Catalog</span>
              <IoArrowForwardOutline aria-hidden="true" />
            </Link>
          </div>
        ) : (
          /* Wishlist Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            {wishlistItems.map((course) => {
              const inCart = isInCart(course.id);

              return (
                <div
                  key={course.id}
                  className="bg-white dark:bg-slate-800 border border-platinum/60 dark:border-slate-700 rounded-[10px] overflow-hidden shadow-sm flex flex-col justify-between"
                >
                  <div className="relative aspect-[370/220] bg-light-gray overflow-hidden">
                    <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                    <button
                      onClick={() => removeFromWishlist(course.id)}
                      className="absolute top-3 right-3 p-2 bg-white/90 dark:bg-slate-900/90 text-red-500 rounded-full hover:bg-red-500 hover:text-white transition-all shadow-md"
                      title="Remove from wishlist"
                    >
                      <IoTrashOutline className="text-xl" />
                    </button>
                    <span className="absolute bottom-3 left-3 bg-kappel text-white text-[1.2rem] font-bold font-spartan px-2.5 py-1 rounded-[3px]">
                      {course.level}
                    </span>
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="font-spartan text-[1.8rem] font-bold text-eerie-black-1 dark:text-slate-100 mb-2 line-clamp-2 hover:text-kappel transition-colors">
                      <Link to={`/courses/${course.id}`}>{course.title}</Link>
                    </h3>

                    {course.rating && (
                      <div className="flex items-center gap-1 text-[1.4rem] text-eerie-black-1 dark:text-slate-300 font-medium mb-3">
                        <IoStar className="text-selective-yellow text-base" />
                        <span>{course.rating.toFixed(1)}</span>
                        <span className="text-gray-web dark:text-slate-400">({course.reviewsCount || 0})</span>
                      </div>
                    )}

                    <div className="mt-auto pt-4 border-t border-platinum/40 dark:border-slate-700 flex items-center justify-between">
                      <span className="font-spartan text-[2.2rem] font-bold text-radical-red">
                        ${Number(course.price).toFixed(2)}
                      </span>

                      {inCart ? (
                        <Link
                          to="/cart"
                          className="flex items-center gap-1.5 font-spartan text-[1.3rem] font-bold text-green-600 bg-green-100 dark:bg-green-900/30 px-3 py-2 rounded-[5px]"
                        >
                          <IoCheckmarkCircle className="text-lg" />
                          <span>In Cart</span>
                        </Link>
                      ) : (
                        <button
                          onClick={() => addToCart(course)}
                          className="btn has-before text-[1.4rem] px-4 py-2 flex items-center gap-1.5"
                        >
                          <IoCartOutline className="text-lg" />
                          <span>Add to Cart</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Wishlist;
