/*
 * Created with Sublime Text 3.
 * license: http://www.lovewebgames.com
 * User: 田想兵
 * Date: 2016-05-30
 * Time: 10:27:55
 * Contact: 55342775@qq.com
 */
"use strict";
import React  from 'react';
import Helmet from "react-helmet";
import Styles from './_FieldSign.scss';
let {Component}=React;

//外勤签到
export default class Fieldsign extends Component{
	constructor(props){
		super(props)
		this.outInfo=JSON.parse(localStorage.getItem('outInfo'));
		this.state={text:''};
	}
	utf16toEntities(str) {
		var patt = /[\ud800-\udbff][\udc00-\udfff]/g; // 检测utf16字符正则
		str = str.replace(/(^\s*)|(\s*$)/g,"");
		str = str.replace(patt, '');
		return str;
	}
	changeText(e){
		debugger;
	}
	render(){
		return (
			<div className="body">
				<div className="formBox">
					<div className="row">
						<div className="label">签到地点:</div>
						<div className="info">{this.outInfo.locName}</div>
					</div>
					<div className="row">
						<div className="label">签到时间:</div>
						<div className="info">{this.outInfo.time}</div>
					</div>
					<div className="row">
						<div className="label">当前企业:</div>
						<div className="info">{this.outInfo.orgName}</div>
					</div>
				</div>
				<div className="formBox">
					<textarea onChange={this.changeText.bind(this)}>{this.state.text}</textarea>
					<div className="upload-list">
					</div>
					<div className="upload-btn"></div>
				</div>
				<div className="formBox">
					<div className="addUser">添加可查看人员<span>本部门<i/>></span></div>
				</div>
				<div className="btnBottom">提交</div>
			</div>
			)
	}
}