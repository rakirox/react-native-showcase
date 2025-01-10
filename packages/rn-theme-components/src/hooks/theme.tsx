import React, {PropsWithChildren, useState} from 'react';

import {THEME, ThemeInterface} from '../constants/theme';

export type ThemeContextType = {
  theme: ThemeInterface;
};

export const ThemeContext = React.createContext<ThemeContextType>({
  theme: THEME,
});

type ThemeProps = PropsWithChildren<ThemeContextType>;

const ThemeProvider = ({children, theme = THEME}: ThemeProps) => {
  return (
    <ThemeContext.Provider value={{theme}}>{children}</ThemeContext.Provider>
  );
};

export function useTheme(): ThemeInterface {
  const {theme} = React.useContext(ThemeContext);
  return theme;
}

export type ThemeColorType = 'light' | 'dark';

// Implement Example:
// const { theme } = useDarkMode()
//   const appTheme = useMemo(() => (
//     theme === 'light' ? light : dark
//   ), [theme])

export const useDarkMode = () => {
  const [theme, setTheme] = useState<ThemeColorType>('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return {theme, toggleTheme};
};

export default ThemeProvider;
