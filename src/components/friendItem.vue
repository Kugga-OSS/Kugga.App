<template>
  <div class="friend-flex">
    <div style="display: flex; justify-content: flex-start;">
      <div style="width: 30%;">
        <img :src="avatar" class="friend-avatar" />
      </div>
      <div style="margin-top: 25px; margin-left: 5px;" class="overflow-text">
        用户名 : {{username}}
        <br />
        昵称 : {{displayName}}
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
  </div>
</template>

<script>
export default {
  props: {
    displayName: String,
    requestStatus: Number,
    avatar: String,
    username: String,
    showIcon: Boolean
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
    }
  }
};
</script>

<style>
.friend-flex {
  display: flex;
  justify-content: flex-start;
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