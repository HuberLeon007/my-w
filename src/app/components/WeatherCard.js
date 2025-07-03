'use client';

import { motion } from 'framer-motion';
import { 
  Thermometer, 
  Droplets, 
  Wind, 
  Eye, 
  Gauge, 
  MapPin
} from 'lucide-react';

const WeatherCard = ({ weatherData }) => {
  console.log('WeatherCard received data:', weatherData); // Debug log
  
  const {
    current: { 
      temp_c: temp, 
      feelslike_c: feels_like, 
      humidity, 
      pressure_mb: pressure,
      condition: { text: description, icon },
      wind_kph: windSpeed,
      vis_km: visibility
    },
    location: { name, country }
  } = weatherData;

  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getWeatherIcon = (iconUrl) => {
    return `https:${iconUrl}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl"
    >
      {/* Location and Main Weather */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-2">
          <MapPin className="w-5 h-5 text-white/70" />
          <span className="text-white/90 text-lg font-medium">
            {name}, {country}
          </span>
        </div>
        
        <div className="flex items-center justify-center gap-4 mb-4">
          <motion.img
            src={getWeatherIcon(icon)}
            alt={description}
            className="w-20 h-20"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          />
          <div>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-6xl font-bold text-white"
            >
              {Math.round(temp)}°
            </motion.div>
          </div>
        </div>
        
        <div className="space-y-1">
          <p className="text-white/90 text-xl capitalize">{description}</p>
          <p className="text-white/70">Feels like {Math.round(feels_like)}°</p>
        </div>
      </div>

      {/* Weather Details Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-2 gap-4 mb-6"
      >
        <WeatherDetail
          icon={<Droplets className="w-5 h-5" />}
          label="Humidity"
          value={`${humidity}%`}
        />
        <WeatherDetail
          icon={<Wind className="w-5 h-5" />}
          label="Wind Speed"
          value={`${Math.round(windSpeed)} km/h`}
        />
        <WeatherDetail
          icon={<Gauge className="w-5 h-5" />}
          label="Pressure"
          value={`${pressure} hPa`}
        />
        <WeatherDetail
          icon={<Eye className="w-5 h-5" />}
          label="Visibility"
          value={`${visibility} km`}
        />
      </motion.div>

      {/* Additional Weather Info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex justify-center items-center pt-4 border-t border-white/20"
      >
        <div className="text-center">
          <p className="text-white/70 text-sm">Weather Condition</p>
          <p className="text-white font-medium capitalize">{description}</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

const WeatherDetail = ({ icon, label, value }) => (
  <div className="bg-white/5 rounded-xl p-4 text-center">
    <div className="flex justify-center mb-2 text-white/70">
      {icon}
    </div>
    <p className="text-white/70 text-sm mb-1">{label}</p>
    <p className="text-white font-semibold">{value}</p>
  </div>
);

export default WeatherCard;
