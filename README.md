
## 权限管理

> 整个系统的权限分为 `页面(route)`和`按钮(action)`两大部分

![](http://assets.processon.com/chart_image/5f4869b9e0b34d1abc6c43f8.png)

### 路由篇

#### 静态路由和动态路由

- 静态路由(constantRouterMap)

> 静态路由是不需要用户登录，也不需要权限就能访问的路由，例如：`/login`,`user/center`,`/404`

- 动态路由(asyncRouterMap)

> 动态路由是包含整个系统功能的所有路由的集合，在获取用户权限后，匹配过滤然后再通过addRoutes添加到路由表中

```javascript
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
			path: 'index',
			component: () => import('@/views/editor/index'),
			name: 'editor',
			meta: { title: 'tinymce', permission: true }
		}
	]
};
```

> 需要权限验证的route都需要加上 `permission: true`



#### 路由导航守卫

每次路由的跳转都会进行权限的验证，具体代码在`/src/permission.js`

![](http://assets.processon.com/chart_image/5f4c68505653bb0c71e0280c.png)


### 权限篇

#### 权限树

因为要控制到页面和按钮权限，所以采用了在前端维护权限树,以方便路由的改变，直接同步给后端。

```javascript
const EditorTree = {
  path: '/editor',
  title: '富文本',
  desc: '富文本',
  key: 'editor',
  type: 'model',
  children: [
    {
      path: '/editor/index',
      title: 'tinymce',
      desc: 'tinymce',
      key: 'editor_tinymce',
      type: 'page'
    },
    {
      path: '/editor/quill',
      title: 'quill',
      desc: 'quill',
      key: 'editor_quill',
      type: 'page'
    }
  ]
};
export default EditorTree;
```

有几个关键字段：`path`、`title`、`key`、`type`,如果`type === path || type === model`，`path`是必须的。`key`是不能轻易改动的，这是后端的唯一确定key，如果改动需要跟后端沟通，`key`也要有唯一性，不能重复。

#### api的绑定

后端接口也需要验证权限，所以新增权限树之后，要去绑定权限下的接口，一个页面或按钮权限可以绑定多个api接口。

### 最后

几个重要的文件：

`src/permission.js`

`src/store/modules/permission.js`

`src/store/modules/user.js`

`src/components/TreeTable`

`src/layout/components/SideBar`