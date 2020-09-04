<template>
  <div>
    <el-breadcrumb class="breadcrumb" separator="/">
      <transition-group name="breadcrumb">
        <el-breadcrumb-item v-for="(item) in levelList" :key="item.path">
          <router-link
            v-if="name != item.name"
            :to="{ path: item.redirect?item.redirect: item.path === '' ? '/' : item.path }"
          >{{ item.meta.title }}</router-link>
          <span v-else>{{ item.meta.title }}</span>
        </el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        name: '',
        levelList: null
      };
    },
    watch: {
      $route (route) {
        // if you go to the redirect page, do not update the breadcrumbs
        if (route.path.startsWith('/redirect/')) {
          return;
        }
        this.getBreadcrumb();
      }
    },
    created () {
      this.getBreadcrumb();
    },
    methods: {
      getBreadcrumb () {
        // only show routes with meta.title
        this.name = this.$route.name;
        let matched = this.$route.matched.filter(item => item.meta && item.meta.title);

        this.levelList = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false);
      }
    }
  };
</script>

<style lang="less" scoped>
.breadcrumb {
	height: 40px;
	line-height: 40px;
	padding-left: 20px;
}
/deep/ .el-breadcrumb__inner a, .el-breadcrumb__inner.is-link{
	font-weight: 400;
}
</style>
