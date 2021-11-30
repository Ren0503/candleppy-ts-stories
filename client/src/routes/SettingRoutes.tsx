import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { 
    AddStoryScreen,
    CollectionScreen, 
    DashboardScreen, 
    EditScreen, 
    ProfileScreen 
} from 'screens/Settings';

const SettingRoutes = () => {
    return (
        <Switch>
            <Route path="/collection/:id" component={CollectionScreen} exact />
            <Route path="/dashboard" component={DashboardScreen} exact />
            <Route path="/story/:id/edit" component={EditScreen} exact />
            <Route path="/add/:id" component={AddStoryScreen} exact />
            <Route path="/profile" component={ProfileScreen} exact />
        </Switch>
    );
};

export default SettingRoutes;
