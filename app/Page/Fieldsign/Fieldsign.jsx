/*
 * Created with Sublime Text 3.
 * license: http://www.lovewebgames.com
 * User: 田想兵
 * Date: 2016-05-30
 * Time: 10:27:55
 * Contact: 55342775@qq.com
 */
"use strict";
import React  from 'react';
import Helmet from "react-helmet";
import Styles from './_FieldSign.scss';
let {Component}=React;
import Config from '../../config/config';

//外勤签到
export default class Fieldsign extends Component{
	constructor(props){
		super(props)
		this.outInfo=JSON.parse(localStorage.getItem('outInfo'));
		this.imgList = [];
		this.state={text:'',maxlength:50,imgList:[],showUpload:true,authList:[]};
	}
	utf16toEntities(str) {
		var patt = /[\ud800-\udbff][\udc00-\udfff]/g; // 检测utf16字符正则
		str = str.replace(/(^\s*)|(\s*$)/g,"");
		str = str.replace(patt, '');
		return str;
	}
	changeText(e){
		let v = this.utf16toEntities(e.target.value);
		this.setState({text:v});
	}
	submit(){
		let data ={
			token:"7d171a5fd4954f0c34345c2bbe3f8932",
			orgId:this.outInfo.orgId,
			orgName:this.outInfo.orgName,
			type:2,
			placeName:this.outInfo.locFullName,
			shortPlaceName:this.outInfo.locName,
			longitude:this.outInfo.locLng,
			latitude:this.outInfo.locLat,
			remark:this.refs.remark.value,
			images:this.imgList,
			authList:this.state.authList
		}
		console.log(data)
		Config.ajax("sign",
		{
		  headers: {
		    'Accept': 'application/json',
		    'Content-Type': 'application/json'
		  },
		  method: 'POST',
		  body:  JSON.stringify(data)
		}).then((res)=>{
			if(res.code==200){
				location.href="/";
			}
		})
	}
	//选择图片
	selectPictrues(){
		Config.native('selectPictures',this.state.imgList.length +"&4").then((res)=>{
			if(res.code ==200){
				let data = res.data.map((item)=>{
					return {data:item,uploaded:false};
				});
				console.log(data)
				data = data.concat(this.state.imgList);
				this.setState({imgList:data});
				if(data.length>=4){
					this.setState({showUpload:false});
				}
				this.upload();
			}
		});
	}
	//上传
	upload() {
		let _this = this;
		this.state.imgList.forEach((item, index) => {
			if (!item.uploaded) {
				let param = {
					index: index,
					imageData: item
				}
				Config.ajax('upload'/*, {
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					},
					method: 'POST',
					body: JSON.stringify(param)
				}*/).then((res) => {
					if (res.code == 200) {
						let data = res.data;
						let i = data.index;
						debugger;
						_this.state.imgList[i].uploaded = true;
						_this.setState({
							imgList: _this.state.imgList
						});
						_this.imgList.push(data.url);
					}
				});
			}
		})
	}
	//选择人员
	addUser(){
		Config.native('selectPeopleIOS','500&' + this.outInfo.orgId + '&' + this.outInfo.orgName).then((res)=>{
			let data = res.data;
			data = data.map((item)=>{
				return {authId:item.uid,authName:item.name};
			});
			this.setState({authList:data});
		});
	}
	render(){
		return (
			<div className="body">
				<div className="formBox">
					<div className="row">
						<div className="label">签到地点:</div>
						<div className="info">{this.outInfo.locName}</div>
					</div>
					<div className="row">
						<div className="label">签到时间:</div>
						<div className="info">{this.outInfo.time}</div>
					</div>
					<div className="row">
						<div className="label">当前企业:</div>
						<div className="info">{this.outInfo.orgName}</div>
					</div>
				</div>
				<div className="formBox">
					<textarea ref="remark" onChange={this.changeText.bind(this)} value={this.state.text} maxLength={this.state.maxlength} placeholder="说点什么吧~"/>
					<div className="upload-list">
					{
						this.state.imgList.map((item)=>{
							return <div className="item">{!item.uploaded?<span className="uploading">上传中...</span>:undefined}<img src={"data:image/png;base64,"+item.data}/></div>
						})
					}	
					</div>
					{this.state.showUpload?<div className="upload-btn iconfont icon-qiandaotianjiazhaopian" onClick={this.selectPictrues.bind(this)}></div>:undefined}
				</div>
				<div className="formBox">
					<div className="addUser" onClick={this.addUser.bind(this)}>添加可查看人员<span>{this.state.authList.length==0?<s>本部门</s>:<s>{this.state.authList.length}人</s>}<i/>></span></div>
				</div>
				<div className="btnBottom" onClick={this.submit.bind(this)}>提交</div>
			</div>
			)
	}
}