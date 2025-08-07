'use client';

import React from 'react';
import './globals.css';
import type { ReactNode } from 'react';
import { Header } from './components/header'
import Iridescence from './components/iridescence';
import { useState } from 'react';
import { IridescenceContext } from './components/IridescenceContext';

// export const metadata = {
//   title: 'Weather App',
//   description: 'A simple weather app built with Next.js',
// };


export default function RootLayout({ children }: { children: ReactNode }) {

  type color12 = [number, number, number];
  const myColor: color12 = [1, 0.6, 0.3];

  const [iridescenceColor, setIridescenceColor] = useState<color12>([1, 0.6, 0.3]);

  return (
    <html lang="en">
      <body>
        <div className="fixed inset-0 -z-10">
          <Iridescence
            color={iridescenceColor}
            mouseReact={false}
            amplitude={0.1}
            speed={0.3}
          />
        </div>
          <Header />
          <IridescenceContext.Provider value={{ iridescenceColor, setIridescenceColor }}>
            {children}
          </IridescenceContext.Provider>
      </body>
    </html>
  );
}