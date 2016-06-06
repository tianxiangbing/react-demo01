import React from 'react';
let {Component} = React;
export default class SignList extends Component{
	constructor(props){
		super(props);
	}
	formatTime(time){
		let timeStr = new Date(time);
		timeStr = ("0"+timeStr.getHours()).slice(-2)+' : '+("0"+timeStr.getMinutes()).slice(-2);
		return timeStr;
	}
	renderImg(item){
		let arr =[];
		item.images?arr=JSON.parse(item.images):undefined;
		return arr.map((img)=>{
			return <img src={img}/>
		})
	}
	render(){
		return (
				<div>
					<div className="listSign">
					{
						(this.props.recordList||[]).map((item)=>{
							return (
								<div className="item">
									<div className="time">{this.formatTime(item.time)}</div>
									<div className="desc">
										<div className="title">{item.title}</div>
										<div className="position"><i className="iconfont icon-qiandaodingwei"/>{item.shortPlaceName}</div>
										{
											(()=>{
												if(item.type==2||item.type==1){
													return <div className="remark">{item.remark}</div>
												}
											})()
										}
										<div className="imgList">
										{
											this.renderImg(item)
										}
										</div>
									</div>
								</div>
								)
						})
					}
					</div>
					<div className="nodata">{this.props.showText}</div>
				</div>
				)
	}
}