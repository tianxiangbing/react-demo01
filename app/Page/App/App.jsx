import React from 'react';
import {Link} from 'react-router';
import Helmet from "react-helmet";
import Styles from './_App.scss';

let {Component}= React;

export default class App extends Component{
	constructor(props){
		super(props);
		this.state={localInfo:{}};
	}
	componentDidMount(){
		var map = new AMap.Map('container');
	    map.setZoom(10);
	    let lnglatXY = [116.396574, 39.992706];
	    map.setCenter(lnglatXY);
	    regeocoder();
	    var _this =this;
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
			var marker = new AMap.Marker({ //加点
				map: map,
				position: lnglatXY
			});
			map.setFitView();
		}

		function geocoder_CallBack(data) {
			let address = data.regeocode.addressComponent; //返回地址描述
			let title = address.township + address.street + address.streetNumber;
			let	desc = address.province + address.city + address.district + title;
			_this.setState({localInfo:{title:title,desc:desc}});
		}
	}
	render(){
		return (
			<div>
				<Helmet title="签到"
                />
				<Link to="/record">/record</Link>
				<div className="box downborder">
					<div className="mapContainer">
						<div ref="smallMap" id="container" className="smallMap"/>
						<div className="mapAdress">
							<h2>{this.state.localInfo.title}</h2>
							<p>{this.state.localInfo.desc}</p>
						</div>
					</div>
				</div>
			</div>
			)
	}
}