<template>
  <el-dialog
    :title="title"
    :visible.sync="isVisiable"
    width="30%"
    :before-close="handleClose"
    :center="true"
  >
    <div style="height: auto; ">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="个人信息" name="first">
          <div class="vertical-flex">
            <div>
              <img :src="userInfo.avatar" alt class="vertical-avatar" />
            </div>
            <div>
              <h4 style="margin: 5px 0;">
                <br />
                用户名 : {{ userInfo.userName }}
                <br />
                <br />
                昵称 : {{ userInfo.displayName }}
                <br />
                <br />
                邮箱 : {{ userInfo.email }}
                <br />
              </h4>
            </div>
          </div>
        </el-tab-pane>

        <el-tab-pane label="更换头像" name="second">
          <div class="vertical-flex">
            <div>
              <h4 style="margin: 5px 0;">点击直接上传图片</h4>
            </div>
            <el-upload
              class="upload-demo"
              drag
              action="null"
              :http-request="uploadAvatar"
              :before-upload="beforeUpload"
              :multiple="false"
            >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">
                将文件拖到此处，或
                <em>点击上传</em>
              </div>
              <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </div>
        </el-tab-pane>

        <el-tab-pane label="修改密码" name="third">
          <el-form :model="passForm" :rules="passRules" @validate="checkForm">
            <el-form-item label="原密码" prop="originPass">
              <el-input
                v-model="passForm.originPass"
                autocomplete="off"
                type="password"
                show-password
              ></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="newPass">
              <el-input v-model="passForm.newPass" autocomplete="off" type="password" show-password></el-input>
            </el-form-item>
            <el-form-item label="确认新密码" prop="checkNewPass">
              <el-input
                v-model="passForm.checkNewPass"
                autocomplete="off"
                type="password"
                show-password
              ></el-input>
            </el-form-item>
            <div class="center-btn">
              <el-button
                @click="submit('password')"
                type="primary"
                :disabled="disableSubmitPass"
                round
              >提交</el-button>
            </div>
          </el-form>
        </el-tab-pane>

        <el-tab-pane label="修改昵称" name="forth">
          <el-form
            :model="displayNameForm"
            :rules="displayNameRules"
            @validate="checkDisplayNameForm"
          >
            <el-form-item label="修改昵称" prop="displayName">
              <el-input v-model="displayNameForm.displayName" autocomplete="off"></el-input>
            </el-form-item>
            <div class="center-btn">
              <el-button
                @click="submit('displayName')"
                type="primary"
                :disabled="disableSubmitDisplayName"
                round
              >提交</el-button>
            </div>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="修改邮箱" name="fifth">
          <el-form :model="emailForm" :rules="emailRules" @validate="checkEmailForm">
            <el-form-item label="新邮箱" prop="email">
              <el-input v-model="emailForm.email" autocomplete="off"></el-input>
            </el-form-item>
            <div class="center-btn">
              <el-button
                @click="submit('email')"
                type="primary"
                :disabled="disableSubmitEmail"
                round
              >提交</el-button>
            </div>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    isVisiable: Boolean,
    title: String
  },
  data() {
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
      }, 0);
    };
    var reCheckPass = (rule, value, callback) => {
      if (!value || value === "") {
        return callback(new Error("请确认密码"));
      }
      setTimeout(() => {
        if (this.passForm.newPass !== value) {
          callback(new Error("两次输入密码不一致!"));
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
    return {
      activeName: "first",
      // 用户信息
      userInfo: {
        userName: "",
        displayName: "",
        avatar: "",
        email: "",
        state: ""
      },
      // 修改密码相关状态
      passForm: {
        originPass: "",
        newPass: "",
        checkNewPass: ""
      },
      passRules: {
        originPass: [{ validator: checkPass, trigger: "blur" }],
        newPass: [{ validator: checkPass, trigger: "blur" }],
        checkNewPass: [{ validator: reCheckPass, trigger: "blur" }]
      },
      disableSubmitPass: true,
      check: {
        originPass: false,
        newPass: false,
        checkNewPass: false
      },
      // 修改邮箱相关状态
      disableSubmitEmail: true,
      checkEmail: false,
      emailForm: {
        email: ""
      },
      emailRules: {
        email: [{ validator: checkEmail, trigger: "blur" }]
      },
      // 修改昵称相关状态
      displayNameForm: {
        email: ""
      },
      disableSubmitDisplayName: true,
      displayNameRules: {
        displayName: [{ validator: checkDisplayName, trigger: "blur" }]
      }
      // 关于头像相关状态
    };
  },
  methods: {
    async submit(type) {},
    async getUser() {
      const res = await this.$service.get("/auth_api/user").catch(() => {});
      this.userInfo = res.data;
    },
    async uploadAvatar(param) {
        const file = param.file;
        const res = await this.$service.upload("/auth_api/user/avatar", file);
        if (res && res.data && res.data.message) {
          this.$message({
            message: res.data.message,
            type: "success"
          })
        }
        this.userInfo.avatar = res.data.url;
    },
    beforeUpload(file) {
      console.log(file.type);
        if (file.type != "image/png" && file.type != "image/jpg" && file.type != "image/jpeg") {
            this.$message.error("请上传图片文件！");
            return false;
        }
    },
    close() {
      this.$emit("close-float-box");
    },
    handleClick(tab, event) {},
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          this.$emit("close-float-box");
        })
        .catch(_ => {});
    },
    checkForm(prop, isSuccess, msg) {
      this.check[prop] = isSuccess;
      for (var item in this.check) {
        if (this.check[item] === false) {
          this.disableSubmitPass = true;
          return;
        }
      }
      this.disableSubmitPass = false;
    },
    checkEmailForm(prop, isSuccess, msg) {
      if (isSuccess === true) {
        this.disableSubmitEmail = false;
      }
    },
    checkDisplayNameForm(prop, isSuccess, msg) {
      if (isSuccess === true) {
        this.disableSubmitDisplayName = false;
      }
    },
    handleAvatarSuccess(file) {
        this.$message.success("更换头像成功");
    }
  },
  watch: {
    isVisiable: {
      immediate: true,
      handler() {
        if (this.isVisiable) {
          this.getUser();
        }
      }
    }
  }
};
</script>

<style>
.center-btn {
  display: flex;
  justify-content: center;
}
.vertical-flex {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.vertical-avatar {
  width: 70px;
  height: 70px;
  border: 2px solid #9e9b9b;
  padding: 2px;
  border-radius: 5px;
}
.vertical-avatar:hover {
  box-shadow: 2px 2px #888888;
}
</style>