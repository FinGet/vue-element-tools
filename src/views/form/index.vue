<template>
  <div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="活动名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <h4>正则验证</h4>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="ruleForm.email"></el-input>
      </el-form-item>
      <el-form-item label="富文本必填" prop="content">
        <QuillEditor v-model="ruleForm.content"/>
        <el-input v-model="ruleForm.content" style="display:none"></el-input>
      </el-form-item>
      <el-form-item label="多个输入框" prop="multiple">
        <el-input class="width200px" placeholder="请输入m1" v-model="ruleForm.m1"></el-input>
        <el-input class="width200px marginL10" placeholder="请输入m2" v-model="ruleForm.m2"></el-input>
        <el-input class="width200px marginL10" placeholder="请输入m3" v-model="ruleForm.m3"></el-input>
      </el-form-item>
      <h4>动态验证</h4>
      <el-form-item
        v-for="(domain, index) in ruleForm.domains"
        :label="'域名' + index"
        :key="domain.key"
        :prop="'domains.' + index + '.value'"
        :rules="{
          required: true, message: '域名不能为空', trigger: 'blur'
        }"
      >
        <div class="display-flex">
          <el-input class="width300px marginR10" v-model="domain.value"></el-input>
          <el-button v-if="index==0" type="primary" @click.prevent="addDomain">新增</el-button>
          <el-button v-if="index>0" type="danger" @click.prevent="removeDomain(index)">删除</el-button>
        </div>
      </el-form-item>
      <h4>联动验证</h4>
      <div class="display-flex">
        <el-form-item
          label="租金"
          prop="rent_fee"
        >
          <el-input class="width300px" v-model="ruleForm.rent_fee"></el-input>
        </el-form-item>
        <el-form-item
          class="flex-1"
          label="租金时间段"
          prop="dateRange"
          :rules="ruleForm.rent_fee?{required: true, message:'请填写租金时间段', trigger: 'change'}:{}">
          <el-date-picker
            v-model="ruleForm.rent_date"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
      </div>
      <h4>判断是否重复选择</h4>
      <el-form-item
        v-for="(item,index) in ruleForm.follow"
        :key="item.id"
        :label="'喜欢吃的'+(index+1)"
        :prop="'follow.'+index+'.industry'"
        :rules="[
          {required:true, message:'请选择食品',trigger:'change'},
          {validator: attentionIndustryValidator, trigger:'change'}
        ]"
      >
        <el-select v-model="item.industry" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <h4>主动清除单个验证</h4>
      <el-form-item
        ref="areaForm"
        prop="area"
        label="地址">
        <el-input v-model="ruleForm.area" class="width300px" placeholder="请输入地址"></el-input>
        <el-button type="primary" @click="clearF">清除验证</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import QuillEditor from '@/components/QuillEditor';
  export default {
    data () {
      let multiple = (rule, value, callback) => {
        if (!this.ruleForm.m1) {
          callback(new Error('请输入m1'));
        } else if (!this.ruleForm.m2) {
          callback(new Error('请输入m2'));
        } else if (!this.ruleForm.m3) {
          callback(new Error('请输入m3'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          domains: [{ value: '' }],
          follow: [{ industry: '' }, { industry: '' }, { industry: '' }, { industry: '' }]
        },
        options: [{
          value: '1',
          label: '黄金糕'
        }, {
          value: '2',
          label: '双皮奶'
        }, {
          value: '3',
          label: '蚵仔煎'
        }, {
          value: '4',
          label: '龙须面'
        }, {
          value: '5',
          label: '北京烤鸭'
        }],
        rules: {
          name: { required: true, message: '请填写活动名称', trigger: 'change' },
          email: [
            { required: true, message: '请输入邮箱地址', trigger: 'change' },
            { pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, message: '请输入正确的邮箱地址', trigger: 'change' }
          ],
          content: { required: true, message: '请填写内容', trigger: 'change' },
          multiple: { required: true, validator: multiple, trigger: 'change' },
          area: { required: true, message: '请输入地址', trigger: 'change' }
        }
      };
    },
    components: { QuillEditor },
    methods: {
      addDomain () {
        this.ruleForm.domains.push({ value: '' });
      },
      removeDomain (index) {
        this.ruleForm.domains.splice(index, 1);
      },
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      clearF () {
        this.$refs.areaForm.clearValidate();
      },
      resetForm (formName) {
        this.$refs[formName].resetFields();
      },
      attentionIndustryValidator (rule, val, callback) {
        let num = 0;
        this.ruleForm.follow.forEach(item => {
          // 这里做一次数组判重
          if (val == item.industry) {
            num++;
          }
        });
        if (num >= 2) {
          callback(new Error('请勿重复选择相同的食品!'));
        } else {
          callback();
        }
      }
    }
  };
</script>

<style lang="less" scoped>

</style>
