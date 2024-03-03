import React from 'react';
import { ThemeProvider } from '@mui/system';
import { GlobalStyle, theme } from './styled';
// import { AppRoutes } from './App-routes';
import styled from 'styled-components';
import { Imperatus } from './components/svg';

const App = (): React.ReactElement => {
  return (
    <ThemeProvider theme={theme}>
       <GlobalStyle />
       {/* <AppRoutes /> */}
       <AppContainer >
        <Imperatus width={500} height={250} />
        <p>
          Website currently under construction
        </p>
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;

const AppContainer = styled.div`
  background-color: #10000E;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  p{ 
    color: white;
  }
`;