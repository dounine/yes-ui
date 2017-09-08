// @flow

import React from 'react';
import {render} from 'react-dom';
import IndexList from './pages/index-list';
import Module from './pages/module';
import IndexGrid from './pages/index-grid';
import Header from './components/header';
import {Switch, Redirect, Router, Route} from 'react-router-dom';
import createHashHistory from 'history/createHashHistory';

const history = createHashHistory()

let router = <Router history={history}>
    <div>
        <Route path="/module/:name" component={Module}/>
        {/*<Route component={Header}/>*/}
        {/*<Route path="/list/:group/:size/:page" component={IndexList}/>*/}
        {/*<Switch>*/}
            {/*<Redirect exact from="/" to="/list/all/20/1"/>*/}
            {/*<Route path="/grid/:group/:size/:page" component={IndexGrid}/>*/}
        {/*</Switch>*/}
    </div>
</Router>;
render(router, document.querySelector('#root'));
