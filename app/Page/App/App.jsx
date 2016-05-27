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
		this.state={localInfo:{},recordList:null,showText:"正在加载数据...",corpList:[],currCorp:{}};
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
			this.setState({currCorp:currCorp})
		});
	}
	componentDidMount(){
		this.initMap();
		this.initCorp();
	}
	render(){
		return (
			<div className="body">
				<Helmet title="签到"/>
				<div className="orgInfo">
					<div>{this.state.currCorp.orgName}</div>
						<div className="orgList">
						{
							(this.state.corpList||[]).map((item)=>{
								return <div>{item.orgName}</div>
							})
						}
						</div>
					</div>
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
					<div className="listSign"></div>
					<div className="nodata">{this.state.showText}</div>
				</div>
			</div>
			)
	}
}