/*
 * Created with Sublime Text 3.
 * license: http://www.lovewebgames.com
 * User: 田想兵
 * Date: 2016-05-30
 * Time: 10:27:55
 * Contact: 55342775@qq.com
 */
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