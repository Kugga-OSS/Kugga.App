<template>
  <div>
    <div>
      <h2>【登录】：欢迎使用 Kugga！</h2>
    </div>
    <div class="login" style="height: 100%;">
      <img
        src="https://kugga-storage.oss-cn-hangzhou.aliyuncs.com/avatar/default.png"
        alt
        class="icon"
      />
      <div class="form" style="height: 100%;">
        <el-form
          ref="form"
          :model="form"
          :rules="rules"
          label-width="0"
          style="height: 100%; padding: 20px 20px; font-size: 1.2rem;"
          status-icon
        >
          <el-form-item prop="username">
            <el-input v-model="form.username" placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" v-model="form.password" placeholder="密码" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-row :gutter="20">
              <el-col :span="4" :offset="4">
                <el-button type="primary" @click="login" round>登录</el-button>
              </el-col>
              <el-col :span="4" :offset="4">
                <el-button type="success" @click="register" round>注册</el-button>
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    username: String
  },
  data() {
    var checkUsername = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("用户名不能为空"));
      }
      setTimeout(() => {
        if (String(value).length < 8) {
          callback(new Error("用户名长度不得小于 8 位"));
        } else if (String(value).length > 16) {
          callback(new Error("用户名长度不得大于 16 位"));
        } else {
          value = String(value);
          for (var i = 0; i < value.length; i++) {
            if (isNaN(value.charAt(i))) {
              callback(new Error("用户名必须全为数字"));
            }
          }
          callback();
        }
      }, 200);
    };
    var checkPass = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("密码不能为空"));
      }
      setTimeout(() => {
        if (String(value).length < 8) {
          callback(new Error("密码长度不得小于 6 位"));
        } else if (String(value).length > 20) {
          callback(new Error("用户名长度不得大于 20 位"));
        }
        callback();
      }, 200);
    };
    return {
      form: {},
      rules: {
        username: [{ validator: checkUsername, trigger: "blur" }],
        password: [{ validator: checkPass, trigger: "blur" }]
      }
    };
  },
  methods: {
    async login() {
      const res = await this.$service
        .get("/api/user", {
          username: this.form.username,
          password: this.form.password
        })
        .catch(err => {});
      const token = res.data.jwt;
      if (token != null) {
        localStorage.token = token;
        this.$router.push({
          name: "defaultView",
        });
        this.$notify({
          title: "登录成功",
          type: "success"
        });
      }
    },
    register() {
      this.$router.push({ name: "register" });
    },
    async getUser() {
      const userInfo = await this.$service
        .get("/auth_api/user")
        .catch(() => {});
      if (userInfo && userInfo.data && String(userInfo.data.state) == "1") {
        this.$router.push({
          name: "defaultView",
          params: { ownerInfo: userInfo.data }
        });
      }
    }
  },
  created() {
    if (localStorage && localStorage.token) {
      const res = this.getUser();
    }
    if (this.username != null) {
      this.form.username = this.username;
    }
  }
};
</script>

<style>
</style>>