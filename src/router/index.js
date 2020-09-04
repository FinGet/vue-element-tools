import Vue from 'vue';
import VueRouter from 'vue-router';
import Layout from '@/layout/index';
import Table from './modules/table';
import Editor from './modules/editor';
import Echarts from './modules/echarts';
import Root from './modules/root';
import Form from './modules/form';

Vue.use(VueRouter);

export const routes = [
	{
		path: '/',
		component: Layout,
		redirect: '/dashboard',
		children: [
			{
				path: 'dashboard',
				component: () => import('@/views/dashboard/index'),
				name: 'Dashboard',
				meta: { title: 'Dashboard', icon: 'el-icon-s-home' }
			}
		]
	},
	Table,
	Form,
	Editor,
	Echarts,
	Root,
	{
		path: '/login',
		name: 'Login',
		hidden: true,
		component: () => import('@/views/Login.vue')
	},
	{
		path: '/404',
		component: () => import('@/views/error-page/404'),
		hidden: true
	},
	{
		path: '/401',
		component: () => import('@/views/error-page/401'),
		hidden: true
	}
];

export const constantRouterMap = [
	{
		path: '/',
		component: Layout,
		redirect: '/dashboard',
		children: [
			{
				path: 'dashboard',
				component: () => import('@/views/dashboard/index'),
				name: 'Dashboard',
				meta: { title: 'Dashboard', icon: 'el-icon-s-home' }
			}
		]
	},
	{
		path: '/login',
		name: 'Login',
		hidden: true,
		component: () => import('@/views/Login.vue')
	},
	{
		path: '/404',
		component: () => import('@/views/error-page/404'),
		hidden: true
	},
	{
		path: '/401',
		component: () => import('@/views/error-page/401'),
		hidden: true
	}
];

export const asyncRouterMap = [
	Table,
	Editor,
	Echarts,
	Root,
  { path: '*', redirect: '/404', hidden: true }
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	// routes: constantRouterMap
	routes
});

export default router;
