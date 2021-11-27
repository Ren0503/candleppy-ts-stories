import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginScreen from 'screens/Auth/LoginScreen';
import RegisterScreen from 'screens/Auth/RegisterScreen';

const AuthRoutes = () => {
    return (
        <Switch>
            <Route path='/login' component={LoginScreen} />
            <Route path='/register' component={RegisterScreen} />
        </Switch>
    );
};

export default AuthRoutes;
