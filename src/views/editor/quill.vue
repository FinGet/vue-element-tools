<!--
 * @Author: Finget
 * @Date: 2020-05-28 17:19:27
 * @LastEditors: Finget
 * @LastEditTime: 2020-05-28 17:24:12
 * @FilePath: /framework/src/views/editor/quill.vue
-->
<template>
  <div>
    <QuillEditor v-model="content"/>
  </div>
</template>

<script>
  import QuillEditor from '@/components/QuillEditor';
  export default {
    data () {
      return {
        content: ''
      };
    },
    components: { QuillEditor }
  };
</script>

<style lang="less" scoped>

</style>
