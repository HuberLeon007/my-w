# myW - Modern Weather App 🌤️

A beautiful, modern weather application built with Next.js, featuring real-time weather data, geolocation tracking, and stunning animations.

## Features ✨

- 🌍 **Location-based Weather**: Automatically detects your current location or search for any city
- 🎨 **Dynamic Backgrounds**: Beautiful gradient backgrounds that change based on weather conditions
- ⏰ **Real-time Clock**: Live clock showing current time and date
- 🌧️ **Weather Animations**: Rain, snow, and other weather effects
- 📱 **Responsive Design**: Works perfectly on desktop and mobile devices
- 🔍 **Smart Search**: Search for weather in any city worldwide
- 🌅 **Sunrise/Sunset Times**: View precise sunrise and sunset times
- 💨 **Detailed Weather Info**: Temperature, humidity, wind speed, pressure, and visibility

## Setup Instructions 🚀

### 1. Get Your Weather API Key

1. Visit [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Navigate to the API section and generate your API key
4. Copy your API key (it may take a few minutes to activate)

### 2. Configure the Application

1. Open the `.env.local` file in the project root
2. Replace `YOUR_API_KEY_HERE` with your actual OpenWeatherMap API key:
   ```
   NEXT_PUBLIC_WEATHER_API_KEY=your_actual_api_key_here
   ```

### 3. Install Dependencies

```bash
npm install
```

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage 🎯

1. **Current Location**: Click "Use Current Location" to get weather for your current position
2. **Search**: Type any city name in the search bar and press Enter
3. **Real-time Updates**: The clock updates every second, showing current time
4. **Weather Details**: View comprehensive weather information including:
   - Current temperature and "feels like" temperature
   - Weather conditions with animated icons
   - Humidity, wind speed, pressure, and visibility
   - Sunrise and sunset times

## Technologies Used 🛠️

- **Next.js 15** - React framework for production
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Beautiful icon set
- **OpenWeatherMap API** - Weather data provider

## Weather Effects 🌈

The app includes dynamic visual effects based on weather conditions:
- ☀️ **Clear Sky**: Bright blue gradients
- ☁️ **Cloudy**: Gray tones with cloud effects
- 🌧️ **Rain**: Animated raindrops falling
- 🌨️ **Snow**: Gentle snowflake animations
- ⛈️ **Thunderstorm**: Dark, dramatic gradients

## Browser Support 🌐

- Chrome (recommended)
- Firefox
- Safari
- Edge

**Note**: Geolocation features require HTTPS in production and user permission.

## Contributing 🤝

Feel free to contribute to this project by:
- Reporting bugs
- Suggesting new features
- Submitting pull requests

## License 📄

This project is open source and available under the MIT License.

---

Built with ❤️ for beautiful weather experiences!
