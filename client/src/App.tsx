import React from 'react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'styles/Layout';
import { theme } from 'styles/theme';
import { Header, Footer } from 'components/core';
import { GlobalStyle } from 'styles/GlobalStyles';


const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyle />
        <Header />
        <Container>
          <p>Hello World</p>
        </Container>
        <Footer />
      </>
    </ThemeProvider>
  )
}

export default App;
