import React from "react";
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import AllComponents from '../page';
import routesConfig from './config';

const CRouter = (props) => {
    const permissionGroup = JSON.parse(window.localStorage.getItem('permissionGroup') || "[]" )
    const createMenu = (r) => {
        const route = (r) => {
            const Component = r.component && AllComponents[r.component];
            return (
                !r.permission || (permissionGroup.includes('allPermission') || permissionGroup.includes(r.permission)) ? (
                    <Route
                        key={r.route || r.key}
                        exact
                        path={r.route || r.key}
                        render={(params) => <Component {...params} {...props} />}
                    />
                ) : (
                    <Route render={() => <Redirect to="/404" />} />
                )
            );
        };
        const subRoute = r =>
            r.subs && r.subs.map(subR => subR.subs ? subRoute(subR) : route(subR))
        return r.component ? route(r) : subRoute(r)
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
export default React.memo(CRouter)