'use strict';

import Vue from 'vue';
import axios from 'axios';
// import qs from 'qs';
import router from '@/router';
import {
	Message as message
} from 'element-ui';
import {
	getItem, removeItem
} from '@/utils/storage';

let config = {
	baseURL: process.env.baseURL || process.env.apiUrl || '',
	timeout: 60 * 1000,
	// Check cross-site Access-Control
	withCredentials: true
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
	function (config) {
		const token = getItem('token');

		if (token) {
			// 让每个请求携带自定义 token 请根据实际情况自行修改
			config.headers.Authorization = token;
		}
		return config;
	},
	function (error) {
		// Do something with request error
		return Promise.reject(error);
	}
);

// Add a response interceptor
_axios.interceptors.response.use(
	function (response) {
		const res = response.data;
		const config = response.config || '';
		if (res.code === 0) {
			if (config && config.successNotice) {
				message.success(res.msg);
			}
			return res;
		} else if (res.code === 402) {
			removeItem('token');
			message.error('登录过期!');
			router.push({ name: 'Login' });
		} else {
			// 是否提示错误信息
			if (config && config.errNotice) {
				message.error(res.msg);
			}
			return Promise.reject(new Error(res.msg || 'Error'));
		}
	},
	function (error) {
		console.log('err' + error);
		message({
			message: error.message,
			type: 'error',
			duration: 5 * 1000
		});
		return Promise.reject(error);
	}
);
// get 方法
const get = function (url, params, errNotice = true, successNotice = false) {
	return _axios({
		url,
		method: 'get',
		params,
		headers: {
			'Content-Type': 'application/json;charset=UTF-8'
		},
		errNotice,
		successNotice
	});
};
// post 方法
const post = function (url, params, errNotice = true, successNotice = false) {
	return _axios({
		url,
		method: 'post',
		data: params,
		headers: {
			'Content-Type': 'application/json;charset=UTF-8'
		},
		errNotice,
		successNotice
	});
};

Plugin.install = function (Vue) {
	Vue.axios = _axios;
	window.axios = _axios;
	Object.defineProperties(Vue.prototype, {
		axios: {
			get () {
				return _axios;
			}
		},
		$axios: {
			get () {
				return _axios;
			}
		}
	});
};

Vue.use(Plugin);

export {
	_axios, get, post
};
