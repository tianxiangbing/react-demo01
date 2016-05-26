import React, { Component } from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, Link, IndexLink, hashHistory } from 'react-router'

import Styles from './_App.scss';
import App from './page/App/App';
import Record from './page/Record/Record';
import Fieldsign from './page/Fieldsign/Fieldsign';

document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 + 'px';

render((
  <Router history={hashHistory}>
    <Route path="/" component={App}/>
    <Route path="/record" component={Record}/>
    <Route path="/fieldsign" component={Fieldsign}/>
  </Router>
), document.getElementById('app'))
