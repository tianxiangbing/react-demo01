import 'whatwg-fetch';


import '../Page/App/_App.scss';
import '../Page/Fieldsign/_Fieldsign.scss';
import 'react-day-picker/lib/style.css';
import '../Page/Record/_Record.scss';
import '../Page/SelectArea/_SelectArea.scss';
import '../Component/_Dialog.scss';

let Config = {
	ajax: function(url,param) {
		var args = Array.prototype.slice.call(arguments, 0);
		args[0] = "/mock/"+ args[0]+".json";
		if(typeof args[1]=="string"){
			args[0]+="?"+args[1];
			args.pop();
		}
		return fetch.apply(null,args).then((response) => {
			return response.json()
		});
	},
	native: function(method, data) {
		return fetch("/mock/" + method + ".json").then((response) => {
			return response.json()
		});
	}
}
export default Config;