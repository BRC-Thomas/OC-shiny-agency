import { useContext } from 'react';
import { createGlobalStyle } from 'styled-components';
import { ThemeContext } from '../context';

interface GlobalStyleProps {
  isDarkMode: boolean;
}

function GlobalStyle() {
  const themeContext = useContext(ThemeContext);

  const theme = themeContext?.theme || 'light';

  return (
    <>
      <GlobalStyleComponent isDarkMode={theme === 'dark'} />
    </>
  );
}

const GlobalStyleComponent = createGlobalStyle<GlobalStyleProps>`
* {
  font-family: 'Trebuchet MS', Helvetica, sans-serif;
}

body {
  background-color: ${({ isDarkMode }) => (isDarkMode ? 'black' : 'white')};
  margin: 0;  
}
`;

export default GlobalStyle;
