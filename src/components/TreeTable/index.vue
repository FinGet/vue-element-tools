<template>
  <div>
    <el-table
      :data="data"
      ref="multipleTable"
      style="width: 100%"
      @select="select"
      @select-all="selectAll"
      @selection-change="handleSelectionChange"
      row-key="key"
      border
      default-expand-all
      :tree-props="treeProps">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column
        prop="title"
        label="模块/页面/按钮">
      </el-table-column>
      <el-table-column
        prop="key"
        label="key"
        width="180">
      </el-table-column>
      <el-table-column
        prop="desc"
        label="描述">
      </el-table-column>
      <el-table-column
        prop="path"
        label="Route">
      </el-table-column>
      <template v-if="!$slots.default && isAction">
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </template>
      <slot/>
    </el-table>
    <el-dialog
      title="编辑"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <el-form ref="form" :model="form" label-width="60px" label-suffix=":">
        <el-form-item label="Key" prop="key" :rules="{required: true}">{{ form.key }}</el-form-item>
        <el-form-item label="Api" prop="api" :rules="{required: true, message: '请填写api', trigger:'change'}">
          <template v-for="(item, index) in form.api">
            <div :key="index" class="display-flex marginB10">
              <el-input v-model="item.api"></el-input>
              <el-button
                @click="handleChangeApi('add', index)"
                v-if="index==(form.api.length-1)"
                class="marginL10"
                type="primary"
                icon="el-icon-plus"
                circle></el-button>
              <el-button
                @click="handleChangeApi('minus', index)"
                v-else
                class="marginL10"
                icon="el-icon-minus"
                circle></el-button>
            </div>
          </template>
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
  import { getKeyPermission, bindKeyApi } from '@/api/user';
  export default {
    props: {
      data: {
        type: Array,
        default: () => []
      },
      isAction: {
        type: Boolean,
        default: false
      },
      treeProps: {
        type: Object,
        default: () => {
          return { children: 'children', hasChildren: 'hasChildren' };
        }
      },
      value: {
        type: Array,
        default: () => []
      }
    },
    model: {
      props: 'value',
      event: 'change'
    },
    watch: {
      value: {
        handler (val) {
          if (val.length) {
            this.createData(this.data, val);
          }
        },
        immediate: true,
        deep: true
      },
      data: {
        handler (val) {
          this.createData(val);
          console.log(this.tableData);
        },
        immediate: true,
        deep: true
      }
    },
    data () {
      return {
        dialogVisible: false,
        form: {
          key: '',
          api: []
        },
        confirmLoading: false,
        tableData: []
      };
    },
    methods: {
      createData (data, val) {
        data.forEach(item => {
          if (val && val.includes(item.key)) {
            this.toggleSelection(item, true);
            if (item.children && item.children.length) {
              this.createData(item.children, val);
            }
          }
        });
      },
      handleSelectionChange (val) {
        let allKeys = [];
        val.length && val.forEach(item => {
          allKeys.push(item.key);
        });
        this.$emit('change', allKeys);
      },
      // 切换选择状态
      toggleSelection (row, select) {
        if (row) {
          this.$nextTick(() => {
            this.$refs.multipleTable && this.$refs.multipleTable.toggleRowSelection(row, select);
          });
        }
      },
      recursion (item, select) {
        if (!item.children) return;
        item.children.forEach(sub => {
          this.toggleSelection(sub, select);
          this.recursion(sub, select);
        });
      },
      // 清除全部
      clearAllCheck () {
        this.$refs.multipleTable.clearSelection();
      },
      select (selection, row) {
        if (selection.some(el => { return row.key === el.key; })) {
          if (row.children) {
            this.recursion(row, true);
          }
        } else {
          if (row.children) {
            this.recursion(row, false);
          }
        }
      },
      selectAll (selection) {
        const isSelect = selection.some(el => {
          const tableDataIds = this.data.map(j => j.key);
          return tableDataIds.includes(el.key);
        });
        const isCancel = !this.data.every(el => {
          const selectIds = selection.map(j => j.key);
          return selectIds.includes(el.key);
        });
        if (isSelect) {
          selection.map(el => {
            if (el.children) {
              this.recursion(el, true);
            }
          });
        }
        if (isCancel) {
          this.data.map(el => {
            if (el.children) {
              this.recursion(el, false);
            }
          });
        }
      },
      // 编辑
      handleEdit (row) {
        console.log(row);
        this.form.key = row.key;
        getKeyPermission({
          unique_key: row.key
        }).then(res => {
          let router = res.data.routers || [];
          if (router.length) {
            router.forEach(item => {
              this.form.api.push({ api: item });
            });
          } else {
            this.form.api.push({ api: '' });
          }
          this.dialogVisible = true;
        });
      },
      onSubmit () {
        this.$refs.form.validate(valid => {
          if (valid) {
            this.confirmLoading = true;
            let params = { key: this.form.key, routers: [] };
            if (this.form.api.length) {
              this.form.api.forEach(item => {
                params.routers.push(item.api);
              });
            }
            params.routers = params.routers.join(',');
            bindKeyApi(params).then(res => {
              if (res.code === 0) {
                this.handleClose();
              }
            }).finally(() => {
              this.confirmLoading = false;
            });
          } else {
            console.log('err');
          }
        });
      },
      handleClose () {
        this.$refs.form.resetFields();
        this.form = {
          key: '',
          api: []
        };
        this.dialogVisible = false;
      },
      handleChangeApi (type, index) {
        if (type === 'add') {
          this.form.api.push({ api: '' });
        } else {
          this.form.api.splice(index, 1);
        }
      }
    }
  };
</script>

<style lang="less" scoped>

</style>
