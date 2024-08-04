import React from 'react';
import { ThemeProvider } from '@mui/system';
import { GlobalStyle, theme } from './styled';
import { AppRoutes } from './app-routes';
import { AppProvider } from './context';

const App = (): React.ReactElement => {
    return (
        <AppProvider>
            <ThemeProvider theme={theme}>
                <GlobalStyle />
                <AppRoutes />
            </ThemeProvider>
        </AppProvider>
    );
};

export default App;
