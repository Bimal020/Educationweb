import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearch } from '../context/SearchContext';
import { IoSearchOutline } from 'react-icons/io5';

function SearchBar({ placeholder = "Search for courses, levels, topics..." }) {
  const { searchQuery, setSearchQuery } = useSearch();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleInput = (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value.trim() && window.location.pathname !== '/search') {
      navigate(`/search?q=${encodeURIComponent(e.target.value)}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-[600px] mx-auto relative flex items-center bg-white rounded-[8px] border border-platinum/60 p-2 shadow-md">
      <input
        type="text"
        value={searchQuery}
        onChange={handleInput}
        placeholder={placeholder}
        className="w-full pl-4 pr-12 py-3 bg-white text-eerie-black-1 text-[1.5rem] focus:outline-none placeholder-gray-x-11 font-sans"
      />
      <button
        type="submit"
        className="absolute right-3 bg-kappel text-white p-3 rounded-full hover:bg-radical-red transition-all cursor-pointer shadow-sm flex items-center justify-center"
        aria-label="Search"
      >
        <IoSearchOutline className="text-xl" />
      </button>
    </form>
  );
}

export default SearchBar;
