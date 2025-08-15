# Weather App

A modern, responsive weather application built with Next.js that provides real-time weather information with dynamic background colors based on time of day and weather conditions.

## Features

- **Current Weather Display**: Real-time temperature, humidity, pressure, and wind information
- **Dynamic Background**: Automatic color scheme changes based on sunrise, sunset, and weather conditions
- **Location Search**: Search for weather by city, state, and country
- **Comprehensive Data**: Detailed weather statistics including visibility, sea level pressure, and ground level pressure
- **Responsive Design**: Clean, modern UI that works across all devices
- **Timezone Support**: Accurate time display based on location

## Screenshots

![Weather App Homepage](/public/image1.png)
![Weather App Screenshot 2](/public/image2.png)
![Weather App Screenshot 3](/public/image3.png)
![Weather App Screenshot 4](/public/image4.png)

## Technology Stack

- **Frontend**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS
- **Weather API**: OpenWeatherMap API
- **State Management**: React Context API

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

## Key Components

- **CurrentTemp**: Displays comprehensive weather information with dynamic styling
- **Search**: Location search interface for finding weather data
- **IridescenceContext**: Manages dynamic background colors based on time and weather
- **Weather**: Handles weather data fetching and display

## API Integration

The application uses proper RESTful API architecture with a Python Flask backend that handles:
- **RESTful Endpoints**: `/cities/{city_name}` and `/cities/{city_name}/weather` following REST conventions
- **HTTP Methods**: Proper GET requests with query parameters for coordinates
- **Status Codes**: Appropriate HTTP status codes (200, 400, 409, 500) for different response scenarios
- **Error Handling**: Comprehensive error handling for HTTP errors, connection issues, timeouts, and JSON parsing failures
- **Data Validation**: Input validation and proper error responses

The backend integrates with OpenWeatherMap API to provide:
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

## Error Handling

**Backend (Python Flask):**
- Comprehensive error handling for HTTP requests, connections, timeouts, and JSON parsing
- Proper HTTP status codes and error responses
- Input validation and sanitization

**Frontend (React):**
- Basic error handling with loading states
- Component-level error boundaries (could be enhanced)
- Graceful fallbacks for missing data

**Areas for Enhancement:**
- Frontend error boundaries for better error isolation
- User-friendly error messages and retry mechanisms
- Network error handling and offline support
