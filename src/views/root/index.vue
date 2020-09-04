<template>
  <div>
    <el-button @click="syncRoleTree" type="primary" class="marginB10">同步权限</el-button>
    <tree-table :data="treeData" isAction @change="handleSelectionChange"></tree-table>
  </div>
</template>

<script>
  import treeData from '@/router/roleConfig';
  import TreeTable from '@/components/TreeTable';
  import { syncRoleTree } from '@/api/user';
  export default {
    data () {
      return {
        treeData,
        selected: []
      };
    },
    components: { TreeTable },
    methods: {
      handleSelectionChange (val) {
        let keys = [];
        val.forEach(item => {
          keys.push(item.key);
        });
        this.selected = keys;
      },
      syncRoleTree () {
        syncRoleTree({ items: this.treeData }).then(res => {

        });
      }
    }
  };
</script>

<style lang="less" scoped>

</style>
