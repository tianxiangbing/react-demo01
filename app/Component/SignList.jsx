import React from 'react';
import Config from 'config';
import UsesrAvatar from './UserAvatar';

let {Component} = React;
export default class SignList extends Component{
	constructor(props){
		super(props);
	}
	componentDidMount(){
		//alert(JSON.stringify(this.props.recordList) )
		console.log(JSON.stringify(this.props.recordList))
	}
	formatTime(time){
		let timeStr = new Date(time);
		timeStr = ("0"+timeStr.getHours()).slice(-2)+':'+("0"+timeStr.getMinutes()).slice(-2);
		return timeStr;
	}
	showImage(position,arr){
		Config.native('showImage',{position:position,picsArr:arr});
	}
	renderImg(item){
		let arr =[];
		if(typeof item.images=="string"){
			//alert(item.images)
			arr=JSON.parse(item.images.replace(/\\/gi,''))
		}else if(typeof item.images=="object"){
			arr=item.images;
		}
		if(arr.length >0){
			return <div className="imgList">{(arr).map((img,index)=>{
				return <img src={img} onClick={this.showImage.bind(this,index,arr)}/>
			})}</div>
		}
	}
	render(){
		return (
				<div>
					<div className="listSign">
					{
						(this.props.recordList||[]).map((item)=>{
							return (
								<div className={this.props.index !=1 ?"item "+item.className :"item "+item.className + " item2" }>
									<div className="time">{this.formatTime(item.time)}</div>
									<div className="desc">
										{
											(()=>{
												if(this.props.index ==1){
													return (
														<div className="title">
															<div className="userAvatar">
																<UsesrAvatar item={item} userName={item.userName}/>
															</div>
															{item.userName}
														</div>
														);
												}else{
													return (<div className="title">{item.title}</div>);
												}
											})()
										}
										
										<div className="position"><i className="iconfont icon-qiandaodingwei"/>{item.shortPlaceName}</div>
										{
											(()=>{
												if(item.remark){
													return <div className="remark">{item.remark}</div>
												}
											})()
										}
										
										{
											this.renderImg(item)
										}
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