<template>
  <div>
    <div>
      <h2>欢迎使用 Kugga ！</h2>
    </div>
    <div class="login" style="height: 100%">
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
          style="height: 100%; padding: 20px 20px; font-size: 1.2rem"
          status-icon
        >
          <el-form-item prop="username">
            <el-input v-model="form.username" placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" v-model="form.password" placeholder="密码"></el-input>
          </el-form-item>
          <el-form-item prop="checkPassword">
            <el-input type="password" v-model="form.checkPassword" placeholder="确认密码"></el-input>
          </el-form-item>
          <el-form-item prop="displayName">
            <el-input v-model="form.displayName" placeholder="昵称"></el-input>
          </el-form-item>
          <el-form-item prop="email">
            <el-input v-model="form.email" placeholder="邮箱"></el-input>
          </el-form-item>
          <el-form-item>
            <el-row :gutter="20">
              <el-col :span="4" :offset="8">
                <el-button type="success" @click="register" round>注册</el-button>
              </el-col>
            </el-row>
          </el-form-item>
          <el-row>
            <el-col :span="4" :offset="0">
              <el-button
                type="primary"
                icon="el-icon-back"
                size="small"
                style="background-color: white; color: black; border: none;"
                @click="backToLogin"
              >返回登录</el-button>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
    var reCheckPass = (rule, value, callback) => {
      if (!value || value === "") {
        return callback(new Error("请确认密码"));
      }
      setTimeout(() => {
        if (this.form.password !== value) {
          callback(new Error("两次输入密码不一致!"));
        }
        callback();
      }, 200);
    };
    var checkDisplayName = (rule, value, callback) => {
      if (!value || value === "") {
        return callback(new Error("请输入昵称"));
      }
      setTimeout(() => {
        if (String(value).length > 20) {
          callback("昵称不得超过 20 位");
        }
        callback();
      }, 200);
    };
    var checkEmail = (rule, value, callback) => {
      if (!value || value === "") {
        return callback(new Error("邮箱不得为空"));
      }
      setTimeout(() => {
        if (!String(value).includes("@") || String(value).length <= 7) {
          callback("不是合法的邮箱地址");
        }
        callback();
      }, 200);
    };
    return {
      form: {},
      rules: {
        username: [{ validator: checkUsername, trigger: "blur" }],
        password: [{ validator: checkPass, trigger: "blur" }],
        checkPassword: [{ validator: reCheckPass, trigger: "blur" }],
        displayName: [{ validator: checkDisplayName, trigger: "blur" }],
        email: [{ validator: checkEmail, trigger: "blur" }]
      }
    };
  },
  methods: {
    async register() {
      const res = await this.$service.post("/api/user", {
        username: this.form.username,
        password: this.form.password,
        displayName: this.form.displayName,
        email: this.form.email
      });
      console.log(res);
    },
    backToLogin() {
        this.$router.push({ name : "login" });
    }
  }
};
</script>

<style>
</style>>