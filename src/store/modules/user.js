import {
	login, logout, getUserPermission
} from '@/api/user';
import router from '@/router';
import * as storage from '@/utils/storage';

const state = {
	token: '',
	info: {},
	roles: []
};

const mutations = {
	SET_TOKEN: (state, token) => {
		storage.setItem('token', token);
		state.token = token;
	},
	SET_ROLES: (state, roles) => {
		state.roles = roles;
	},
	SET_INFO: (state, info) => {
		storage.setItem('userInfo', info);
		state.info = info;
	}
};

const actions = {
	// user login
	login ({ commit, dispatch }, userInfo) {
		const { email, pass } = userInfo;
		return new Promise((resolve, reject) => {
			login({ email, pass }).then(response => {
				const { data } = response;
				commit('SET_TOKEN', data.token);
				dispatch('getUserPermission').then(res => {
					dispatch('permission/GenerateRoutes', res, { root: true }).then(res => {
						if (res && res.length) {
							router.addRoutes(res);
						}
						resolve();
					});
				}).catch(error => {
					reject(error);
				});
			}).catch(error => {
				reject(error);
			});
		});
	},

	getUserPermission ({ commit, state }) {
		return new Promise((resolve, reject) => {
			getUserPermission().then(response => {
				const { data } = response;
				if (!data) {
					reject(new Error('Verification failed, please Login again.'));
				}
				commit('SET_ROLES', data);
				resolve(data);
			}).catch(error => {
				reject(error);
			});
		});
	},
	// user logout
	logout ({ commit, state }) {
		return new Promise((resolve, reject) => {
			logout(state.token).then(() => {
				commit('SET_TOKEN', '');
				commit('SET_ROLES', []);
				commit('SET_INFO', {});
				resolve();
			}).catch(error => {
				reject(error);
			});
		});
	}
};

export default {
	namespaced: true,
	state,
	mutations,
	actions
};
