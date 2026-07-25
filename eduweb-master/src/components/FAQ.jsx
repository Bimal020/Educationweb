import React, { useState } from 'react';
import { faqs } from '../data/mockData';
import { IoAddOutline, IoRemoveOutline } from 'react-icons/io5';

function FAQ() {
  const [openId, setOpenId] = useState(null);

  const toggleFAQ = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="section faq py-[75px] xl:py-[120px] bg-isabelline/25 border-t border-platinum/30" aria-label="faq">
      <div className="container max-w-[800px] mx-auto px-4">
        <p className="section-subtitle text-radical-red">FAQ</p>
        <h2 className="h2 section-title mb-[40px]">Frequently Asked Questions</h2>

        <ul className="flex flex-col gap-4">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <li key={faq.id} className="bg-white rounded-[8px] border border-platinum/40 shadow-sm overflow-hidden transition-all duration-300">
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full flex justify-between items-center p-5 text-left font-spartan text-[1.6rem] md:text-[1.8rem] font-semibold text-eerie-black-1 hover:text-kappel transition-all focus:outline-none"
                >
                  <span>{faq.question}</span>
                  <span className="p-1 rounded-full bg-light-gray/20 text-kappel">
                    {isOpen ? <IoRemoveOutline className="text-xl" /> : <IoAddOutline className="text-xl" />}
                  </span>
                </button>

                <div
                  className={`transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-[500px] border-t border-platinum/20 opacity-100 p-5' : 'max-h-0 opacity-0 overflow-hidden p-0'
                  }`}
                >
                  <p className="text-[1.5rem] text-gray-web leading-[1.7] font-sans">
                    {faq.answer}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export default FAQ;
