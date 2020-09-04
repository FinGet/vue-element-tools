<template>
  <div>
    <el-button @click="dialogVisible=true" type="primary" class="marginB10">创建角色</el-button>
    <el-form inline>
      <el-form-item label="角色名称">
        <el-input placeholder="请输入角色名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="search" type="primary">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      v-loading="loadingTable"
      border
      style="width: 100%">
      <el-table-column
        prop="id"
        label="Id"
        width="90">
      </el-table-column>
      <el-table-column
        prop="role_name"
        label="角色名称">
      </el-table-column>
      <el-table-column
        prop="created_at"
        label="创建时间">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleClick('edit',scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="handleClick('del',scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination @change="pageChange" :pagination="pagination"/>
    <el-dialog
      title="编辑"
      :visible.sync="dialogVisible"
      width="60%"
      :before-close="handleClose">
      <el-form ref="form" :model="form" label-suffix=":">
        <el-form-item label="角色名称" prop="role_name" :rules="{required: true, message:'请输入角色名称', trigger:'change'}">
          <el-input v-model="form.role_name" placeholder="请输入角色名称"></el-input>
        </el-form-item>
        <el-form-item label="权限" prop="unique_keys" :rules="{required: true, message:'请选择权限', trigger:'change'}">
          <TreeTable v-model="form.unique_keys" :data="treeData"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button v-loading="confirmLoading" type="primary" @click="onSubmit">保存</el-button>
        <el-button @click="handleClose">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import TreeTable from '@/components/TreeTable';
  import treeData from '@/router/roleConfig';
  import { getRoleList, createUser, delRole, getRolePermission } from '@/api/user';

  export default {
    data () {
      return {
        treeData,
        tableData: [
          {
            created_at: 0,
            id: 1,
            role_name: 'admin',
            updated_at: 0
          },
          {
            created_at: 0,
            id: 2,
            role_name: 'test',
            updated_at: 0
          }
        ],
        loadingTable: false,
        pagination: {
          page: 1,
          pageSize: 10,
          total: 2
        },
        dialogVisible: false,
        confirmLoading: false,
        form: {
          role_name: '',
          unique_keys: []
        }
      };
    },
    components: { TreeTable },
    mounted () {
      // this.getTableData();
    },
    methods: {
      search () {
        this.pagination.page = 1;
        this.getTableData();
      },
      getTableData () {
        let { page, pageSize } = this.pagination;
        this.loadingTable = true;
        getRoleList({ pageSize, currentPage: page }).then(res => {
          if (res.code === 0) {
            this.tableData = res.data;
            this.pagination.total = res.meta.pagination.page_total;
          }
          this.loadingTable = false;
        });
      },
      pageChange (type, val) {
        console.log(type, val);
        this.pagination[type] = val;
      },
      handleClick (type, item) {
        if (type === 'edit') {
          this.form.role_name = item.role_name;
          getRolePermission({ id: item.id }).then(res => {
            if (res.code === 0) {
              this.form.unique_keys = res.data.unique_keys;
              this.dialogVisible = true;
            }
          });
        } else if (type === 'del') {
          this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
            type: 'warning'
          }).then(() => {
            delRole({ id: item.id }).then(res => {
              if (res.code === 0) {
                this.getTableData();
              }
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        }
      },
      onSubmit () {
        this.$refs.form.validate(valid => {
          if (valid) {
            this.confirmLoading = true;
            let params = JSON.parse(JSON.stringify(this.form));
            params.unique_keys = params.unique_keys.join(',');
            createUser(params).then(res => {
              if (res.code == 0) {
                this.handleClose();
                this.search();
              }
            }).finally(() => {
              this.confirmLoading = false;
            });
          }
        });
      },
      handleClose () {
        this.$refs.form.resetFields();
        this.form = {
          role_name: '',
          unique_keys: []
        };
        this.dialogVisible = false;
      }
    }
  };
</script>

<style lang="less" scoped>

</style>
