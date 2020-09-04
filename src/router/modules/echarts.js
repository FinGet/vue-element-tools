import Layout from '@/layout/index';

 export default {
  path: '/echarts',
  component: Layout,
  redirect: '/echarts/index',
  children: [
    {
      path: '/echarts/index',
      component: () => import('@/views/echarts/index'),
      name: 'echarts',
      meta: { title: 'V-Echarts', icon: 'el-icon-s-data' }
    }
  ]
};
