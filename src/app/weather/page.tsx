"use client";

import Weather from "../components/weather";


export default function WeatherPage() {
  return (    
    <div className="relative w-full">
      <div className="container mx-auto px-4 py-8">
        <section id="home" className="min-h-screen flex items-center justify-center">
            <Weather />
        </section>
      </div>
    </div>

  );
}