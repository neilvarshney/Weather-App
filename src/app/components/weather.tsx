'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation'
import CurrentTemp from './currentTemp';

type WeatherData = {
  main: { temp: number, temp_max: number, temp_min: number, feels_like: number, humidity: number, pressure: number, sea_level: number, grnd_level: number}
  weather: { description: string, icon: string}[];
  dt: number
  timezone: number
  visibility: number
  sys: {sunrise: number, sunset: number, country: string};
  wind: {deg: number, gust: number, speed: number};
};

export default function Weather() {

    const searchParams = useSearchParams();
    const cityInput = searchParams.get('city');
    const latInput = searchParams.get('lat');
    const lonInput = searchParams.get('lon');
    const stateInput = searchParams.get('state')
    const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    // Only fetch if all inputs are available, and only once the dependencies change
    if (cityInput && latInput && lonInput) {

      const fetchWeather = async () => {
        const response = await fetch(
          `http://localhost:5000/cities/${cityInput}/weather?lat=${latInput}&lon=${lonInput}&state=${stateInput}`
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
          <CurrentTemp city = {cityInput} state = {stateInput} country = {weather.sys.country} temperature = {weather.main.temp} temperatureMax = {weather.main.temp_max} temperatureMin = {weather.main.temp_min} feelsLike ={weather.main.feels_like} weatherDescription={weather.weather[0].description} iconCode = {weather.weather[0].icon} time = {weather.dt} timezone = {weather.timezone} sunrise = {weather.sys.sunrise} sunset = {weather.sys.sunset} wind = {weather.wind} grnd_level = {weather.main.grnd_level} humidity = {weather.main.humidity} pressure = {weather.main.pressure} sea_level = {weather.main.sea_level} visibility = {weather.visibility}/>
        </div>
      }
    </div>
  );
}