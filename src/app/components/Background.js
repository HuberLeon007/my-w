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
    const isDay = weatherData.current.is_day === 1;

    // Sonniges/Klares Wetter
    if (weather.includes('clear') || weather.includes('sunny')) {
      return isDay 
        ? 'from-orange-400 via-yellow-400 to-blue-400'
        : 'from-indigo-900 via-purple-900 to-blue-900';
    } 
    // Teilweise bewölkt
    else if (weather.includes('partly cloudy') || weather.includes('partly')) {
      return isDay
        ? 'from-blue-300 via-blue-400 to-gray-400'
        : 'from-indigo-800 via-blue-800 to-gray-800';
    }
    // Bewölkt/Bedeckt
    else if (weather.includes('cloud') || weather.includes('overcast')) {
      return isDay
        ? 'from-gray-300 via-gray-400 to-gray-500'
        : 'from-gray-700 via-gray-800 to-gray-900';
    } 
    // Neblig/Dunst
    else if (weather.includes('mist') || weather.includes('fog') || weather.includes('haze')) {
      return isDay
        ? 'from-gray-200 via-gray-300 to-blue-300'
        : 'from-gray-600 via-gray-700 to-blue-800';
    }
    // Regen
    else if (weather.includes('rain') || weather.includes('drizzle') || weather.includes('shower')) {
      return 'from-slate-600 via-slate-700 to-slate-800';
    } 
    // Gewitter
    else if (weather.includes('thunder') || weather.includes('storm')) {
      return 'from-gray-900 via-purple-900 to-indigo-900';
    }
    // Schnee
    else if (weather.includes('snow') || weather.includes('blizzard')) {
      return isDay
        ? 'from-blue-100 via-blue-200 to-gray-300'
        : 'from-blue-800 via-blue-900 to-gray-900';
    }
    // Wind
    else if (weather.includes('wind')) {
      return isDay
        ? 'from-teal-400 via-blue-400 to-cyan-400'
        : 'from-teal-800 via-blue-800 to-cyan-800';
    }
    // Default
    else {
      return 'from-blue-900 via-blue-700 to-blue-500';
    }
  };

  // Get weather-specific effects
  const getWeatherEffect = () => {
    if (!weatherData) return null;

    const weather = weatherData.current.condition.text.toLowerCase();

    // Regen Effekt
    if (weather.includes('rain') || weather.includes('drizzle') || weather.includes('shower')) {
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 80 }, (_, i) => (
            <motion.div
              key={`rain-${i}`}
              className="absolute w-0.5 h-6 bg-blue-300/40"
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

    // Schnee Effekt
    if (weather.includes('snow') || weather.includes('blizzard')) {
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 40 }, (_, i) => (
            <motion.div
              key={`snow-${i}`}
              className="absolute w-2 h-2 bg-white rounded-full opacity-80"
              style={{
                left: `${Math.random() * 100}%`,
                top: '-8px',
              }}
              animate={{
                y: ['0vh', '100vh'],
                x: [0, Math.random() * 40 - 20],
              }}
              transition={{
                duration: Math.random() * 3 + 3,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: 'linear',
              }}
            />
          ))}
        </div>
      );
    }

    // Gewitter Effekt
    if (weather.includes('thunder') || weather.includes('storm')) {
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute inset-0 bg-white/10"
            animate={{
              opacity: [0, 0.3, 0],
            }}
            transition={{
              duration: 0.1,
              repeat: Infinity,
              repeatDelay: Math.random() * 5 + 3,
            }}
          />
        </div>
      );
    }

    // Nebel Effekt
    if (weather.includes('mist') || weather.includes('fog') || weather.includes('haze')) {
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 5 }, (_, i) => (
            <motion.div
              key={`fog-${i}`}
              className="absolute w-96 h-96 bg-white/5 rounded-full blur-3xl"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, 50, 0],
                y: [0, 30, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: Math.random() * 20 + 15,
                repeat: Infinity,
                ease: 'easeInOut',
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
        key={weatherData?.current?.condition?.text || 'default'}
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
