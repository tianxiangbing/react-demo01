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
//import Styles from './_FieldSign.scss';
let {Component}=React;
import Config from 'config';
import Dialog from '../../Component/Dialog';

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
		if(this.checkIsUpload()){
			this.setState({dialog:{mask:true,show:true,msg:"图片正在上传，请稍后",type:"alert"}});
			return;
		}
		let data ={
			orgId:this.outInfo.orgId,
			orgName:this.outInfo.orgName,
			type:2,
			placeName:this.outInfo.locFullName,
			shortPlaceName:this.outInfo.locName,
			longitude:this.outInfo.locLng,
			latitude:this.outInfo.locLat,
			remark:this.refs.remark.value,
			images:JSON.stringify(this.imgList) ,
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
		  body:  JSON.stringify(data),
		  urlParam:"action=1"
		}).then((res)=>{
			if(res.code==200){
				//location.href="/";
				history.back()
			}
		})
	}
	//选择图片
	selectPictrues(){
		Config.native('selectPictures',{count:this.state.imgList.length,sum:4}).then((res)=>{
			if(res.code ==200){
				let data = res.data.map((item)=>{
					return {data:item,uploaded:false};
				});
				console.log(data)
				data = this.state.imgList.concat(data);
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
			if (!item.uploaded &&!item.uploading) {
				let param = {
					index: index.toString(),
					imageData: item.data
				}
				item.uploading=true;
				Config.ajax('upload', {
					/*headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					},*/
					method: 'POST',
					body:JSON.stringify(param)
				}).then((res) => {
					if (res.code == 200) {
						let data = res.data;
						let i = data.index;
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
	renderDialog(){
		console.log(this.state.dialog)
		return <Dialog stage={this} {...this.state.dialog}/>
	}
	checkIsUpload(){
		let isuploading=false;
		this.state.imgList .forEach((item)=>{
			if(!item.uploaded){
				isuploading = true;
			}
		});
		return isuploading;
	}
	//选择人员
	addUser(){
		if(this.checkIsUpload()){
			this.setState({dialog:{mask:true,show:true,msg:"图片正在上传，请稍后",type:"alert"}});
			return;
		}
		Config.native('selectPeopleIOS').then((res)=>{
			let data = res.data;
			data = data.map((item)=>{
				return {authId:item.uid,authName:item.name};
			});
			this.setState({authList:data});
		});
	}
	del(item,index){
		this.state.imgList.splice(index,1);
		this.setState({imgList:this.state.imgList,showUpload:true});
	}
	render(){
		return (
			<div className="body">
				<Helmet title="外勤签到" />
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
						this.state.imgList.map((item,index)=>{
							return <div className="item">{!item.uploaded?<span className="uploading">上传中...</span>:<i onClick={this.del.bind(this,item,index)} className="del iconfont icon-103"/>}<img src={"data:image/png;base64,"+item.data}/></div>
						})
					}	
					</div>
					{this.state.showUpload?<div className="upload-btn iconfont icon-qiandaotianjiazhaopian" onClick={this.selectPictrues.bind(this)}></div>:undefined}
				</div>
				<div className="formBox">
					<div className="addUser" onClick={this.addUser.bind(this)}>添加可查看人员<span>{this.state.authList.length==0?<s>0人</s>:<s>{this.state.authList.length}人</s>}<i/>></span></div>
				</div>
				<div className="btnBottom" onClick={this.submit.bind(this)}>提交</div>
                {this.state.dialog?this.renderDialog():undefined}
			</div>
			)
	}
}