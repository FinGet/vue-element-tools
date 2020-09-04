<template>
  <div class="top-bar">
    <div class="collapse" @click="toggleSideBar">
      <i :class="['vt-fold', 'hamburger', !isCollapse?'is-active':'']"></i>
    </div>
    <div class="user-info">
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          FinGet<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="info">个人信息</el-dropdown-item>
          <el-dropdown-item command="out">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
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
    methods: {
      toggleSideBar () {
        this.$store.dispatch('app/toggleSideBar');
      },
      handleCommand (command) {
        if (command === 'out') {
          this.$store.dispatch('user/logout').then(res => {
            this.$router.push({ path: '/login' });
          });
        }
      }
    }
  };
</script>

<style lang="less" scoped>
.top-bar {
	height: 50px;
}
.collapse {
	float: left;
	height: 50px;
	line-height: 50px;
	padding: 0 24px;
	cursor: pointer;
	&:hover {
		background: rgba(0, 0, 0, 0.025);
	}
	i {
		font-size: 24px;
    color: #6a6a6a;
	}
}
.user-info {
	float: right;
	height: 50px;
	line-height: 48px;
	cursor: pointer;
}
.hamburger {
  display: inline-block;
  vertical-align: middle;
  width: 24px;
  height: 24px;
}

.hamburger.is-active {
  transform: rotate(180deg);
}
</style>
