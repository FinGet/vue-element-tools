const RootTree = {
  path: '/root',
  title: '权限管理',
  desc: '权限管理',
  key: 'root',
  type: 'model',
  children: [
    {
      path: '/root/index',
      title: '权限树',
      desc: '权限树',
      key: 'root_tree',
      type: 'page'
    },
    {
      path: '/root/userGroup',
      title: '角色管理',
      desc: '角色管理',
      key: 'root_userGroup',
      type: 'page'
    }
  ]
};

export default RootTree;
