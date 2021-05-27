import React from "react";
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import AllComponents from '../page';
import routesConfig from './config';

const CRouter = (props) => {
    const createMenu = (r) => {
        const route = (r) => {
            const Component = r.component && AllComponents[r.component];
            return (
                <Route
                    key={r.route || r.key}
                    exact
                    path={r.route || r.key}
                    render={(props) => <Component {...props} />}
                />
            );
        };
        return r.component ? route(r) : null
    }
    const createRoute = (key) => routesConfig[key].map(createMenu);
    return (
        <Router>
            <Switch>
                {Object.keys(routesConfig).map((key) => createRoute(key))}
                <Route render={() => <Redirect to="/404" />} />
            </Switch>
        </Router>
    );
}
export default CRouter