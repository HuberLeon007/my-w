'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const Background = ({ weatherData }) => {
  const [particles, setParticles] = useState([]);

  // Generate floating particles
  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 20 + 10,
    }));
    setParticles(newParticles);
  }, []);

  // Get background gradient based on weather
  const getBackgroundGradient = () => {
    if (!weatherData) {
      return 'from-blue-900 via-blue-700 to-blue-500'; // Default
    }

    const weather = weatherData.current.condition.text.toLowerCase();
    const time = new Date().getHours();
    const isDay = time >= 6 && time < 18;

    if (weather.includes('clear') || weather.includes('sunny')) {
      return isDay 
        ? 'from-blue-400 via-blue-500 to-blue-600'
        : 'from-indigo-900 via-purple-900 to-blue-900';
    } else if (weather.includes('cloud') || weather.includes('overcast')) {
      return isDay
        ? 'from-gray-400 via-gray-500 to-gray-600'
        : 'from-gray-800 via-gray-700 to-gray-600';
    } else if (weather.includes('rain') || weather.includes('drizzle')) {
      return 'from-gray-600 via-gray-700 to-gray-800';
    } else if (weather.includes('snow')) {
      return 'from-blue-200 via-blue-300 to-blue-400';
    } else if (weather.includes('thunder')) {
      return 'from-gray-900 via-gray-800 to-purple-900';
    } else {
      return 'from-blue-900 via-blue-700 to-blue-500';
    }
  };

  // Get weather-specific effects
  const getWeatherEffect = () => {
    if (!weatherData) return null;

    const weather = weatherData.current.condition.text.toLowerCase();

    if (weather.includes('rain')) {
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 100 }, (_, i) => (
            <motion.div
              key={`rain-${i}`}
              className="absolute w-0.5 h-6 bg-blue-300/30"
              style={{
                left: `${Math.random() * 100}%`,
                top: '-24px',
              }}
              animate={{
                y: ['0vh', '100vh'],
              }}
              transition={{
                duration: Math.random() * 0.5 + 0.5,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: 'linear',
              }}
            />
          ))}
        </div>
      );
    }

    if (weather.includes('snow')) {
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 50 }, (_, i) => (
            <motion.div
              key={`snow-${i}`}
              className="absolute w-2 h-2 bg-white rounded-full opacity-70"
              style={{
                left: `${Math.random() * 100}%`,
                top: '-8px',
              }}
              animate={{
                y: ['0vh', '100vh'],
                x: [0, Math.random() * 40 - 20],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: 'linear',
              }}
            />
          ))}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="fixed inset-0 -z-10">
      {/* Main gradient background */}
      <motion.div
        key={weatherData?.weather?.[0]?.main || 'default'}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className={`absolute inset-0 bg-gradient-to-br ${getBackgroundGradient()}`}
      />

      {/* Animated gradient overlay */}
      <motion.div
        animate={{
          background: [
            'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%)',
            'radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.3) 0%, transparent 50%)',
          ],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
        className="absolute inset-0"
      />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-white/10"
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 10, 0],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Weather-specific effects */}
      {getWeatherEffect()}

      {/* Subtle noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};

export default Background;
