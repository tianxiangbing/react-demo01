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
//import Styles from './_App.scss';
import Config from 'config';
import cookie from 'react-cookie';
let {Component}= React;
//import 'whatwg-fetch';
import Dialog from '../../Component/Dialog';
import SignList from '../../Component/SignList';

export default class App extends Component{
	constructor(props){
		localStorage.removeItem('outInfo');
		super(props);
		this.isLocated = 0;
		this.action = 0;
		this .signType = 0;
		this.state={disabled:true,acute:false,localInfo:{},lnglatXY:null,recordList:null,showText:"正在加载数据...",corpList:[],currCorp:{},expand:false,isShowSign:false,dialog:0};
	}
	componentWillMount(){
	}
	getLngXY(){
		return Config.native('getPosition')
	}
	initMap(e){
		if(e){
			e.preventDefault();
			e.stopPropagation();
		}
		let lnglatXY;
		let map = new AMap.Map('container');
		let _this =this;
		setTimeout(()=>{
			//定位超时
			if(!this.isLocated){
				this.state.localInfo.title="";
				this.state.localInfo.desc= '';
				this.state.localInfo.status=false;
				this.setState({localInfo:this.state.localInfo});
			}
		},1000)
		this.isLocated = 0;
		this.getLngXY().then((res) => {
			if(res.code != 200)return;
			_this.setState({disabled:false});
			this.isLocated = 1;
			lnglatXY = res.data;
			let setPosition = localStorage.getItem('lnglatXY')
			if(setPosition){
				map.setZoomAndCenter(14,JSON.parse(setPosition));
				localStorage.removeItem('lnglatXY');
			}else{
				map.setZoomAndCenter(14,lnglatXY);
			}
			//map.setZoom(3);
			regeocoder();
			_this.setState({lnglatXY:lnglatXY});
            localStorage.setItem('lnglatXY',JSON.stringify(lnglatXY));
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
					offset: new AMap.Pixel(-22, -44)
				});
				//map.setFitView();
			}

