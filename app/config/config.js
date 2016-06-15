//import 'whatwg-fetch';
import qwest from  'qwest';


import '../Page/App/_App.scss';
import '../Page/Fieldsign/_Fieldsign.scss';
import 'react-day-picker/lib/style.css';
import '../Page/Record/_Record.scss';
import '../Page/SelectArea/_SelectArea.scss';
import '../Component/_Dialog.scss';
import '../Page/OrtAnomalie/_OrtAnomalie.scss';
let Config = {
	ajax: function(url,param) {
		var args = Array.prototype.slice.call(arguments, 0);
		args[0] = "/mock/"+ args[0]+".json";
		if(typeof args[1]=="string"){
			args[0]+="?"+args[1];
			args.pop();
		}
		console.log(args)
		args[1] && (args[1].method ="GET");
		if(args[1] && typeof args[1]=="object"){
			args [0] += "?"+args[1].body;
			delete args [1]
		}
		return qwest.get(args[0],args[1]).then((res,data)=>{
			return data;
		})
		/*return fetch.apply(null,args).then((response) => {
			return response.json()
		});*/
	},
	native: function(method, data) {
	/*	return fetch("/mock/" + method + ".json").then((response) => {
			return response.json()
		});*/
		
		return qwest.get("/mock/" + method + ".json").then((res,data)=>{
			return data;
		})
	}
}
export default Config;