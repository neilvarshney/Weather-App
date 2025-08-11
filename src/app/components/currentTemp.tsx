'use client';

import React from 'react';
import { useIridescence } from './IridescenceContext';


function mphTokmh(value: number){
    value = value * 3.6;
    return value.toFixed(1);
}

function currentTime(time: number | null, timezone: number | null)
{
    if(time != null && timezone != null)
        {
            // Add timezone offset to the UTC timestamp, then create Date
            const localTime = time + timezone;
            const date = new Date(localTime * 1000);
            
            // Use toLocaleString with UTC timezone to prevent browser conversion
            return date.toLocaleString('en-US', {
                timeZone: 'UTC',
                hour12: true,
                hour: 'numeric',
                minute: '2-digit',
            });
        }
}

function currentDate(time: number | null, timezone: number | null)
{
    if(time != null && timezone != null)
    {
        const date = new Date(time * 1000);
        
        // Convert to target timezone using toLocaleString
        const targetDate = new Date(date.getTime() + (timezone * 1000));
        
        const year = targetDate.getUTCFullYear();
        const dateNumber = targetDate.getDate();

        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const month = months[targetDate.getUTCMonth()];

        const dayOfWeek = targetDate.getUTCDay();

        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const day = days[dayOfWeek];

        return `${day}, ${month} ${dateNumber}, ${year}`;
    }
}

type Wind = {
    deg: number;
    gust: number;
    speed: number;
}

type CurrentTempProps = {
    city: string | null;
    temperature: number | null;
    weatherDescription: string | null;
    iconCode: string | null;
    time: number | null;
    timezone: number | null;
    sunrise: number | null;
    sunset: number | null;
    wind: Wind;
  };

function kelvinToCelcius(temp: number){
    return Math.round(temp - 273.15);
}


export default function CurrentTemp({ city, temperature, weatherDescription, iconCode, time, timezone, sunrise, sunset, wind }: CurrentTempProps){

    const { setIridescenceColor } = useIridescence();
    
    React.useEffect(() => {

        if (iconCode !== null && time !== null && timezone !== null && sunrise !== null && sunset !== null)
        {
            if(iconCode == "01d" || iconCode == "02d" || iconCode == "01n" || iconCode == "02n")
            {
                if (time >= sunrise - 3600 && time < sunrise) {
                    setIridescenceColor([0.8, 0.6, 0.4]); // Pre-dawn: soft orange/peach (1 hour before sunrise)
                    console.log("PRE-DAWN");
                }
                else if (time >= sunrise && time < sunrise + 7200) {
                    setIridescenceColor([1, 0.8, 0.5]); // Morning: orange/yellow (2 hours after sunrise)
                    console.log("MORNING");
                } 
                else if (time >= sunrise + 7200 && time < sunset - 14400) {
                    setIridescenceColor([0.5, 0.8, 1]); // Afternoon: blue (4 hours before sunset)
                    console.log("AFTERNOON");
                } 
                else if (time >= sunset - 14400 && time < sunset) {
                    setIridescenceColor([0.7, 0.3, 0.3]); // Evening: pink/purple (4 hours before sunset until sunset)
                    console.log("EVENING");
                } 
                else {
                    setIridescenceColor([0.1, 0.1, 0.3]); // Night: dark blue (before pre-dawn or after sunset)
                    console.log("NIGHT");
                }
            }

            else if (iconCode == "03d" || iconCode == "04d"){ // cloudy in the day
                setIridescenceColor([0.3, 0.3, 0.3]);
            }

            else if (iconCode == "03n" || iconCode == "04n" || iconCode == "50n"){ // cloudy or mist in the night
                setIridescenceColor([0.2, 0.2, 0.2]);
            }

            else if(iconCode == "09n" || iconCode == "10n" || iconCode == "11n" || iconCode == "13n"){ // light rain, rain, thunderstorm, snow in the night
                setIridescenceColor([0.05, 0.05, 0.1]);
            }

            else if(iconCode == "09d"){ // light rain in the day
                setIridescenceColor([0.15, 0.15, 0.15]);
            }

            else if(iconCode == "10d" || iconCode == "11d" || iconCode == "13d"){ // rain, thunderstorm, snow in the day
                setIridescenceColor([0.25, 0.25, 0.25]);
            }

            else if (iconCode == "50d") // mist in day
            {
                setIridescenceColor([0.4, 0.4, 0.4]);
            }
        }

    
    }, [time, timezone, iconCode, setIridescenceColor]);

    return(
        <div className='flex flex-col gap-10'>
            <div className='bg-gradient-to-r from-gray-400/50 to-gray-400/50 rounded-2xl border border-gray-700/50 w-[840px] h-[200px]'>
                <div className='mt-5 flex flex-col gap-3 items-center'>
                    <h1 className='text-4xl'>
                        {city}
                    </h1>

                    <h1 className='text-xl'>
                        {currentTime(time, timezone)}
                    </h1>

                    <h1>
                        {currentDate(time, timezone)}
                    </h1>

                </div>
            </div>
            <div className="flex flex-row gap-10">
                <div className="flex flex-row bg-gradient-to-r from-gray-400/50 to-gray-400/50 rounded-2xl p-8 border border-gray-700/50 w-[400px] h-[400px]">
                    <div className='w-[175px]'>
                        <h1 className='text-6xl'>
                            {temperature !== null ? kelvinToCelcius(temperature) + '°C' : "N/A"}
                        </h1>

                        <h1 className='w-[50px] mt-2 text-2xl'>
                            {weatherDescription} 
                        </h1>
                    </div>
                    <div>
                        <img className='text-center ml-5 mb-10 size-[120px] border border-4 border-blue-200 rounded-full' src={`https://openweathermap.org/img/wn/${iconCode}@4x.png`} alt="Weather Icon" />
                    </div>
                </div>

                <div className="bg-gradient-to-r from-gray-400/50 to-gray-400/50 rounded-2xl p-8 border border-gray-700/50 w-[400px] h-[400px]">
                    <h1 className='text-5xl'>
                        Wind
                    </h1>

                    <div className='flex flex-col gap-10 mt-10'>
                        <div className='flex justify-between items-center'>
                            <h1 className='mt-2 text-2xl border-b-4 border-gray-600/50'>
                                {`Speed:`}
                            </h1>

                            <h1 className='mt-2 text-2xl border-b-4 border-gray-600/50'>
                                    {`${mphTokmh(wind.speed)} km/hr`}
                            </h1>
                        </div>

                        {wind.gust ? (
                            <div className='flex justify-between items-center'>
                                <h1 className='mt-2 text-2xl border-b-4 border-gray-600/50'>
                                    {`Gusts:`}
                                </h1>

                                <h1 className='mt-2 text-2xl border-b-4 border-gray-600/50'>
                                    {`${mphTokmh(wind.gust)} km/hr`}
                                </h1>
                            </div>
                        ) : (
                            null
                        )}
                        <div className='flex justify-between items-center'>
                            <h1 className='mt-2 text-2xl border-b-4 border-gray-600/50'>
                                {`Direction:`}
                            </h1>

                            <h1 className='mt-2 text-2xl border-b-4 border-gray-600/50'>
                                    {`${wind.deg}°`}
                            </h1>
                        </div>
                    </div>
                </div>
            </div>

            <div className='bg-gradient-to-r from-gray-400/50 to-gray-400/50 rounded-2xl p-8 border border-gray-700/50 w-[840px] h-[300px]'>
                Other stats
            </div>
        </div>

    );
}