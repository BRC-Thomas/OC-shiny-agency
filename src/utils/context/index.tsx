import React, { useState, createContext, ReactNode } from 'react';

export type ThemeContextType = {
  theme: string;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<string>('light');

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export type SurveyContextType = {
  answers: Record<string, any>;
  saveAnswers: (newAnswers: Record<string, any>) => void;
};

export const SurveyContext = createContext<SurveyContextType | undefined>(undefined);

export const SurveyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [answers, setAnswers] = useState<Record<string, any>>({});

  const saveAnswers = (newAnswers: Record<string, any>) => {
    setAnswers(prevAnswers => ({ ...prevAnswers, ...newAnswers }));
  };

  return (
    <SurveyContext.Provider value={{ answers, saveAnswers }}>
      {children}
    </SurveyContext.Provider>
  );
};
