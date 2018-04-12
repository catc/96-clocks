import axios from 'axios';

const instance = axios.create({
	timeout: 7000,
	headers: {},
});

/*
export function setAxiosToken(token){
	instance.defaults.headers.Authorization = token;
}
*/

export default (url, options = {}) => {
	if (!url){
		return Promise.reject('Must provide valid url')
	}

	return new Promise((resolve, reject) => {
		instance.request(url, options)
			.then(({data}) => {
				resolve(data);
			})
			.catch(err => {
				// err.response has `status, data, headers, config` properties
				reject(err);
			})
	})
}

export function raw(url, options){
	if (!url){
		return Promise.reject('Must provide valid url')
	}

	return new Promise((resolve, reject) => {
		instance.request(url, options)
			.then(data => {
				resolve(data);
			})
			.catch(err => {
				// err.response has `status, data, headers, config` properties
				reject(err);
			})
	})
}

export function ajaxWithProgress(method, url, options){
	const headers = options.headers || [];

	return new Promise((resolve, reject) => {
		const request = new window.XMLHttpRequest();

		request.onreadystatechange = e => {
			if ( request.readyState === 4 ){
				if ( (request.status + '')[0] === '2' ){
					resolve(e.target.response);
				} else {
					reject(e.target)
				}
			}
		};
		request.onerror = function(e){
			reject(e)
		};
		request.upload.onprogress = e => {
			if (e.lengthComputable && options.progressFn){
				const percent = e.loaded / e.total;

				options.progressFn(percent);
			}
		};

		// method + url
		request.open(method, url, true);

		// headers
		request.setRequestHeader('Authorization', tokencache);
		headers.forEach(h => {
			request.setRequestHeader(h.key, h.val);
		});

		// send
		request.send(options.body || null);
	});
}
