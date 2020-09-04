import Vue from 'vue';
import store from '@/store';
Vue.directive('has', {
	bind: function (el, binding, vnode) {
		// console.log('------', el, binding.value);
		if (!Vue.prototype.$hasPermission(binding.value)) {
			setTimeout(() => {
				// console.log([el], el.parentNode);
				el.parentNode.removeChild(el);
			}, 0);
		}
	},
	inserted: function (el) {
		// console.log(el);
	},
	updated: function (el) {
		// console.log(el);
	}
});
// 权限检查方法
Vue.prototype.$hasPermission = function (value) {
	let isExist = false;
	// 拉取vuex所有按钮权限
	let btnPermission = store.state.permission.btnPermissions;
	// // 通过本地对比知道是否有权限
	if (btnPermission.includes(value)) {
		isExist = true;
	}
	// console.log({ isExist });
	return isExist;
};

Vue.mixin({
  computed: {
    hasPermit () {
			return function (keys) {
				if (!keys) return false;
				if (Array.isArray(keys)) {
					for (let i = 0; i < keys.length; i++) {
						if (!this.$hasPermission(keys[i])) {
							return false;
						}
					}
					return true;
				} else {
					return this.$hasPermission(keys);
				}
			};
		}
  }
});
