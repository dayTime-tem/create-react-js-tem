import { lazy } from "react";
const pageComponents = {
    ListPage: lazy(() => new Promise(resolve => resolve(import('./listPage')))),
    EditPage: lazy(() => new Promise(resolve => resolve(import('./editPage')))),
}
export default pageComponents