<template>
  <div class="login">
    <el-form label-width="80px" :model="form" class="loginForm">
      <el-form-item label="">
        <el-input
          v-model="form.username"
          placeholder="请输入后台账号"
        ></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-input v-model="form.password" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-checkbox v-model="checked" class="remember">记住密码</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click.native.prevent="handleLogin">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      checked: false,
    };
  },
  methods: {
    async handleLogin() {
      const { username, password } = this.form;
      const res = await this.$store.dispatch('user/Login',{ username, password })
      this.$router.push({
        path: '/home'
      })
    }
  }
};
</script>

<style lang="scss">
.login {
  width: 100%;
  height: 100%;
  background: #545c64;
}
.loginForm {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  .remember {
    color: var(--bg-white-color);
  }
}
</style>