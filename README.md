# Weather App

A modern, responsive weather application built with Next.js that provides real-time weather information with dynamic background colors based on time of day and weather conditions.

## Features

- **Current Weather Display**: Real-time temperature, humidity, pressure, and wind information
- **Dynamic Background**: Automatic color scheme changes based on sunrise, sunset, and weather conditions
- **Location Search**: Search for weather by city, state, and country
- **Comprehensive Data**: Detailed weather statistics including visibility, sea level pressure, and ground level pressure
- **Responsive Design**: Clean, modern UI that works across all devices
- **Timezone Support**: Accurate time display based on location

## Technology Stack

- **Frontend**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS
- **Weather API**: OpenWeatherMap API
- **State Management**: React Context API
- **Deployment**: Ready for Vercel deployment

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your OpenWeatherMap API key in your environment variables
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── currentTemp.tsx      # Main weather display component
│   │   ├── header.tsx           # Application header
│   │   ├── search.tsx           # Location search functionality
│   │   ├── weather.tsx          # Weather data component
│   │   └── IridescenceContext.tsx # Dynamic background color context
│   ├── layout.tsx               # Root layout component
│   └── page.tsx                 # Main application page
└── backend/
    └── app.py                   # Backend API (Python)
```

## Key Components

- **CurrentTemp**: Displays comprehensive weather information with dynamic styling
- **Search**: Location search interface for finding weather data
- **IridescenceContext**: Manages dynamic background colors based on time and weather
- **Weather**: Handles weather data fetching and display

## API Integration

The application integrates with OpenWeatherMap API to provide:
- Current weather conditions
- Temperature data (current, max, min, feels like)
- Wind information (speed, direction, gusts)
- Atmospheric pressure and humidity
- Visibility and sea level data
- Sunrise and sunset times

## Development

This project uses modern React patterns including:
- Functional components with hooks
- Context API for state management
- TypeScript for type safety
- Tailwind CSS for responsive styling

## License

This project is open source and available under the MIT License.
