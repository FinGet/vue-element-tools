import {
	routes,
	constantRouterMap,
	asyncRouterMap
} from '@/router/index';

function hasPermission (permission, route) {
	if (route.meta && route.meta.permission) {
		let flag = false;
		flag = permission.includes(route.path);
			// console.log('flag', flag)
		return flag;
	}
	return true;
}

function filterAsyncRouter (routerMap, roles) {
	return routerMap.filter(route => {
		if (hasPermission(roles, route)) {
			return true;
		}
		return false;
	}).map(route => {
		route = Object.assign({}, route);
		if (route.children) {
			route.children = filterAsyncRouter(route.children, roles);
		}
		return route;
	});
}

const permission = {
	namespaced: true,
	state: {
		// routers: [],
		routers: routes,
		addRouters: [],
		btnPermissions: []
	},
	mutations: {
		SET_ROUTERS: (state, routers) => {
			state.addRouters = routers;
			state.routers = constantRouterMap.concat(routers);
		},
		SET_BTN_PERMISSION: (state, btn) => {
			state.btnPermissions = btn;
		}
	},
	actions: {
		GenerateRoutes ({ commit }, permissions) {
			return new Promise(resolve => {
				let menu = [];
				let btn = [];
				permissions.forEach(item => {
					let type = item.type;
					if (type === 'btn' || type === 'tab') {
						btn.push(item.key);
					} else if (type === 'model' || type === 'page') {
						menu.push(item.path);
					}
				});
				commit('SET_BTN_PERMISSION', btn);
				const accessedRouters = filterAsyncRouter(asyncRouterMap, menu);
				console.log(accessedRouters);
				commit('SET_ROUTERS', accessedRouters);
				resolve(accessedRouters);
			});
		}
	}
};

export default permission;
