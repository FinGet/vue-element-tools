<template>
  <div :class="['app-wrapper',isCollapse?'hideSidebar':'']">
    <el-container>
      <el-aside :width="isCollapse?'64px':'210px'">
        <sidebar/>
      </el-aside>
      <el-container>
        <el-header height="50px">
          <topbar/>
        </el-header>
        <el-main>
          <breadcrumb/>
          <app-main/>
          <div class="copyright">
            Copyright&copy; 2020 <span>FinGet</span>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import Sidebar from './components/SideBar/index';
  import Topbar from './components/Topbar';
  import Breadcrumb from './components/Breadcrumb';
  import AppMain from './components/AppMain';
  import {
    mapGetters
  } from 'vuex';
  export default {
    computed: {
      ...mapGetters(['sidebar']),
      isCollapse () {
        return !this.sidebar.opened;
      }
    },
    components: {
      Sidebar,
      Topbar,
      Breadcrumb,
      AppMain
    }
  };
</script>

<style lang="less" scoped>
/deep/ .el-main{
	padding: 0;
}
/deep/ .el-header {
	-webkit-box-shadow: 0 1px 4px rgba(0,21,41,.08);
	box-shadow: 0 1px 4px rgba(0,21,41,.08);
	padding-right: 20px;
	padding-left: 0;
}
.copyright{
	background: #f0f2f5;
	text-align: center;
	padding: 30px 0;
	color: rgba(0,0,0,.45);
}
</style>
