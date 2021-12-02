import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import 'styles/layout.css';
import AuthRoutes from 'routes/AuthRoutes';
import HomeRoutes from 'routes/HomeRoutes';
import { ScrollToTop } from 'components/shared';
import SettingRoutes from 'routes/SettingRoutes';

const App = () => {
  return (
    <div className="App">
      <Router>
        <ScrollToTop />
        <AuthRoutes />
        <HomeRoutes />
        <SettingRoutes />
      </Router>
    </div>
  )
}

export default App;
