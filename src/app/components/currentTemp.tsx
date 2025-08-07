'use client';

import React from 'react';
import { useIridescence } from './IridescenceContext';
import { describe } from 'node:test';

type CurrentTempProps = {
    city: string | null;
    temperature: number | null;
    weatherDescription: string | null;
    iconCode: string | null;
    time: number | null;
    timezone: number | null;
    sunrise: number | null;
    sunset: number | null;
  };

function kelvinToCelcius(temp: number){
    return Math.round(temp - 273.15);
}


export default function CurrentTemp({ city, temperature, weatherDescription, iconCode, time, timezone, sunrise, sunset }: CurrentTempProps){

    const { setIridescenceColor } = useIridescence();
    
    React.useEffect(() => {
        if (time !== null && timezone !== null && sunrise !== null && sunset !== null) {

            if(weatherDescription != null)
            {
                const description = weatherDescription;
        
                if(description.includes("clouds") || description.includes("rain") || description.includes("drizzle") || description.includes("mist") || description.includes("fog") || description.includes("haze") || description.includes("smoke"))
                {
                    setIridescenceColor([0.2, 0.2, 0.2]);
                }
        
                else if(description.includes("thunderstorm"))
                {
                    setIridescenceColor([0.05, 0.05, 0.1]);
                }

                else if(description.includes("snow") || description.includes("sleet"))
                {
                    setIridescenceColor([0.5, 0.5, 0.5]);
                }
                
                else{

                    if (time >= sunrise && time <= sunrise + 7200) {
                        setIridescenceColor([1, 0.8, 0.5]); // Morning: orange/yellow
                        console.log("MORNING");
                    } else if (time > sunrise + 7200 && time < sunset - 14400) {
                        setIridescenceColor([0.5, 0.8, 1]); // Afternoon: blue
                        console.log("AFTERNOON");
                    } else if (time >= sunset - 14400 && time <= sunset - 7200) {
                        setIridescenceColor([0.7, 0.3, 0.3]); // Evening: pink/purple
                        console.log("EVENING");
                    } else {
                        setIridescenceColor([0.1, 0.1, 0.3]); // Night: dark blue
                        console.log("NIGHT");
                    }
                }
            }
        }

    
    }, [time, timezone, setIridescenceColor]);

    return(
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
                <img className='text-center ml-5 mb-10 size-[120px] border border-4 border-blue-200 rounded-full' src={`https://openweathermap.org/img/wn/${iconCode}@2x.png`} alt="Weather Icon" />
            </div>
        </div>
    );
}