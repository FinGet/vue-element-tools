<template>
  <section class="app-main">
    <div class="main-wrapper">
      <transition name="fade" mode="out-in">
        <keep-alive>
          <router-view :key="key"/>
        </keep-alive>
      </transition>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'AppMain',
    computed: {
      key () {
        return this.$route.path;
      }
    }

  };
</script>

<style lang="less" scoped>
.app-main {
  /* 50= topbar  50  */
  min-height: calc(100vh - 212px);
  // width: 100%;
  position: relative;
	overflow: hidden;
	background: #f0f2f5;
	padding: 20px;
}
.main-wrapper{
	background: #fff;
	padding: 20px;
}
</style>
