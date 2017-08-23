// @flow

import React from 'react';
import { render } from 'react-dom';
import IndexList from './pages/index-list';
import IndexGrid from './pages/index-grid';
import Header from './components/header';
import {Redirect,Router,Route} from 'react-router-dom';
import createHashHistory from 'history/createHashHistory';
const history = createHashHistory()
let router = <Router history={history}>
    <div>
        <Route component={Header}/>
        <Route exact path="/" component={IndexGrid}/>
        <Route path="/grid" component={IndexGrid}/>
        <Route path="/list" component={IndexList}/>
    </div>
</Router>;
render(router, document.querySelector('#root'));
