'use client';

import { useState, useEffect } from 'react';
import WeatherCard from './WeatherCard';
import SearchBar from './SearchBar';
import Background from './Background';

const HomeView = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Get user's current location on mount
  useEffect(() => {
    getCurrentLocationWeather();
  }, []);

  const getCurrentLocationWeather = async () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser.');
      return;
    }

    setLoading(true);
    
    // Timeout für Geolocation auf 5 Sekunden setzen
    const timeoutId = setTimeout(() => {
      console.log('Location request timed out, using fallback');
      fetchWeatherByCity('Salzburg'); // Fallback zu Salzburg
    }, 5000);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        clearTimeout(timeoutId);
        const { latitude, longitude } = position.coords;
        await fetchWeatherByCoords(latitude, longitude);
      },
      (error) => {
        clearTimeout(timeoutId);
        console.log('Geolocation error, using fallback location');
        // Fallback zu Salzburg wenn Geolocation fehlschlägt
        fetchWeatherByCity('Salzburg');
      },
      {
        timeout: 5000, // 5 Sekunden Timeout
        enableHighAccuracy: false, // Schnellere, weniger genaue Position
        maximumAge: 300000 // 5 Minuten Cache
      }
    );
  };

  const fetchWeatherByCoords = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${lat},${lon}&aqi=no`
      );
      
      if (!response.ok) {
        throw new Error('Weather data not found');
      }
      
      const data = await response.json();
      console.log('Weather data received:', data); // Debug log
      setWeatherData(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching weather:', err); // Debug log
      setError('Failed to fetch weather data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherByCity = async (city) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${city}&aqi=no`
      );
      
      if (!response.ok) {
        throw new Error('City not found');
      }
      
      const data = await response.json();
      console.log('City weather data received:', data); // Debug log
      setWeatherData(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching city weather:', err); // Debug log
      setError('City not found. Please try a different city.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <Background weatherData={weatherData} />
      
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6">
        <div className="w-full max-w-md space-y-8">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-6xl font-bold text-white drop-shadow-lg">
              my<span className="text-blue-300">W</span>
            </h1>
            <div className="text-white/80 text-lg">
              {currentTime.toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit',
                second: '2-digit'
              })}
            </div>
            <div className="text-white/60 text-sm">
              {currentTime.toLocaleDateString([], { 
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
          </div>

          {/* Search Bar */}
          <SearchBar 
            onSearch={fetchWeatherByCity}
            onLocationClick={getCurrentLocationWeather}
            loading={loading}
          />

          {/* Weather Card */}
          {error && (
            <div className="bg-red-500/20 backdrop-blur-sm rounded-xl p-4 text-center text-white border border-red-500/30">
              {error}
            </div>
          )}

          {weatherData && !loading && (
            <WeatherCard weatherData={weatherData} />
          )}

          {loading && (
            <div className="text-center text-white">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
              <p>Loading weather data...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeView;
