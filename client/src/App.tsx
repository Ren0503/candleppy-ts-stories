import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'styles/layout.css';
import AuthRoutes from 'routes/AuthRoutes';
import MainRoutes from 'routes/MainRoutes';
import { ScrollToTop } from 'components/shared';


const App = () => {
  return (
    <div className="App">
      <Router>
        <ScrollToTop />
        <AuthRoutes />
        <MainRoutes />
      </Router>
    </div>
  )
}

export default App;
