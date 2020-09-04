// import { get, post } from '@/plugins/axios';

// 代理配置
// const TMPURL = process.env.NODE_ENV === 'development' ? '/api' : process.env.VUE_APP_API;

export function login (params) {
	// return post(TMPURL + '/public/user/auth', params);
}
export function logout () {
	return new Promise((resolve, reject) => {
		setTimeout(function () {
			resolve();
		}, 100);
	});
}

export function getUserInfo (params) {
	return new Promise((resolve, reject) => {
		setTimeout(function () {
			resolve({ userName: 'admin' });
		});
	});
}

// 获取用户权限
export function getUserPermission (params) {
	return new Promise((resolve, reject) => {
		setTimeout(function () {
			resolve();
		}, 100);
	});
	// return get(TMPURL + '/auth/user/permissions', params);
}

// 创建角色
export function createUser (params) {
	return new Promise((resolve, reject) => {
		setTimeout(function () {
			resolve();
		}, 100);
	});
	// return post(TMPURL + '/protected/permission/role/bind', params, true, true);
}

// 同步权限树
export function syncRoleTree (params) {
	return new Promise((resolve, reject) => {
		setTimeout(function () {
			resolve();
		}, 100);
	});
	// return post(TMPURL + '/protected/permission/sync', params, true, true);
}

// 获取菜单绑定的接口
export function getKeyPermission (params) {
	return new Promise((resolve, reject) => {
		setTimeout(function () {
			resolve();
		}, 100);
	});
	// return get(TMPURL + '/protected/permission/router', params);
}

// 绑定菜单相关接口
export function bindKeyApi (params) {
	return new Promise((resolve, reject) => {
		setTimeout(function () {
			resolve();
		}, 100);
	});
	// return post(TMPURL + '/protected/permission/router/bind', params, true, true);
}

// 获取角色列表
export function getRoleList (params) {
	return new Promise((resolve, reject) => {
		setTimeout(function () {
			resolve();
		}, 100);
	});
	// return get(TMPURL + '/protected/permission/role/list', params);
}

// 删除角色
export function delRole (params) {
	return new Promise((resolve, reject) => {
		setTimeout(function () {
			resolve();
		}, 100);
	});
	// return post(TMPURL + '/protected/permission/role/delete', params, true, true);
}

// 获取角色权限
export function getRolePermission (params) {
	return new Promise((resolve, reject) => {
		setTimeout(function () {
			resolve();
		}, 100);
	});
	// return get(TMPURL + '/protected/permission/role/keys', params);
}
