<template>
  <div>
    <div>
      <h3>数字输入框</h3>
      <NumberInput class="width100px" placeholder="输入整数" v-model="count" />
    </div>
    <div>
      <NumberInput class="marginT10 width100px" placeholder="输入小数" isDecimal v-model="c_count"/>
    </div>
    <h3>可拖拽弹窗</h3>
    <el-button class="marginT10" type="primary" @click="dialogVisible=true">可拖拽弹窗</el-button>
    <el-dialog
      v-dialogDrag
      title="提示"
      :visible.sync="dialogVisible"
      width="30%">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <div class="marginT10">
      <h3>倒计时</h3>
      <CountDown :target="1609286400000"/>
    </div>
  </div>
</template>

<script>
  import NumberInput from '@/components/NumberInput/index';
  import CountDown from '@/components/CountDown';
  export default {
    data () {
      return {
        count: '',
        c_count: '',
        dialogVisible: false
      };
    },
    components: { NumberInput, CountDown }
  };
</script>

<style lang="less" scoped>

</style>
