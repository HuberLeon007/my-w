'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar,
  Thermometer,
  Droplets,
  Wind,
  Eye,
  ArrowLeft
} from 'lucide-react';
import { ForecastCardSkeleton } from './SkeletonLoading';
import SearchBar from './SearchBar';
import Background from './Background';

const ForecastView = ({ onBack }) => {
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    getCurrentLocationForecast();
  }, []);

  const getCurrentLocationForecast = async () => {
    setLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser.');
      setLoading(false);
      return;
    }

    // Timeout für Geolocation auf 5 Sekunden setzen
    const timeoutId = setTimeout(() => {
      setError('Location request timed out. Using default location.');
      fetchForecastByCity('Salzburg'); // Fallback zu Salzburg
    }, 5000);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        clearTimeout(timeoutId);
        const { latitude, longitude } = position.coords;
        await fetchForecastByCoords(latitude, longitude);
      },
      (error) => {
        clearTimeout(timeoutId);
        console.log('Geolocation error, using fallback location');
        // Fallback zu Salzburg wenn Geolocation fehlschlägt
        fetchForecastByCity('Salzburg');
      },
      {
        timeout: 5000, // 5 Sekunden Timeout
        enableHighAccuracy: false, // Schnellere, weniger genaue Position
        maximumAge: 300000 // 5 Minuten Cache
      }
    );
  };

  const fetchForecastByCoords = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${lat},${lon}&days=3&aqi=no&alerts=no`
      );
      
      if (!response.ok) {
        throw new Error('Forecast data not found');
      }
      
      const data = await response.json();
      setForecastData(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch forecast data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchForecastByCity = async (city) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${city}&days=3&aqi=no&alerts=no`
      );
      
      if (!response.ok) {
        throw new Error('City not found');
      }
      
      const data = await response.json();
      setForecastData(data);
      setError(null);
    } catch (err) {
      setError('City not found. Please try a different city.');
    } finally {
      setLoading(false);
    }
  };

  const getDayName = (dateStr) => {
    const date = new Date(dateStr);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', { weekday: 'long' });
    }
  };

  const getWeatherIcon = (iconUrl) => {
    return `https:${iconUrl}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <Background weatherData={forecastData} />
        <div className="relative z-10 p-6 max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <button
                onClick={onBack}
                className="bg-white/10 backdrop-blur-sm rounded-full p-2 hover:bg-white/20 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-white" />
              </button>
              <div>
                <h1 className="text-3xl font-bold text-white flex items-center gap-2">
                  <Calendar className="w-8 h-8" />
                  3-Day Forecast
                </h1>
                <p className="text-white/70">
                  Loading forecast data...
                </p>
              </div>
            </div>
          </div>

          {/* Skeleton Forecast Cards */}
          <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 max-w-5xl mx-auto">
            {Array.from({ length: 3 }).map((_, index) => (
              <ForecastCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <Background weatherData={forecastData} />
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6">
          <div className="bg-red-500/20 backdrop-blur-sm rounded-xl p-6 text-center text-white border border-red-500/30 max-w-md">
            <h2 className="text-xl font-semibold mb-2">Error</h2>
            <p className="mb-4">{error}</p>
            <button
              onClick={getCurrentLocationForecast}
              className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <Background weatherData={forecastData} />
      <div className="relative z-10 p-6 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={onBack}
              className="bg-white/10 backdrop-blur-sm rounded-full p-2 hover:bg-white/20 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-white flex items-center gap-2">
                <Calendar className="w-8 h-8" />
                3-Day Forecast
              </h1>
              <p className="text-white/70">
                Plan ahead with reliable extended weather predictions
              </p>
            </div>
          </div>
          
          {forecastData && (
            <div className="text-white/80 mb-6">
              <p className="text-lg">
                {forecastData.location.name}, {forecastData.location.country}
              </p>
            </div>
          )}

          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-8">
            <SearchBar 
              onSearch={fetchForecastByCity}
              onLocationClick={getCurrentLocationForecast}
              loading={loading}
            />
          </div>
        </div>

        {/* Forecast Cards */}
        {forecastData && (
          <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 max-w-5xl mx-auto">
            {forecastData.forecast.forecastday.map((day, index) => (
              <motion.div
                key={day.date}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl"
              >
                {/* Day Header */}
                <div className="text-center mb-4">
                  <h3 className="text-lg font-semibold text-white">
                    {getDayName(day.date)}
                  </h3>
                  <p className="text-white/70 text-sm">
                    {new Date(day.date).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>

                {/* Weather Icon & Temperature */}
                <div className="text-center mb-6">
                  <img
                    src={getWeatherIcon(day.day.condition.icon)}
                    alt={day.day.condition.text}
                    className="w-16 h-16 mx-auto mb-2"
                  />
                  <div className="flex justify-center items-center gap-2">
                    <span className="text-2xl font-bold text-white">
                      {Math.round(day.day.maxtemp_c)}°
                    </span>
                    <span className="text-lg text-white/70">
                      {Math.round(day.day.mintemp_c)}°
                    </span>
                  </div>
                  <p className="text-white/80 text-sm capitalize mt-1">
                    {day.day.condition.text}
                  </p>
                </div>

                {/* Weather Details */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 text-white/70">
                      <Droplets className="w-4 h-4" />
                      <span className="text-sm">Rain</span>
                    </div>
                    <span className="text-white text-sm">
                      {day.day.daily_chance_of_rain}%
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 text-white/70">
                      <Wind className="w-4 h-4" />
                      <span className="text-sm">Wind</span>
                    </div>
                    <span className="text-white text-sm">
                      {Math.round(day.day.maxwind_kph)} km/h
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 text-white/70">
                      <Droplets className="w-4 h-4" />
                      <span className="text-sm">Humidity</span>
                    </div>
                    <span className="text-white text-sm">
                      {day.day.avghumidity}%
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ForecastView;
