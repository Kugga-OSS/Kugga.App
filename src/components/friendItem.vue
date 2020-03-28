<template>
  <div class="friend-flex">
    <div style="display: flex; justify-content: flex-start; align-items: center;">
      <div style="width: 40%;">
        <img :src="avatar" class="friend-avatar" />
      </div>
      <div style="margin-left: 5px; width: 80%;" class="overflow-text" v-if="type != 'recentChatList'">
        <div>用户名 : {{username}}</div>
        <div>昵称 : {{displayName}}</div>
      </div>
    </div>

    <div v-if="showIcon === true  || requestStatus !== wait">
      <i v-if="requestStatus == pass" class="el-icon-success icon-font status-success"></i>
      <i v-if="requestStatus == wait" class="el-icon-loading icon-font statuc-wait"></i>
      <i v-if="requestStatus == fail" class="el-icon-error icon-font status-fail"></i>
    </div>
    <div style="min-width: 50px;" v-if="showIcon === false && requestStatus === wait">
      <el-button @click="agree" type="success" icon="el-icon-check" style="margin: 3px 3px;" circle></el-button>
      <el-button @click="reject" type="info" icon="el-icon-close" style="margin: 3px 3px;" circle></el-button>
    </div>
    <div v-if="addBtn == true" style="min-width: 50px;">
      <el-button type="success" icon="el-icon-plus" @click="ifCreateAddRequest(username)" circle></el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    displayName: String,
    requestStatus: Number,
    avatar: String,
    username: String,
    showIcon: Boolean,
    addBtn: Boolean,
    type: String
  },
  data() {
    return {
      pass: 2,
      wait: 1,
      fail: 0
    };
  },
  methods: {
    async agree() {
      const res = await this.$service
        .post(
          "/auth_api/user/friendRequest",
          { type: "agree", otherUsername: this.username },
          null
        )
        .catch(() => {});
      if (res && res.data && res.data.message) {
        this.$message({
          message: res.data.message,
          type: "success"
        });
      }
      this.$emit("when-update");
    },
    async reject() {
      const res = await this.$service
        .post(
          "/auth_api/user/friendRequest",
          { type: "reject", otherUsername: this.username },
          null
        )
        .catch(() => {});
      if (res && res.data && res.data.message) {
        this.$message({
          message: res.data.message,
          type: "danger"
        });
      }
      this.$emit("when-update");
    },
    // 发送一条添加好友请求
    ifCreateAddRequest(userName) {
      this.$confirm("是否添加好友?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.createNewAddRequest(userName);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消添加"
          });
        });
    },
    async createNewAddRequest(userName) {
      const res = await this.$service
        .post("/auth_api/user/add", { otherUsername: userName }, null)
        .catch(() => {});
      if (res && res.data) {
        this.$message({
          type: "success",
          message: res.data.message
        });
      }
    }
  }
};
</script>

<style>
.friend-flex {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.friend-flex:hover {
  background: #f0f0f0;
  box-shadow: 2px 2px #888888;
  transition: all 0.3s;
}
.icon-font {
  font-size: 2rem;
}
.status-success {
  color: greenyellow;
}
.status-wait {
  color: blue;
}
.status-fail {
  color: red;
}
</style>