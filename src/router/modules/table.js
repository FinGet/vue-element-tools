import Layout from '@/layout/index';

export default {
	path: '/table',
	redirect: '/table/index',
	component: Layout,
	children: [
		{
			path: '/table/index',
			component: () => import('@/views/table/index'),
			name: 'sampleTable',
			meta: { title: '表格相关', icon: 'vt-table', permission: true }
		}
	]
};
