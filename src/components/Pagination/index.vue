<template>
  <div class="pagination-wrapper">
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="pagination.page"
      :page-sizes="pageSizes"
      :page-size.sync="pagination.pageSize"
      :layout="layout"
      :total="pagination.total"
    >
    </el-pagination>
  </div>
</template>

<script>
  export default {
    props: {
      pagination: {
        type: Object,
        default: () => ({
          page: 1,
          pageSize: 10,
          total: 0
        })
      },
      layout: {
        type: String,
        default: 'total, sizes, prev, pager, next'
      },
      pageSizes: {
        type: Array,
        default: () => [10, 20, 30, 40]
      }
    },
    methods: {
      handleCurrentChange (val) {
        this.$emit('change', 'page', val);
      },
      handleSizeChange (val) {
        this.$emit('change', 'pageSize', val);
      }
    }
  };
</script>

<style lang="less" scoped>
.pagination-wrapper {
	margin-top: 10px;
	text-align: right;
}
</style>
