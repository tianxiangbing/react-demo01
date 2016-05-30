/*
 * Created with Sublime Text 3.
 * license: http://www.lovewebgames.com
 * User: 田想兵
 * Date: 2016-05-30
 * Time: 10:27:55
 * Contact: 55342775@qq.com
 */
import React from 'react';
import {Link} from 'react-router';
import Helmet from "react-helmet";
import Styles from './_App.scss';
import Config from '../../config/config';
import cookie from 'react-cookie';
let {Component}= React;
import 'whatwg-fetch';


export default class App extends Component{
	constructor(props){
		super(props);
		this.state={localInfo:{},recordList:null,showText:"正在加载数据...",corpList:[],currCorp:{},expand:false};
	}
	getLngXY(){
		return Config.native('getPosition')
	}
	initMap(){
		let lnglatXY;
		let map = new AMap.Map('container');
		let _this =this;
		this.getLngXY().then((res) => {
			map.setZoom(10);
			lnglatXY = res.data;
			map.setCenter(lnglatXY);
			regeocoder();

			function regeocoder() { //逆地理编码
				var geocoder = new AMap.Geocoder({
					radius: 1000,
					extensions: "all"
				});
				geocoder.getAddress(lnglatXY, function(status, result) {
					if (status === 'complete' && result.info === 'OK') {
						geocoder_CallBack(result);
					}
				});
				let content = "<div class = 'iconfont icon-qiandaodingwei mapicon'></div>";
				let marker = new AMap.Marker({ //加点
					map: map,
					content: content,
					position: lnglatXY,
					offset: new AMap.Pixel(-11, -22)
				});
				map.setFitView();
			}

			function geocoder_CallBack(data) {
				let address = data.regeocode.addressComponent; //返回地址描述
				let title = address.township + address.street + address.streetNumber;
				let desc = address.province + address.city + address.district + title;
				_this.setState({
					localInfo: {
						title: title,
						desc: desc
					}
				});
			}

		});
	}
	initCorp(){
		Config.native("getorglist").then((res)=>{
			console.log(res)
			return res.data;
		}).then((data)=>{
			this.setState({corpList:data});
			let orgId= cookie.load('orgId');
			let currCorp = {};
			if(orgId){
				data.forEach((item)=>{
					if(orgId==item.orgId){
						currCorp = item;
						//this.setState({currCorp:item});
					}
				})
			}else{
				currCorp = data[0];
				//this.setState({currCorp:data[0]});
			}
			//this.setState({currCorp:currCorp});
			//cookie.save('orgId', currCorp.orgId, { path: '/' });
			this.select(currCorp);
		});
	}
	componentDidMount(){
		this.initMap();
		this.initCorp();
		this.updateTime();
		this.timer = setInterval(()=>{
			this.updateTime();
			this.initMap();
		},1000*60);
	}
	componentWillUnmount() {
	    this.timer&&clearInterval(this.timer);  
	}
	select(obj){
		console.log(arguments)
		this.state.currCorp=obj;
		this.setState({currCorp:obj,expand:false});
		cookie.save('orgId', obj.orgId, { path: '/' });
		this.bindSign();
	}
	bindSign(){
		Config.ajax('getDaySign').then((data)=>{
			console.log(data.result)
			data.result = data.result.map((item)=>{
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
				}else if(item.type ==1){
					item.title="外勤签到"
				}
				return item;
			})
			this.setState({'showText':'',"recordList":data.result});
		});
	}
	expandOrg(){
		this.setState({expand:!this.state.expand});
	}
	updateTime(){
		Config.ajax('getTime').then((data)=>{
			console.log(data);
			if(!!data.redirect){
                location.href = data.redirect;
            }
            if(data.code == 0){
                var result = data.result[0];
                this.setState({'time':result});
            }else{
                //AlertBox.alerts('获取时间异常');
            }
		})
	}
	render(){
		return (
			<div className="body">
				<Helmet title="签到"/>
				<div className="orgInfo">
					<div className="focus" onClick={this.expandOrg.bind(this)}>{this.state.currCorp.orgName} <i className={this.state.expand?"triangle up":"triangle down"}/></div>
					{
						this.state.expand?
					<div className="orgList">
					{
						(this.state.corpList||[]).map((item)=>{
							return <div className={item.orgId==this.state.currCorp.orgId?"focus":""} onClick={this.select.bind(this,item)}>{item.orgName}</div>
						})
					}
					</div>
					:null
					}
				</div>
				{
				this.state.expand?
				<div className="mask">
				</div>:null
				}
				<div className="timer">{this.state.time}</div>
				<div className="box downborder">
					<div className="mapContainer">
						<div ref="smallMap" id="container" className="smallMap"/>
						<div className="mapAdress">
							<h2>{this.state.localInfo.title}</h2>
							<p>{this.state.localInfo.desc}</p>
						</div>
					</div>
				</div>
				<div className="box upborder signRecord">
					<div className="listSign">
					{
						(this.state.recordList||[]).map((item)=>{
							return (
								<div className="item">
									<div className="time">{item.formatTime}</div>
									<div className="desc">
										<div className="title">{item.title}</div>
										<div className="position"><i/>{item.shortPlaceName}</div>
									</div>
								</div>
								)
						})
					}
					</div>
					<div className="nodata">{this.state.showText}</div>
				</div>
			</div>
			)
	}
}