import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomeScreen from 'screens/Home/HomeScreen';

const MainRoutes = () => {
    return (
        <Switch>
            <Route path="/" component={HomeScreen} exact />
        </Switch>
    );
};

export default MainRoutes;
