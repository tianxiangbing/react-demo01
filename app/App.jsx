import React, { Component } from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, Link, IndexLink, hashHistory } from 'react-router'

import App from './page/App/App';
import Record from './page/Record/Record';

render((
  <Router history={hashHistory}>
    <Route path="/" component={App}/>
    <Route path="/record" component={Record}/>
  </Router>
), document.getElementById('app'))
