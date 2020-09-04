import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './plugins/element.js';
import './plugins/axios';
import '@/assets/css/common.less';
import '@/utils/directives.js';
import '@/utils/filter.js';
import Pagination from '@/components/Pagination';

// 按钮权限
import './utils/btnPermission';
// import './permission';
Vue.use(Pagination);

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app');
