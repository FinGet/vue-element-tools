<template>
  <div class="has-logo sidebar-container">
    <logo :collapse="isCollapse"/>

    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        router
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item v-for="route in permission_routers" :key="route.path" :item="route" :base-path="route.path"/>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
  import {
    mapGetters
  } from 'vuex';
  import Logo from './Logo';
  import SidebarItem from './SidebarItem';
  import variables from '@/assets/css/variables.less';

  export default {
    components: { SidebarItem, Logo },
    computed: {
      ...mapGetters([
        'permission_routers',
        'sidebar'
      ]),
      activeMenu () {
        const route = this.$route;
        const { meta, path } = route;
        console.log(route);
        // if set path, the sidebar will highlight the path you set
        if (meta.activeMenu) {
          return meta.activeMenu;
        }
        return path;
      },
      isCollapse () {
        return !this.sidebar.opened;
      },
      variables () {
        return variables;
      }
    }
  };
</script>
