import React from 'react';
import { Route, Switch } from 'react-router-dom';
import {
    HomeScreen,
    DetailScreen,
    AuthorScreen
} from 'screens/Home';

const HomeRoutes = () => {
    return (
        <Switch>
            <Route path='/search/:keyword' component={HomeScreen} exact />
            <Route path='/category/:category' component={HomeScreen} exact />
            <Route path="/story/:id" component={DetailScreen} exact />
            <Route path='/user/:id' component={AuthorScreen} exact />
            <Route path="/" component={HomeScreen} exact />
        </Switch>
    );
};

export default HomeRoutes;