			function geocoder_CallBack(data) {
				let address = data.regeocode.addressComponent; //返回地址描述
				let title = address.township + address.street + address.streetNumber;
				let desc = address.province + address.city + address.district + title;
				if(setPosition&& localStorage.getItem("locName")){
					title = localStorage.getItem("locName");
					desc = localStorage.getItem("locAddr");
				}
				_this.setState({
					localInfo: {
						title: title,
						desc: desc,
						status:true
					}
				});
			}

		});
	}
	initCorp(){
		Config.native("getorglist")/*.then((res)=>{
			console.log(res)
			return res.data;
		})*/.then((data)=>{
			data = data.data;
			this.setState({corpList:data});
			let orgId= cookie.load('orgId');
			let currCorp = {};
			if(orgId && orgId !="undefined"){
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
			this.select(currCorp);
		});
	}
	componentDidMount(){
		let _this = this;
		this.initMap();
		this.initCorp();
		this.updateTime();
		this.timer = setInterval(()=>{
			this.updateTime();
			this.initMap();
		},1000*60);

	/*	console.log('will')
		var scale = 1 / devicePixelRatio;
		document.querySelector('meta[name="viewport"]').setAttribute('content','initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
		document.documentElement.style.fontSize = document.documentElement.clientWidth / 10 + 'px';*/
	}
	componentWillUnmount() {
	    this.timer&&clearInterval(this.timer);  
	}
	select(obj){
		this.state.currCorp=obj;
		this.setState({currCorp:obj,expand:false});
		//cookie.save('orgId', obj.orgId, { path: '/' });
		localStorage.setItem('orgId',obj.orgId);
		localStorage.setItem('orgName',obj.orgName);
		this.bindSign();
		this.updateTime();
	}
	bindSign(){
		Config.ajax('getDaySign',"dateTime="+(new Date().getTime())).then((data)=>{
			data = data.data.list;
			data.result = data.map((item)=>{
				console.log(item)
				if((item.type == 0 || item.type == 1) && item.status != 0 ){
					if(item.status!=4){
						item.className ="error";
					}else if(item.status != 1 && item.status != 2){
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
			this.setState({"recordList":data});
			if(data.length==0){
				this.setState({'showText':'您还没有签到哦~'})
			}else{
				this.setState({'showText':''});
			}
		});
	}
	expandOrg(){
		this.setState({expand:!this.state.expand});
	}
	updateTime(){
		if(!this.state.currCorp.orgId)return;
		/*let param={
			orgId:this.state.currCorp.orgId
		};*/
		Config.ajax('getTime',''/*,JSON.stringify(param)*/).then((data)=>{
			console.log(data);
			if(!!data.redirect){
                location.href = data.redirect;
            }
            if(data.code == 200){
                this.setState({'time':data.data.time});
            }else{
                //AlertBox.alerts('获取时间异常');
                this.setState({dialog:{show:true,msg:"获取时间异常",type:"alert"}});
            }
		})
	}
	//显示上下班
	showSign(){
		if(!this.state.disabled){
			this.setState({isShowSign:true});
		}
	}
	submitSign(){
		this.action = 1;
		this.sign(this.signType);
	}
	sign(type){
		let _this =this;
		type = type || _this.signType;
		_this.signType=type;
		let data ={
			//token:"7d171a5fd4954f0c34345c2bbe3f8932",
			orgId:this.state.currCorp.orgId,
			orgName:this.state.currCorp.orgName,
			type:type,
			placeName:this.state.localInfo.desc,
			shortPlaceName:this.state.localInfo.title,
			longitude:this.state.lnglatXY[0],
			latitude:this.state.lnglatXY[1]
		}
		_this.setLocalStorage();
		/*//test
		location.href="#ortanomalie";
		return false;*/
		Config.ajax("sign",
		{
		  headers: {
		    'Accept': 'application/json',
		    'Content-Type': 'application/json'
		  },
		  method: 'POST',
		  body:  JSON.stringify(data),
		  urlParam:"action="+this.action
		}).then((res)=>{
			if(res.code==200){
					this.bindSign();
					_this.action =0;//reset
			}else if(res.code==1005){
				/*//地点异常
				Config.native('confirm',{title:"地点异常","desc":"当前地点不在公司范围内","ok":"确定打卡","cancel":"报告原因"}).then((res)=>{
					if(res.data=="cancel"){
						_this.setLocalStorage();
						location.href="#ortanomalie";
					}else if(res.data =="ok"){
						//强签
						_this.action = 1;
						_this.sign(type);
					}
				})*/
				this.setState({dialog:{mask:true,hide:this.hideDialog.bind(this),show:true,msg:<div className="acuteDialog"><i className="iconfont icon-qiandaodidianyichang"/><div className="title">地点异常</div><p className="info">当前地点不在公司范围内</p></div>,buttons:<div className="dialog-button"><a href="#ortanomalie">报告原因</a><a onClick={this.submitSign.bind(this)}>确认打卡</a></div>,type:"confirm"}});
			}
		})
	}
	hideOrgList(){
		this.setState({expand:false})
	}
	hideSign(){
		this.setState({isShowSign:false});
	}
	renderDialog(){
		console.log(this.state.dialog)
		return <Dialog stage={this} {...this.state.dialog}/>
	}
	setLocalStorage(e){
		if(this.state.disabled){
			e.preventDefault();
			e.stopPropagation();
			return false;
		}
		var outInfo = {
            'orgId':this.state.currCorp.orgId,
            'orgName': this.state.currCorp.orgName,
            'time': this.state.time,
            'locName': this.state.localInfo.title,
            'locFullName': this.state.localInfo.desc,
            'locLng': this.state.lnglatXY[0],
            'locLat': this.state.lnglatXY[1]
        };
        localStorage.setItem('outInfo',JSON.stringify(outInfo));
	}
	jumpSelectArea(){
		location.href="#selectarea";
	}
	hideDialog(){
		this.setState({dialog:0})
	}
	render(){
		return (
			<div className="body">
				<Helmet title="签到"/>
				<div className="header">
					<div className="orgInfo">
					{
						(()=>{
							if(this.state.corpList.length >1){
								return (<div className="focusorg" onClick={this.expandOrg.bind(this)}>{this.state.currCorp.orgName} <i className={this.state.expand?"triangle up":"triangle down"}/></div>);
							}else{
								return (<div className="focusorg">{this.state.currCorp.orgName}</div>);
							}
						})()
					}
						<div className={this.state.expand?"orgList":"orgList hide"}>
						{
							(this.state.corpList||[]).map((item)=>{
								return <div className={item.orgId==this.state.currCorp.orgId?"focusorg":""} onClick={this.select.bind(this,item)}>{item.orgName}</div>
							})
						}
						</div>
					</div>
					{
					this.state.expand?
					<div className="mask" onClick={this.hideOrgList.bind(this)}>
					</div>:null
					}
					<div className="timer">{this.state.time}</div>
					<div className="box downborder">
						<div className="mapContainer" onClick={this.jumpSelectArea.bind(this)}>
							<div ref="smallMap" id="container" className="smallMap"/>
							<div className="mapAdress">
								{
									(()=>{
										if(this.state.localInfo.status){
											return (<div><i className="iconfont icon-xiayibu"/><h2>{this.state.localInfo.title}</h2>
											<p>{this.state.localInfo.desc}</p>
											</div>)
										}else{
											return (<div  onClick={this.initMap.bind(this)}><h2>定位失败</h2><p>地点获取失败，请点击<span className="replay" >这里</span>重试</p></div>)
										}
									})()
								}
							</div>
						</div>
					</div>
				</div>
				<div className="box upborder signRecord">
					<div className="pdbtn">
					<SignList recordList = {this.state.recordList} showText={this.state.showText}/>
					</div>
				</div>
				<div className={this.state.disabled ? "bottomButton bigButton disabled": "bottomButton bigButton"}>
					<div className="button lbutton" onClick={this.showSign.bind(this)}>
						<a className="iconfont icon-qiandaokaoqindaqia"></a>
						<p>签到</p>
					</div>
					<Link to="fieldsign" onClick={this.setLocalStorage.bind(this)}>
					<div className="button rbutton">
						<a className="iconfont icon-qiandaowaiqinqiandao"></a>
						<p>外勤签到</p>
					</div>
					</Link>
				</div>
				{
				this.state.isShowSign?
				<div className="mask z-4" onClick={this.hideSign.bind(this)}>
					<div className="bottomButton smbutton">
						<div className="button lbutton" onClick={this.sign.bind(this,0)}>
							<a>上班</a>
						</div>
						<div className="button rbutton" onClick={this.sign.bind(this,1)}>
							<a>下班</a>
						</div>
					</div>
				</div>:null
				}
                {this.state.dialog?this.renderDialog():undefined}
			</div>
			)
	}
}