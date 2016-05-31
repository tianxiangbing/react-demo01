import React from 'react';
import Styles from './Dialog.scss';

let {Component} = React;

export default class Dialog extends Component{
	constructor(props){
		super(props);
		this.state ={show:props.show,msg:props.msg}
	}
	componentDidMount(){
		this.timer = setTimeout(()=>{
			this.setState({show:false});
			this.props.stage.setState({dialog:0})
		},2000)
	}
	render(){
		let d = "";
		if(this.state.show){
			d = (
					<div className={"dialog " +this.props.type}>{this.props.msg}</div>
				)
		}
		return (
				<div>{d}</div>
			)
	}
}