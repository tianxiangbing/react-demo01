import React from 'react';
import {Link} from 'react-router';
import Helmet from "react-helmet";

let {Component}= React;

export default class App extends Component{
	render(){
		return (
			<div><Helmet title="My Title" />hello
			<Link to="/record">/record</Link>
			</div>
			)
	}
}