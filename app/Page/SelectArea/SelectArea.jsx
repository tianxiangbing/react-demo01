import React from 'react';
let {Component} = React;
//import Styles from './SelectArea.scss';
import Dialog from '../../Component/Dialog';

import Config from 'config';

export default class SelectArea extends Component{
	constructor(props){
		super(props);
		this.currentAddr = null;
		this.map = null;
		this.marker = null;
		this.state={list:[],dialog:0};
		this.xy= [];
		this.map = null;
	}
	componentDidMount(){
		/*var scale = 1 ;
		document.querySelector('meta[name="viewport"]').setAttribute('content','initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
		document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 + 'px';*/
		this.xy=JSON.parse(localStorage.getItem('lnglatXY'));
		this.initMap();
	}
	initMap(){
		var _this = this;
		this.map = new AMap.Map(this.refs.bigMap, {
			resizeEnable: true
		});;
		var map = this.map
		AMap.service(["AMap.PlaceSearch"], function() {
			_this.placeSearch =  new AMap.PlaceSearch({ //构造地点查询类
				pageSize: 100,
				type: '汽车服务|汽车销售|汽车维修|摩托车服务|餐饮服务|购物服务|生活服务|体育休闲服务|医疗保健服务|住宿服务|风景名胜|商务住宅|政府机构及社会团体|科教文化服务|交通设施服务|金融保险服务|公司企业|道路附属设施|地名地址信息|公共设施',
                pageIndex: 1,
				map: map,
				extensions: 'base'
			});

			var placeSearch = _this.placeSearch;
			//中心点坐标
			var cpoint =JSON.parse(localStorage.getItem('lnglatXY'));
			placeSearch.setLang(cpoint);
			let content = "<div class = 'iconfont icon-qiandaodingwei mapicon'></div>";
			_this.marker = new AMap.Marker({ //加点
				map: map,
				content: content,
				position: cpoint,
				offset: new AMap.Pixel(-11, -22)
			});
			_this.marker.setAnimation('AMAP_ANIMATION_DROP');
			placeSearch.searchNearBy('', cpoint, 200, function(status, result) {
                map.setZoomAndCenter(16,cpoint);
                console.log(status,result)
                _this.setState({list:result.poiList.pois});
			});
		});
	}
	submit(){

		if(this.currentAddr){
            /*localStorage.setItem('locName', activeLoc.find('.poi-name').text());
            localStorage.setItem('locAddr', activeLoc.find('.poi-addr').text());
            localStorage.setItem('smallLng', activeLoc.attr('data-lng'));
            localStorage.setItem('smallLat', activeLoc.attr('data-lat'));
            localStorage.setItem('trimInitOneFlag', 1);*/
            //location.href = '../pages/index.html';
            localStorage.setItem('locName', this.currentAddr.name);
            localStorage.setItem('locAddr', this.currentAddr.address);
            localStorage.setItem('lnglatXY',JSON.stringify([this.currentAddr.location.lng,this.currentAddr.location.lat]));
            localStorage.setItem('isSet',1);
            //location.href="index.html";

			history.back()
        }
	}
	checkAddress(item,index){
		console.log(this.xy)
		this.state.list.forEach((obj,index)=>{
			obj.ischecked = false;
		});
		this.state.list[index].ischecked = true;
		this.setState({list:this.state.list});
		this.currentAddr = item;
		this.xy=[item.location.lng,item.location.lat];
		this.map.setCenter(this.xy);
		this.marker.setPosition(this.xy);
		this.marker.setAnimation('AMAP_ANIMATION_DROP');
	}
	reset(){
        this.setState({dialog:{show:true,msg:"正在定位中，请稍候.",type:"alert"}});
		Config.native('getPosition').then((res)=>{
			let lnglatXY = res.data;
			this.xy=lnglatXY
			this.initMap();
			this.marker.setPosition(lnglatXY);
			localStorage.setItem('lnglatXY',JSON.stringify(lnglatXY));
			setTimeout(()=>{
				this.setState({dialog:0});
			},1000)
		});
		//this.map.setCenter(JSON.parse(localStorage.getItem('lnglatXY')));
	}
	renderDialog(){
		console.log(this.state.dialog)
		return <Dialog stage={this} {...this.state.dialog}/>
	}
	render(){
		return (
			<div className="selectArea">
				<div className="mapContent">
					<div ref="bigMap" id="bigMapcontainer" className="bigMap"/>
					<i className="iconfont icon-qiandaoditufuwei" onClick={this.reset.bind(this)}/>
				</div>
				<div ref="panel" className="panel" id="panel">
					<div className="amap_lib_placeSearch">    
						<div className="amap_lib_placeSearch_list">      
							<ul>
							{this.state.list.map((item,index)=>{
								return (
								<li className={item.ischecked?"poibox  active":"poibox"} onClick={this.checkAddress.bind(this,item,index)}>
									<h3 className="poi-title">                	
									<span className="poi-name">{item.name}</span>                	
									</h3>                
									<div className="poi-info">                	
									<p className="poi-addr">地址：{item.address}</p>                
									</div> 
									<i className="iconfont icon-right-ok"/>           
								</li>
								)
							})}
							</ul>
						</div>
					</div>
				</div>
				<div className="btnBottom" onClick={this.submit.bind(this)}>确定</div>
                {this.state.dialog?this.renderDialog():undefined}
			</div>
			)
	}
}