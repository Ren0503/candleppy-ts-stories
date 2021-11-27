import React from 'react';
import { Route, Switch } from 'react-router-dom';
import DetailScreen from 'screens/Home/DetailScreen';
import HomeScreen from 'screens/Home/HomeScreen';
import EditScreen from 'screens/Settings/EditScreen';

const MainRoutes = () => {
    return (
        <Switch>
            <Route path='/search/:keyword' component={HomeScreen} exact />
            <Route path='/category/:category' component={HomeScreen} exact />
            <Route path='/story/:id/edit' component={EditScreen} exact />
            <Route path="/story/:id" component={DetailScreen} exact />
            <Route path="/" component={HomeScreen} exact />
        </Switch>
    );
};

export default MainRoutes;
