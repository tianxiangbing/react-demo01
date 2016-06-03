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
import Config from '../../config/config';
import Calendar from '../../Component/Calendar';
//import Styles from './_Record.scss';
import SignList from '../../Component/SignList';

let date = '2014-10-10' //or Date.now()
export default class Record extends Component{
	constructor(props){
		super(props);
		this.state={title:'',list:[],isReady:false,expand:true,recordList:[],showText:"",focus:0,currentDate:new Date()}
	}
	componentDidMount(){
		let now = new Date();
		let _this = this;
		let dateStr=now.getFullYear()+"年"+(now.getMonth()+1)+"月"
    	this.setState({title:dateStr})
		this.getMonthDate();
	}
	getMonthDate(){
		let _this = this;
		Config.ajax('historyOfMonth',"").then((res)=>{
			if(res.code ==200){
				_this.setState({list:res.data.list,isReady:true});
				_this.tab(0 ,new Date());
			}
		});
	}
    expand(){
    	this.setState({expand:!this.state.expand});
    }
    tab(index,date){
    	console.log(date)
    	date = new Date(date).getTime();
    	this.setState({currentDate:date,focus:index});
    	let param = 'dateTime='+date;
    	if(index ==0){
	    	Config.ajax('getDaySign',param).then((data)=>{
	    		this.renderList(data.result,'您还没有签到哦~');
			});
		}else{
			//他人外勤
			Config.ajax('historyOfDay',param).then((data)=>{
	    		this.renderList(data.data.list,'本日没有他人的外勤记录~');
			});
		}
    }
    renderList(data,text){
    	this.setState({"recordList":data});
		data = data.map((item)=>{
			if((item.type == 0 || item.type == 1) && item.status != 0 ){
				if(item.status!=4){
					item.className ="error";
				}else if(item.status != 1 && d[j].status != 2){
					item.className ="loc-error";
				}
			}
			if(item.type==0){
				if(item.status == 0 || item.status ==4){
					item.title="上班打卡"
				}else{
					item.title="上班迟到";
				}
			}else if(item.type ==1){
				if(item.status == 0 || item.status ==4){
					item.title="下班打卡"
				}else{
					item.title="下班早退";
				}
			}else if(item.type ==2){
				item.title="外勤签到"
			}
			return item;
		});
		if(data.length==0){
			this.setState({'showText':text})
		}else{
			this.setState({'showText':''});
		}
    }
    parentDayClick(d){
    	console.log(d);
    	this.tab(0,d);
    }
	render(){
		return (
			<div className="body">
				<Helmet title="记录" />
				<div className="topContainer">
					<div className="dateContainer"> 
					{this.state.expand?<Calendar parentDayClick={this.parentDayClick.bind(this)} list = {this.state.list} parentCallback={this.getMonthDate.bind(this)} myTitle={this.state.title}/>:undefined}
					</div>
					<div className="tagTips">
						<div className="tag tag-err">
						<i/>
						异常
						</div>
						<div className="tag tag-ok">
						<i/>
						正常
						</div>
						<div className="expandCalendar" onClick={this.expand.bind(this)}>{this.state.expand?<span><i className="iconfont icon-hebing"/>收起</span>:<span><i className="iconfont icon-zhankai" />展开</span>}</div>
					</div>
				</div>
				<div className="recordList">
					<div className="space">&nbsp;</div>
					<div className="tabContainer">
						<div className="tabTitle">
							<div className={this.state.focus==0?"tab focus":"tab"} onClick={this.tab.bind(this,0,this.state.currentDate)}>我的签到</div>
							<div className={this.state.focus==1?"tab focus":"tab"} onClick={this.tab.bind(this,1,this.state.currentDate)}>他人外勤</div>
						</div>
						<SignList recordList = {this.state.recordList} showText={this.state.showText}/>
					</div>
				</div>
			</div>
			)
	}
}