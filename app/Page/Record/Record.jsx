/*
 * Created with Sublime Text 3.
 * license: http://www.lovewebgames.com
 * User: 田想兵
 * Date: 2016-05-30
 * Time: 10:27:55
 * Contact: 55342775@qq.com
 */
import React from 'react';
let {
	Component
} = React;
import Helmet from "react-helmet";
import Config from 'config';
import Calendar from '../../Component/Calendar';
//import Styles from './_Record.scss';
import SignList from '../../Component/SignList';

let date = '2014-10-10' //or Date.now()
export default class Record extends Component {
	constructor(props) {
		super(props);
		this.state = {
				title: '',
				list: [],
				isReady: false,
				expand: true,
				recordList: [],
				showText: "",
				focus: 0,
				currentDate: new Date()
				,top:720
			}
			/*var scale = 1 / devicePixelRatio;
			document.querySelector('meta[name="viewport"]').setAttribute('content','initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
			document.documentElement.style.fontSize = document.documentElement.clientWidth / 10 + 'px';*/
	}
	componentDidMount() {
		let now = new Date();
		this.getMonthDate(now);
		setInterval(()=>{
			this.resetTop();
		},50)
	}
	getMonthDate(d) {
		let _this = this;
		let now = new Date(d);
		var NOW = new Date();
		let start = new Date(NOW.getFullYear(), NOW.getMonth(), 1);
		let end = new Date(now.getFullYear(), now.getMonth(), 1);
		if (start < end) {
			_this.setState({
				list: [],
				isReady: true
			});
			this.setState({
				title: now.getFullYear() + "年" + (now.getMonth() + 1) + "月" + " (共签到0天)"
			})
			return;
		}
		_this.setState({
						list: []
					});
		let dateStr = now.getFullYear() + "年" + (now.getMonth() + 1) + "月" + " (共签到0天)"
			//let dateStr=now.getFullYear()+"年"+(now.getMonth()+1)+"月"+" (共签到"+this.state.list.length+"天)"
		_this.setState({
			title: dateStr
		});
		Config.ajax('historyOfMonth', "dateTime=" + (new Date(d).getTime())).then((res) => {
			if (res.code == 200) {
				_this.setState({
					list: res.data.list,
					isReady: true
				});
				_this.tab(0, new Date());
				let count = 0;
				this.state.list.forEach((item)=>{
					if(item!=0&&item!=256){
						count++;
					}
				})

				let dateStr = now.getFullYear() + "年" + (now.getMonth() + 1) + "月" + " (共签到" + count + "天)"
					//let dateStr=now.getFullYear()+"年"+(now.getMonth()+1)+"月"+" (共签到"+this.state.list.length+"天)"
				_this.setState({
					title: dateStr
				});
					//document.querySelector('.DayPicker-Caption').innerHTML=dateStr;
			}
		});
	}
	resetTop(){
		document.querySelector('.topContainer').offsetHeight
		let tabTitle = document.querySelector('.tabTitle');
		let top =tabTitle.offsetTop;
		let height = tabTitle.offsetHeight;
		this.setState({top:top+height});
	}
	expand() {
		this.setState({
			expand: !this.state.expand
		});
	}
	tab(index, date) {
		console.log(date)
		date = new Date(date).getTime();
		this.setState({
			currentDate: date,
			focus: index
		});
		let param = "dateTime=" + date;
		if (index == 0) {
			Config.ajax('getDaySign', param).then((data) => {
				this.renderList(data.data.list, '您还没有签到哦~');
			});
		} else {
			//他人外勤
			Config.ajax('historyOfDay', param).then((data) => {
				this.renderList(data.data.list, '本日没有他人的外勤记录~');
			});
		}
	}
	renderList(data, text) {
		this.setState({
			"recordList": data
		});
		data = data.map((item) => {
			switch (item.type) {
				case 2:
					{
						item.title = "外勤签到"
						break;
					}
				case 0:
					{
						if ((item.status & 1) != 0) {
							item.title = "上班迟到";
							item.className = "error";
						} else {
							item.title = "上班打卡"
						}
						if ((item.status & 4) != 0) {
							item.className += " loc-error";
						}
						break;
					}
				case 1:
					{
						if((item.status&2)!=0){
							item.title="下班早退";
							item.className ="error";
						}else if((item.status&8)!=0){
							item.title="下班打卡（次日签到）";
						}else{
							item.title="下班打卡"
						}
						if((item.status&4)!=0){
							item.className +=" loc-error";
						}
						break;
					}
			}
			return item;
		});
		if (data.length == 0) {
			this.setState({
				'showText': text
			})
		} else {
			this.setState({
				'showText': ''
			});
		}
	}
	parentDayClick(d) {
		this.tab(0, d);
	}
	render() {
		return (
			<div className="body record-body">
				<Helmet title="签到记录" />
				<div className="topContainer">
					<div className="dateContainer"> 
					{this.state.expand?<Calendar parentDayClick={this.parentDayClick.bind(this)} list = {this.state.list} parentCallback={this.getMonthDate.bind(this)} myTitle={this.state.title}/>:undefined}
					</div>
					{
						this.state.expand?<div className="tagTips">
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
						:<div className="tagTips"><div className="tag">{
							(()=>{
								let date = new Date(this.state.currentDate);
								return date.getFullYear()+"年"+(date.getMonth()+1)+"月"+date.getDate()+"日";
							})()
						}</div><div className="expandCalendar" onClick={this.expand.bind(this)}>{this.state.expand?<span><i className="iconfont icon-hebing"/>收起</span>:<span><i className="iconfont icon-zhankai" />展开</span>}</div></div>
					}
					
				</div>
				<div className="recordList">
					<div className="tabContainer">
						<div className="tabTitle">
							<div className={this.state.focus==0?"tab focus":"tab"} onClick={this.tab.bind(this,0,this.state.currentDate)}>我的签到</div>
							<div className={this.state.focus==1?"tab focus":"tab"} onClick={this.tab.bind(this,1,this.state.currentDate)}>他人外勤</div>
						</div>
						<div className="mylist" style={{top:this.state.top}}>
							<SignList recordList = {this.state.recordList} showText={this.state.showText} index={this.state.focus}/>
						</div>
					</div>
				</div>
			</div>
		)
	}
}