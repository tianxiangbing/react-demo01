import 'whatwg-fetch';

let Config = {
	ajax: function() {
		var args = Array.prototype.slice.call(arguments, 0);
		return fetch.apply(args).then((response) => {
			response.json()
		});
	},
	native: function(method, data) {
		return fetch("/mock/" + method + ".json").then((response) => {
			return response.json()
		});
	}
}
export default Config;