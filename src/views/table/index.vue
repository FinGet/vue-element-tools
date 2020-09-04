<template>
  <div>
    <el-button
      class="marginB10"
      icon="el-icon-s-promotion"
      type="primary"
      @click="export_excel">导出</el-button>
    <el-table
      border
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column
        label="日期"
        width="180"
      >
        <template slot-scope="scope">
          {{ scope.row.date | dateFormat }}
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180"
      >
      </el-table-column>
      <el-table-column
        label="身价"
        width="180"
      >
        <template slot-scope="scope">
          {{ scope.row.money | moneyFormat }}
        </template>
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址"
      >
      </el-table-column>
    </el-table>
    <el-button
      class="marginT10 marginB10"
      type="primary"
      @click="handleImport">上传解析excel</el-button>
    <input ref="Input" @change="handleUpload" accept=".xls,.xlsx" style="display:none" type="file">
    <el-input
      type="textarea"
      placeholder="请输入内容"
      v-model="fileData">
    </el-input></div>
</template>

<script>
  import { exportExcel, file2Xce } from '@/utils/index';
  export default {
    data () {
      return {
        tableData: [{
          date: 1593327154694,
          name: '王小虎',
          money: 129302.0292,
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: 1593327154694,
          name: '王小虎',
          money: 102.02,
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: 1593327154694,
          name: '王小虎',
          money: 10222220,
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: 1593327154694,
          name: '王小虎',
          money: 1029283.22,
          address: '上海市普陀区金沙江路 1516 弄'
        }],
        fileData: ''
      };
    },
    methods: {
      export_excel () {
        let header = ['姓名', '日期', '地址'];
        let val = ['name', 'date', 'address'];
        exportExcel(header, val, this.tableData, '导出表格');
      },
      handleImport () {
        this.$refs.Input.dispatchEvent(new MouseEvent('click'));
      },
      handleUpload (e) {
        let file = e.target.files[0];
        if (file) {
          file2Xce(file).then(data => {
            console.log(data);
            this.fileData = JSON.stringify(data);
          });
        }
      }
    }
  };
</script>
