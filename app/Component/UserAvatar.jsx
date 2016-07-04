import React from 'react';
let {Component}=React;
export default class UserAvatar extends Component{
	constructor(props){
		super(props);
		console.log(this.props.item.userName)
		this.state={error:false};
	}
	formatImg(){
		if(this.state.error)
		{
			return <div className="img" style={{backgroundColor:this.state.color}}>{(this.props.item.userName||"").slice(-2)}</div>
		}else{
			return undefined;
		}
	}
	errorImg(item,e){
		//console.log(e)
      let avatarColors = ['#f17474','#7ac47a','#efbc6b','#75a4d7','#45b2e3']
      let color = avatarColors[item.uid% 5];
    /*  item.error=true;
      item.color= color;*/
      //this.setState({userInfo:this.state.userInfo});
      //this.props.errorCallback&&this.props.errorCallback.call(this,item);
     //this.setState({item:this.state.item});
		this.setState({color:color,error:true});
	}

	render(){
		return (
		<span>
			{this.formatImg()}
			{!this.state.error?<img onError={this.errorImg.bind(this,this.props.item)} src={"http://n1.store.uban360.com:7188/sfs/avatar?uid="+this.props.item.uid}/>:undefined}
		</span>
		);
	}
}