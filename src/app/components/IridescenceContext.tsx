'use client';

import React, { createContext, useContext } from 'react';

type Color = [number, number, number];
type IridescenceContextType = {
  iridescenceColor: Color;
  setIridescenceColor: React.Dispatch<React.SetStateAction<Color>>;
};

export const IridescenceContext = createContext<IridescenceContextType | undefined>(undefined);

export const useIridescence = () => {
  const context = useContext(IridescenceContext);
  if (!context) throw new Error('useIridescence must be used within IridescenceContext.Provider');
  return context;
}; 