import React from 'react';
import { ThemeProvider } from '@mui/system';
import { GlobalStyle, theme } from './styled';
import { AppRoutes } from './app-routes';
import { AppProvider } from './context';
import { ScrollToTop } from './components/scroll-to-top';


const App = (): React.ReactElement => {
    return (
        <AppProvider>
            <ThemeProvider theme={theme}>
                <GlobalStyle />
                <ScrollToTop />
                <AppRoutes />
            </ThemeProvider>
        </AppProvider>
    );
};

export default App;
