//import 'whatwg-fetch';
import qwest from  'qwest';

import '../Page/App/_App.scss';
import '../Page/Fieldsign/_Fieldsign.scss';
import 'react-day-picker/lib/style.css';
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
		/*if(typeof args[1]=="string"){
			args[0]+="?"+args[1];
			args.pop();
		}*/
		args[0]=this.makeUrl(url,param);
		/*return fetch.apply(null,args).then((response) => {
			return response.json()
		});*/
		let method = 'get';
		let data = {}
		typeof param=="string" ?null:data=param ;
		let t = null;
		if(typeof args[1]=="object"){
			method = args[1].method.toLowerCase()
			data = JSON.parse(args[1].body);
			t = args[1].headers? {dataType:"json"}:null;
			if(args[1].urlParam){
				args[0]+="&"+args[1].urlParam;
			}
			method='post'
		}
		//qwest.setDefaultDataType('json');
		console.log('ajax')
		return qwest[method](args[0],data,t).then((res,data)=>{
			return data;
		})
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
				return domain+'sign.json'+param
				break;
			}
			case 'upload':{
				return domain+'upload/images.json'+param
				break;
			}
			case 'historyOfMonth':{
				return domain+'get/historyOfMonth.json'+param
			}
			case 'historyOfDay':{
				//他人外勤
				return domain+'get/out/historyOfDay.json'+param
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