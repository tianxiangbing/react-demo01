import React from 'react';
let {Component} = React;
export default class SignList extends Component{
	constructor(props){
		super(props);
	}
	render(){
		return (
				<div>
					<div className="listSign">
					{
						(this.props.recordList||[]).map((item)=>{
							return (
								<div className="item">
									<div className="time">{item.formatTime}</div>
									<div className="desc">
										<div className="title">{item.title}</div>
										<div className="position"><i className="iconfont icon-qiandaodingwei"/>{item.shortPlaceName}</div>
										{
											(()=>{
												if(item.type==2){
													return <div className="remark">{item.remark}</div>
												}
											})()
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