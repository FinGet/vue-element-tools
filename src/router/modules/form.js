import Layout from '@/layout/index';

export default {
	path: '/form',
	redirect: '/form/index',
	component: Layout,
	children: [
		{
			path: '/form/index',
			component: () => import('@/views/form/index'),
			name: 'form',
			meta: { title: '表单相关', icon: 'el-icon-document' }
		}
	]
};
