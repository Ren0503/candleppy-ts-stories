import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Header, Footer } from 'components/core';


const App = () => {
  return (
    <Router>
      <Header />
      <Footer />
    </Router>
  )
}

export default App;
