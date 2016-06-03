import 'whatwg-fetch';
import 'qwest';

import '../Page/App/_App.scss';
import '../Page/Fieldsign/_Fieldsign.scss';
import '../Page/Record/_Record.scss';
import '../Page/SelectArea/_SelectArea.scss';
import '../Component/_Dialog.scss';

import cookie from 'react-cookie';
let Config = {
	ajax: function(url,param) {
		//测试
		cookie.save('userId','82977736', { path: '/' });
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
		var domain = 'http://10.1.40.6/signin/api/';
		if(typeof param != "string"){
			param='?debug=true&uid='+cookie.load('userId')+'&orgId='+cookie.load('orgId');
		}else{
			param='?debug=true&uid='+cookie.load('userId')+'&orgId='+cookie.load('orgId')+"&"+param;
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
			case "sign":{
				return domain+'sign.json'+param+'&action=0'
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