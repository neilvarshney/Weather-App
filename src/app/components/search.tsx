'use client';

import Select from "react-select";
import { useState } from "react";
import type { StylesConfig, GroupBase } from 'react-select';

export default function Search() {

  interface CityOption {
    value: string; // The unique identifier for react-select
    label: string; // What's displayed
    name: string;  // Actual city name
    lat: string;   // Latitude
    lon: string;   // Longitude
    state?: string;
    country?: string;
  }

  const [data, setData] = useState<any>(null);
  const [inputValue, setInputValue] = useState('');
  const [selectedCity, setSelectedCity] = useState<CityOption | null>(null);


  const customStyles: StylesConfig<any, false, GroupBase<any>> = {
    control: (provided) => ({
      ...provided,
      textAlign: 'center',
      width: '500px',
      borderRadius: '1rem',
      borderColor: '#3b82f6',
      minHeight: '48px',
    }),
    option: (provided, state) => ({
      ...provided,
      fontFamily: 'Poppins',
      borderRadius: '1rem',
      backgroundColor: state.isFocused ? '#bfdbfe' : 'white', // Tailwind blue-100
      color: '#1e293b', // Tailwind slate-800
    }),
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    fetchCities(inputValue);
  };

  const handleSelectButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if(selectedCity)
    {
      window.location.href = `/weather?city=${encodeURIComponent(selectedCity.name)}&lat=${selectedCity.lat}&lon=${selectedCity.lon}`;
    }
  
  };

  const fetchCities = async (cityValue: string) => {
    const url = `http://localhost:5000/cities/${cityValue}`

    const response = await fetch(url, 
      {
        method: 'GET',
      }
    );

    const result = await response.json();
    setData(result);
    setSelectedCity(null);
  };

  const cityListVisible = !!(data && data.weather_data && Array.isArray(data.weather_data));

  return (
    <div className="flex min-h-screen justify-center items-center sm:p-20 flex-col">
      <form
        id="loginForm"
        className={`flex flex-col gap-4 justify-center items-center transition-all duration-800 ease-in-out ${cityListVisible ? '-mt-16' : 'mt-0'}`}
      >
        <input
          type = "text"
          value = {inputValue}
          onChange={handleInputChange}
          className="w-full sm:w-76 md:w-96 lg:w-152 bg-white border hover:border-green-500 transition-border duration-500 ease-in-out p-2 rounded-xl text-black"
          id="cityInput"
          name="cityInput"
          placeholder="Enter city..."
        />
        
        <button
          onClick={handleButtonClick}
          id="submitButton"
          type="submit"
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-800 duration-500 ease-in-out"
        >
          Enter
        </button>
      </form>
      {/* Render city list if available */}
      {data && data.weather_data && Array.isArray(data.weather_data) && (
        <div className="flex flex-col gap-4 justify-center items-center mt-8">
          <h2 className="text-center text-lg font-bold mb-2">Select City:</h2>
          <Select
            value={selectedCity}
            onChange={setSelectedCity}
            options={data.weather_data.map((city: any) => ({
              value: city.name,
              label: `${city.name}${city.state ? ', ' + city.state : ''}${city.country ? ', ' + city.country : ''}`,
              name: city.name,
              lat: city.lat,
              lon: city.lon,
              state: city.state,
              country: city.country,
            }))}
            styles={customStyles}
          />
          <button
            onClick={handleSelectButtonClick}
            id="submitButton"
            type="submit"
            className="items-center p-4 px-10 bg-blue-500 text-white rounded hover:bg-blue-800 duration-500 ease-in-out"
            >
              Select
          </button>
        </div>
      )}
    </div>
  );
}