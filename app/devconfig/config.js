import 'whatwg-fetch';

import cookie from 'react-cookie';
let Config = {
	ajax: function(url,param) {
		var args = Array.prototype.slice.call(arguments, 0);
		args[0] = "/mock/"+ args[0]+".json";
		if(typeof args[1]=="string"){
			args[0]+="?"+args[1];
			args.pop();
		}
		args[0]=this.makeUrl(url,param);
		return fetch.apply(null,args).then((response) => {
			return response.json()
		});
	},
	makeUrl:function(key,param){
		var domain = 'http://10.0.10.44/signin/api/';
		if(typeof param != "string"){
			param='';
		}else{
			param='?debug=true&uid=1001&orgId='+cookie.load('orgId')+"&"+param;
		}
		switch(key){
			case "getDaySign":{
				return domain+'get/historyOfDay.json'+param
				break;
			}
			case "getTime":{
				return domain+'get/orgTime.json'+param
				break;
			}
		}
	},
	native: function(method, data) {
		return fetch("/mock/" + method + ".json").then((response) => {
			return response.json()
		});
	}
}
export default Config;