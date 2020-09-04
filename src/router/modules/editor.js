import Layout from '@/layout/index';

export default {
	path: '/editor',
	redirect: '/editor/index',
	component: Layout,
	meta: {
		title: '富文本',
		icon: 'el-icon-document',
		permission: true
	},
	children: [
		{
			path: '/editor/index',
			component: () => import('@/views/editor/index'),
			name: 'editor',
			meta: { title: 'tinymce', permission: true }
		},
		{
			path: '/editor/quill',
			component: () => import('@/views/editor/quill'),
			name: 'quill',
			meta: { title: 'quill', permission: true }
		}
	]
};
