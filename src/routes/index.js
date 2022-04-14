import React, {Suspense} from "react";
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import AllComponents from '../page';
import routesConfig from './config';
import { isArray } from "@/utils"
import { Spin } from "antd"

const CRouter = (props) => {
    const permissionGroup = JSON.parse(window.localStorage.getItem('permissionGroup') || "[]" )
    const createMenu = (r) => {
        const route = (r) => {
            const Component = r.component && AllComponents[r.component];
            return (
                <Route
                    key={r.route || r.key}
                    exact
                    path={r.route || r.key}
                    render={(params) =>
                        (!r.permission || (permissionGroup.includes('allPermission') || permissionGroup.includes(r.permission))) ?
                            <Component {...params} {...props} /> : <Redirect to="/404" />
                    }
                />
            );
        };
        const subRoute = r =>
            r.subs && r.subs.map(subR => subR.subs ? subRoute(subR) : route(subR))
        return r.component ? route(r) : subRoute(r)
    }
    const createRoute = (key) => routesConfig[key].map(createMenu);
    return (
        <Router>
            <Suspense fallback={<Spin spinning />}>
                <Switch>
                    {Object.keys(routesConfig).map((key) => isArray(routesConfig[key]) && createRoute(key))}
                    <Route render={() => <Redirect to="/404" />} />
                </Switch>
            </Suspense>
        </Router>
    );
}
export default React.memo(CRouter)