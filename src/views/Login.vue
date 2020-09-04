<template>
  <div class="login-container">
    <div class="login">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item>
          <el-input prefix-icon="el-icon-user-solid" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input prefix-icon="el-icon-lock" type="password" v-model="form.pass">
            <i slot="suffix" class="el-input__icon el-icon-date"></i>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="width100" type="primary" @click="login">登录</el-button>
        </el-form-item>
        <p class="fr forget-password">忘记密码</p>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Login',
    data () {
      return {
        form: {
          name: 'FinGet',
          pass: '123456'
        }
      };
    },
    methods: {
      login () {
        let { name, pass } = this.form;
        if (name === 'FinGet' && pass === '123456') {
          this.$message.success('登录成功!');
          this.$router.push({ name: 'Dashboard' });
        }
      }
    }
  };
</script>

<style lang="less" scoped>
.login-container {
	width: 100%;
	height: 100%;
	background: #6699CC;
	.login {
		width: 450px;
		margin: 0 auto;
		padding-top: 160px;
		.forget-password{
			font-size: 14px;
			color: #bbb;
			cursor: pointer;
			&:hover {
				color: #fff;
			}
		}
	}
}
</style>
