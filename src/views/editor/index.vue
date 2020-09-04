<!--
 * @Author: Finget
 * @Date: 2020-05-28 16:44:54
 * @LastEditors: Finget
 * @LastEditTime: 2020-05-28 16:47:44
 * @FilePath: /framework/src/views/editor/index.vue
-->
<template>
  <div>
    <Tinymce v-model="content"/>
  </div>
</template>

<script>
  import Tinymce from '@/components/Tinymce';
  export default {
    data () {
      return {
        content: ''
      };
    },
    components: {
      Tinymce
    }
  };
</script>

<style lang="less" scoped>

</style>
