import Layout from '@/layout/index';

export default {
	path: '/root',
	redirect: '/root/index',
	component: Layout,
	meta: {
		title: '权限管理',
		icon: 'el-icon-coordinate',
		permission: true
	},
	children: [
		{
			path: '/root/index',
			component: () => import('@/views/root/index'),
			name: 'rootTree',
			meta: { title: '权限树', permission: true }
		},
		{
			path: '/root/userGroup',
			component: () => import('@/views/root/userGroup'),
			name: 'userGroup',
			meta: { title: '角色管理', permission: true }
		}
	]
};
