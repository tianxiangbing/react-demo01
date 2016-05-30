import 'whatwg-fetch';

let Config = {
	ajax: function() {
		var args = Array.prototype.slice.call(arguments, 0);
		args[0] = "/mock/"+ args[0]+".json";
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