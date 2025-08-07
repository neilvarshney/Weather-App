'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation'
import CurrentTemp from './currentTemp';

type WeatherData = {
  main: { temp: number }
  weather: { description: string, icon: string}[];
  dt: number
  timezone: number
  sys: {sunrise: number, sunset: number};

};

export default function Weather() {

    const searchParams = useSearchParams();
    const cityInput = searchParams.get('city');
    const latInput = searchParams.get('lat');
    const lonInput = searchParams.get('lon');
    const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    // Only fetch if all inputs are available, and only once the dependencies change
    if (cityInput && latInput && lonInput) {

      const fetchWeather = async () => {
        const response = await fetch(
          `http://localhost:5000/cities/${cityInput}/weather?lat=${latInput}&lon=${lonInput}`
        );

        const data = await response.json();
        setWeather(data.weatherData);
      };

      fetchWeather();
    }

  }, [cityInput, latInput, lonInput]);

  console.log(weather)
  return (
    <div>
      {(!weather || !weather.main || !weather.sys) ? <div className="text-5xl font-bold" >Loading...</div> :  
      
        <div className='flex min-h-screen justify-center items-center sm:p-20 flex-col'>
            <CurrentTemp city = {cityInput} temperature = {weather.main.temp} weatherDescription={weather.weather[0].description} iconCode = {weather.weather[0].icon} time = {weather.dt} timezone = {weather.timezone} sunrise = {weather.sys.sunrise} sunset = {weather.sys.sunset}/>
        </div>
      }
    </div>
  );
}