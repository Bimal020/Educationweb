import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useCourses } from '../context/CourseContext';
import {
  IoTrashOutline,
  IoCartOutline,
  IoArrowForwardOutline,
  IoCheckmarkCircleOutline,
  IoShieldCheckmarkOutline,
  IoRibbonOutline,
  IoInfiniteOutline,
  IoArrowBackOutline,
  IoPricetagOutline,
  IoLockClosedOutline,
  IoStar,
} from 'react-icons/io5';

function Cart() {
  const {
    cartItems,
    removeFromCart,
    clearCart,
    subtotal,
    discountAmount,
    grandTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
  } = useCart();

  const { user } = useAuth();
  const { enrollInCourse } = useCourses();
  const navigate = useNavigate();

  const [couponCode, setCouponCode] = useState('');
  const [couponFeedback, setCouponFeedback] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    const res = applyCoupon(couponCode);
    setCouponFeedback(res);
    if (res.success) {
      setCouponCode('');
    }
  };

  const handleCheckout = async () => {
    if (!user) {
      navigate('/login', { state: { from: { pathname: '/cart' } } });
      return;
    }

    setIsProcessing(true);
    try {
      // Enroll user into all courses in cart
      for (const item of cartItems) {
        try {
          await enrollInCourse(item.id);
        } catch (e) {
          console.warn(`Course ${item.id} already enrolled or error:`, e);
        }
      }
      setCheckoutSuccess(true);
      clearCart();
    } catch (err) {
      console.error('Checkout error:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="cart-page bg-slate-50/50 min-h-screen py-[40px] md:py-[60px]">
      <div className="container">
        {/* Breadcrumb Header */}
        <div className="mb-8 text-left">
          <div className="flex items-center gap-2 text-[1.4rem] text-gray-web font-medium mb-2">
            <Link to="/" className="hover:text-kappel transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-eerie-black-1 font-semibold">Shopping Cart</span>
          </div>
          <h1 className="h1 font-spartan text-left text-eerie-black-1 font-bold">
            Shopping Cart ({cartItems.length})
          </h1>
        </div>

        {/* Checkout Success Modal / Card */}
        {checkoutSuccess ? (
          <div className="bg-white border border-platinum/60 rounded-[12px] p-8 md:p-12 text-center max-w-[650px] mx-auto shadow-xl my-8">
            <div className="w-[80px] h-[80px] bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl shadow-inner">
              <IoCheckmarkCircleOutline />
            </div>
            <h2 className="font-spartan text-[2.8rem] font-bold text-eerie-black-1 mb-3">
              Enrollment Successful!
            </h2>
            <p className="text-[1.6rem] text-gray-web font-sans mb-8 max-w-[500px] mx-auto leading-relaxed">
              Congratulations! You have successfully enrolled in your courses. You can start learning right away from your dashboard.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/my-courses" className="btn has-before text-[1.6rem]">
                Go to My Courses
              </Link>
              <Link
                to="/courses"
                className="px-6 py-3 border border-platinum/80 rounded-[5px] text-[1.6rem] font-spartan font-medium text-eerie-black-1 hover:bg-slate-100 transition-colors flex items-center gap-2"
              >
                Browse More Courses
              </Link>
            </div>
          </div>
        ) : cartItems.length === 0 ? (
          /* Empty Cart View */
          <div className="bg-white border border-platinum/60 rounded-[12px] p-12 text-center max-w-[600px] mx-auto shadow-sm my-8">
            <div className="w-[100px] h-[100px] bg-kappel-15 text-kappel rounded-full flex items-center justify-center mx-auto mb-6 text-5xl">
              <IoCartOutline />
            </div>
            <h2 className="font-spartan text-[2.4rem] font-bold text-eerie-black-1 mb-2">
              Your Cart is Empty
            </h2>
            <p className="text-[1.5rem] text-gray-web font-sans mb-8">
              Looks like you haven't added any courses to your cart yet. Explore our top-rated courses and start learning today!
            </p>
            <Link to="/courses" className="btn has-before mx-auto text-[1.6rem] inline-flex">
              <span>Explore Catalog</span>
              <IoArrowForwardOutline aria-hidden="true" />
            </Link>
          </div>
        ) : (
          /* Cart Main Layout */
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 items-start">
            {/* Cart Items List */}
            <div className="flex flex-col gap-6 text-left">
              <div className="bg-white border border-platinum/60 rounded-[12px] shadow-sm overflow-hidden">
                <div className="p-6 border-b border-platinum/40 flex justify-between items-center bg-slate-50/50">
                  <h2 className="font-spartan text-[2rem] font-bold text-eerie-black-1">
                    Course Items ({cartItems.length})
                  </h2>
                  <button
                    onClick={clearCart}
                    className="text-[1.4rem] text-red-500 hover:text-red-700 font-medium flex items-center gap-1 transition-colors"
                  >
                    <IoTrashOutline className="text-lg" />
                    <span>Clear Cart</span>
                  </button>
                </div>

                <div className="divide-y divide-platinum/40">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="p-6 flex flex-col sm:flex-row items-start sm:items-center gap-6 hover:bg-slate-50/40 transition-colors group"
                    >
                      {/* Image */}
                      <Link to={`/courses/${item.id}`} className="shrink-0 w-full sm:w-[160px] aspect-[16/10] rounded-[8px] overflow-hidden bg-light-gray">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </Link>

                      {/* Info */}
                      <div className="flex-grow">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="bg-kappel-15 text-kappel font-spartan text-[1.2rem] font-bold px-2.5 py-0.5 rounded-[3px]">
                            {item.level || 'All Levels'}
                          </span>
                          {item.rating && (
                            <div className="flex items-center gap-1 text-[1.3rem] text-eerie-black-1 font-medium">
                              <IoStar className="text-selective-yellow text-sm" />
                              <span>{item.rating.toFixed(1)}</span>
                            </div>
                          )}
                        </div>

                        <h3 className="font-spartan text-[1.8rem] font-bold text-eerie-black-1 mb-2 hover:text-kappel transition-colors">
                          <Link to={`/courses/${item.id}`}>{item.title}</Link>
                        </h3>

                        <div className="flex flex-wrap gap-4 text-[1.3rem] text-gray-web font-sans">
                          {item.lessons && <span>{item.lessons} Lessons</span>}
                          {item.duration && <span>• {item.duration}</span>}
                        </div>
                      </div>

                      {/* Price & Actions */}
                      <div className="flex sm:flex-col justify-between items-center sm:items-end w-full sm:w-auto gap-4 pt-4 sm:pt-0 border-t sm:border-t-0 border-platinum/40">
                        <div className="text-right">
                          <span className="font-spartan text-[2.2rem] font-bold text-radical-red block">
                            ${Number(item.price).toFixed(2)}
                          </span>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 text-gray-400 hover:text-red-500 rounded-full hover:bg-red-50 transition-all"
                          title="Remove item"
                        >
                          <IoTrashOutline className="text-[2rem]" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Guarantees & Features */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white border border-platinum/50 rounded-[10px] p-5 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-kappel/10 text-kappel flex items-center justify-center text-2xl shrink-0">
                    <IoShieldCheckmarkOutline />
                  </div>
                  <div>
                    <h4 className="font-spartan text-[1.5rem] font-bold text-eerie-black-1">Money-Back Guarantee</h4>
                    <p className="text-[1.2rem] text-gray-web">30-day risk free guarantee</p>
                  </div>
                </div>

                <div className="bg-white border border-platinum/50 rounded-[10px] p-5 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-kappel/10 text-kappel flex items-center justify-center text-2xl shrink-0">
                    <IoInfiniteOutline />
                  </div>
                  <div>
                    <h4 className="font-spartan text-[1.5rem] font-bold text-eerie-black-1">Lifetime Access</h4>
                    <p className="text-[1.2rem] text-gray-web font-sans">Learn at your own pace</p>
                  </div>
                </div>

                <div className="bg-white border border-platinum/50 rounded-[10px] p-5 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-kappel/10 text-kappel flex items-center justify-center text-2xl shrink-0">
                    <IoRibbonOutline />
                  </div>
                  <div>
                    <h4 className="font-spartan text-[1.5rem] font-bold text-eerie-black-1">Certificate</h4>
                    <p className="text-[1.2rem] text-gray-web font-sans">Earned upon completion</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar Summary */}
            <aside className="bg-white border border-platinum/60 rounded-[12px] p-6 shadow-md text-left sticky top-24">
              <h2 className="font-spartan text-[2rem] font-bold text-eerie-black-1 pb-4 border-b border-platinum/40 mb-6">
                Order Summary
              </h2>

              {/* Coupon Form */}
              <div className="mb-6">
                <label className="block font-spartan text-[1.4rem] font-bold text-eerie-black-1 mb-2 flex items-center gap-1.5">
                  <IoPricetagOutline className="text-kappel" />
                  <span>Promo Code</span>
                </label>

                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-3 bg-kappel-15 border border-kappel/30 rounded-[6px]">
                    <div>
                      <span className="font-spartan font-bold text-[1.4rem] text-kappel block">
                        {appliedCoupon.code}
                      </span>
                      <span className="text-[1.2rem] text-gray-web">{appliedCoupon.description}</span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-[1.3rem] text-red-500 hover:underline font-medium"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. EDUWEB10"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-grow border border-platinum/80 rounded-[6px] px-3 py-2 text-[1.4rem] font-sans focus:outline-none focus:border-kappel uppercase"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-eerie-black-1 hover:bg-kappel text-white font-spartan text-[1.4rem] rounded-[6px] transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                )}

                {couponFeedback && (
                  <p
                    className={`text-[1.3rem] mt-2 font-medium ${
                      couponFeedback.success ? 'text-green-600' : 'text-red-500'
                    }`}
                  >
                    {couponFeedback.message}
                  </p>
                )}
              </div>

              {/* Price Calculation Breakdown */}
              <div className="space-y-3 font-sans text-[1.5rem] border-t border-platinum/40 pt-4 mb-6">
                <div className="flex justify-between text-gray-web">
                  <span>Subtotal</span>
                  <span className="font-semibold text-eerie-black-1">${subtotal.toFixed(2)}</span>
                </div>

                {appliedCoupon && (
                  <div className="flex justify-between text-green-600 font-medium">
                    <span>Discount ({appliedCoupon.discountPercent}%)</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="border-t border-platinum/40 pt-3 flex justify-between items-center text-[1.8rem] font-spartan font-bold text-eerie-black-1">
                  <span>Total:</span>
                  <span className="text-[2.4rem] text-radical-red">${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={handleCheckout}
                disabled={isProcessing}
                className="btn has-before w-full justify-center text-[1.6rem] py-3 flex items-center gap-2 mb-4"
              >
                <IoLockClosedOutline className="text-xl" />
                <span>{isProcessing ? 'Processing Checkout...' : user ? 'Complete Checkout' : 'Login & Checkout'}</span>
              </button>

              <p className="text-[1.2rem] text-gray-web text-center flex items-center justify-center gap-1">
                <IoShieldCheckmarkOutline className="text-kappel" />
                <span>Secure SSL encrypted checkout</span>
              </p>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
