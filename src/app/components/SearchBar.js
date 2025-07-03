'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Loader2 } from 'lucide-react';

const SearchBar = ({ onSearch, onLocationClick, loading }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchValue.trim() && !loading) {
      onSearch(searchValue.trim());
      setSearchValue('');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex items-center bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden">
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Enter city name..."
            className="flex-1 px-6 py-4 bg-transparent text-white placeholder-white/50 outline-none text-lg"
            disabled={loading}
          />
          
          <motion.button
            type="submit"
            disabled={loading || !searchValue.trim()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-4 text-white/70 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <Search className="w-6 h-6" />
            )}
          </motion.button>
        </div>
      </form>

      {/* Location Button */}
      <motion.button
        onClick={onLocationClick}
        disabled={loading}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full mt-4 flex items-center justify-center gap-3 bg-white/5 backdrop-blur-sm rounded-xl py-3 px-6 text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300 border border-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <MapPin className="w-5 h-5" />
        <span>Use Current Location</span>
      </motion.button>
    </motion.div>
  );
};

export default SearchBar;
