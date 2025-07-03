'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  Home, 
  Calendar,
  Cloud
} from 'lucide-react';

const Navigation = ({ currentView, onViewChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    {
      id: 'home',
      label: 'Home',
      icon: <Home className="w-5 h-5" />,
      description: 'Current weather conditions'
    },
    {
      id: 'forecast',
      label: '3-Day Forecast',
      icon: <Calendar className="w-5 h-5" />,
      description: 'Plan ahead with reliable extended weather predictions'
    }
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (viewId) => {
    onViewChange(viewId);
    setIsOpen(false);
  };

  return (
    <>
      {/* Hamburger Menu Button */}
      <motion.button
        onClick={toggleMenu}
        className="fixed top-6 left-6 z-50 bg-white/10 backdrop-blur-md rounded-full p-3 border border-white/20 shadow-lg hover:bg-white/20 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <Menu className="w-6 h-6 text-white" />
          )}
        </motion.div>
      </motion.button>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>

      {/* Side Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: -320, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -320, opacity: 0 }}
            transition={{ 
              type: "spring", 
              damping: 30, 
              stiffness: 300,
              mass: 0.8
            }}
            className="fixed left-0 top-0 h-full w-80 bg-white/10 backdrop-blur-md border-r border-white/20 z-45 shadow-2xl"
          >
            {/* Header - moved down to avoid X button */}
            <div className="p-6 pt-20 border-b border-white/20">
              <div className="flex items-center gap-3">
                <Cloud className="w-8 h-8 text-blue-300" />
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    my<span className="text-blue-300">W</span>
                  </h2>
                  <p className="text-white/70 text-sm">Weather App</p>
                </div>
              </div>
            </div>

            {/* Navigation Items */}
            <div className="p-4 space-y-2">
              {menuItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={`w-full p-4 rounded-xl text-left transition-all duration-200 ${
                    currentView === item.id
                      ? 'bg-white/20 border border-white/30'
                      : 'bg-white/5 hover:bg-white/10 border border-transparent'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * menuItems.indexOf(item) }}
                >
                  <div className="flex items-start gap-3">
                    <div className={`mt-1 ${
                      currentView === item.id ? 'text-blue-300' : 'text-white/70'
                    }`}>
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-semibold ${
                        currentView === item.id ? 'text-white' : 'text-white/90'
                      }`}>
                        {item.label}
                      </h3>
                      <p className="text-white/60 text-sm mt-1">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Footer */}
            <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-white/20">
              <p className="text-white/50 text-xs text-center">
                Powered by WeatherAPI.com
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
