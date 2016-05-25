import React from 'react';
let {Component} = React;
import Helmet from "react-helmet";

export default class Record extends Component{
	render(){
		return (
			<div>
			<Helmet title="记录" />
			RECORD<a href="#/">index</a></div>
			)
	}
}