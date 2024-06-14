import React from 'react';
import { ThemeProvider } from '@mui/system';
import { GlobalStyle, theme } from './styled';
import { AppRoutes } from './app-routes';

const App = (): React.ReactElement => {
  return (
    <ThemeProvider theme={theme}>
       <GlobalStyle />
       <AppRoutes />
    </ThemeProvider>
  );
}

export default App;
