const TableTree = {
  path: '/table',
  title: 'Table',
  desc: 'Table',
  key: 'table_manage',
  type: 'model',
  children: [
    {
      path: '/table/index',
      title: '简单表格',
      desc: '简单表格',
      key: 'table_simple',
      type: 'page',
      children: [
        {
          title: '导出',
          desc: '导出',
          key: 'table_simple_export',
          type: 'btn'
        }
      ]
    },
    {
      path: '/table/custom-header',
      title: '自定义表头',
      desc: '自定义表头',
      key: 'custom_header',
      type: 'model',
      children: [
        {
          path: '/table/custom-header/index',
          title: '列表页',
          desc: '列表页',
          key: 'custom_header_list',
          type: 'page',
          children: [
            {
              title: '删除',
              desc: '删除',
              key: 'custom_header_list_del',
              type: 'btn'
            }
          ]
        },
        {
          path: '/table/custom-header/detail',
          title: '详情页',
          desc: '详情页',
          key: 'custom_header_detail',
          type: 'page'
        }
      ]
    }
  ]
};

export default TableTree;
