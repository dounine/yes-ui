// @flow

import React from 'react';
import {render} from 'react-dom';
import './components/iconfont/iconfont.css';
import IndexList from './pages/index-list';
import Module from './pages/module';
import SS from './pages/SS';
import IndexGrid from './pages/index-grid';
import Header from './components/header';
import {Switch, Redirect, Router, Route} from 'react-router-dom';
import createHashHistory from 'history/createHashHistory';
import './tools/Array';

const history = createHashHistory()

let router = <Router history={history}>
    <div>
        <Route component={Header}/>
	<Route path="/" component={Module}/>
    </div>
</Router>;
render(router, document.querySelector('#root'));
