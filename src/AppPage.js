/**
 * @Author: dayTimeAffect
 * @Date: 2021/5/27
 */
import React from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from './page/login';
import App from './App';
import ErrorPage from './page/ErrorPage/ErrorPage'


const AppPage =  () => (
    <Router>
        <Switch>
            <Route exact path="/" render={() => <Redirect to="/login" push />} />
            <Route path="/app" component={App} />
            <Route path="/404" component={ErrorPage} />
            <Route path="/login" component={Login} />
            <Route component={ErrorPage} />
        </Switch>
    </Router>
);
export default AppPage