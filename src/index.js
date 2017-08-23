// @flow

import React from 'react';
import { render } from 'react-dom';
import IndexList from './pages/index-list';
import IndexGrid from './pages/index-grid';
import Header from './components/header';
import {Switch,Redirect,Router,Route} from 'react-router-dom';
import createHashHistory from 'history/createHashHistory';
const history = createHashHistory()

let router = <Router history={history}>
    <div>
        <Route component={Header}/>
        <Route path="/list" component={IndexList}/>
        <Switch>
            <Redirect exact from="/" to="/list"/>
            <Route path="/grid" component={IndexGrid}/>
        </Switch>
    </div>
</Router>;
render(router, document.querySelector('#root'));
