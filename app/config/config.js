//import 'whatwg-fetch';
import qwest from 'qwest';

import 'cssconfig.js';
import cookie from 'react-cookie';

/*import '../scss/caiyun.scss';*/
let Config = {
	ajax: function(url, param) {

		!cookie.load('orgType') ? cookie.save('orgType', localStorage.getItem('orgType'), {
			path: '/'
		}) : undefined;
		!cookie.load('username') ? cookie.save('username', localStorage.getItem('username'), {
			path: '/'
		}) : undefined;
		!cookie.load('timeStamp') ? cookie.save('timeStamp', localStorage.getItem('timeStamp'), {
			path: '/'
		}) : undefined;
		!cookie.load('token') ? cookie.save('token', localStorage.getItem('token'), {
			path: '/'
		}) : undefined;
		!cookie.load('userId') ? cookie.save('userId', localStorage.getItem('userId'), {
			path: '/'
		}) : undefined;
		!cookie.load('appversion') ? cookie.save('appversion', localStorage.getItem('appversion'), {
			path: '/'
		}) : undefined;
		!cookie.load('hwtoken') ? cookie.save('hwtoken', localStorage.getItem('hwtoken'), {
			path: '/'
		}) : undefined;
		!cookie.load('mobile') ? cookie.save('mobile', localStorage.getItem('mobile'), {
			path: '/'
		}) : undefined;

		var args = Array.prototype.slice.call(arguments, 0);
		args[0] = "/mock/" + args[0] + ".json";
		if (typeof args[1] == "string") {
			args[0] += "?" + args[1];
			args.pop();
		}
		console.log(args)
		args[1] && (args[1].method = "GET");
		if (args[1] && typeof args[1] == "object") {
			args[0] += "?" + args[1].body;
			delete args[1]
		}
		return qwest.get(args[0], args[1]).then((res, data) => {
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

		return qwest.get("/mock/" + method + ".json?" + data).then((res, data) => {
			return data;
		})
	}
}
export default Config;