import React from 'react';
let {Component} = React;
import Helmet from "react-helmet";
import './_OrtAnomalie.scss';
import Config from 'config';

export default class OrtAnomalie extends Component{
	constructor(props){
		super(props)
		this.imgList = [];
		this.outInfo=JSON.parse(localStorage.getItem('outInfo'));
		this.state={imgList:[],text:null,maxlength:50,showUpload:true};
	}
	submit(){
		let data ={
			orgId:this.outInfo.orgId,
			orgName:this.outInfo.orgName,
			type:1,
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
	//选择图片
	selectPictrues(){
		Config.native('selectPictures',this.state.imgList.length +"&4").then((res)=>{
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
	render(){
		return (
			<div className="body">
				<Helmet title="报告原因" />
				<div className="formBox">
					<textarea ref="remark" onChange={this.changeText.bind(this)} value={this.state.text} maxLength={this.state.maxlength} placeholder="请填写原因~"/>
					<div className="upload-list">
					{
						this.state.imgList.map((item)=>{
							return <div className="item">{!item.uploaded?<span className="uploading">上传中...</span>:undefined}<img src={"data:image/png;base64,"+item.data}/></div>
						})
					}	
					</div>
					{this.state.showUpload?<div className="upload-btn iconfont icon-qiandaotianjiazhaopian" onClick={this.selectPictrues.bind(this)}></div>:undefined}
				</div>
				<div className="bigredbtn" onClick={this.submit.bind(this)}>提交并确认打卡</div>
			</div>
			);
	}
}