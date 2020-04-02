<template>
  <div :class="type !== 'recentChatList' ?  'friend-flex' : 'recent-list'">
    <div class="recent-flex">
      <!-- 头像 -->
      <div style="width: 40%;">
        <img :src="avatar" class="friend-avatar" />
      </div>
      <!-- 其他消息 -->
      <div style="margin-left: 5px; width: 40%;" v-if="type == 'recentChatList'">
        <div class="overflow-text" style="float:left;">{{displayName}}</div>
      </div>

      <div
        style="margin-left: 5px; width: 80%;"
        class="overflow-text"
        v-if="type != 'recentChatList'"
      >
        <div>用户名 : {{username}}</div>
        <div>昵称 : {{displayName}}</div>
      </div>

      <div class="pointer" v-if="type == 'recentChatList'" style="width: 20%;">
        <el-button @click="removeItem" type="info" icon="el-icon-close" class="close-btn" size="small" circle></el-button>
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
    type: String,
    uid: Number
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
        // 这次http请求返回结果合法，则向上回调，通过websocket对目标user发送提示
        this.$emit("send-new-request", this.uid);
        this.$message({
          type: "success",
          message: res.data.message
        });
      }
    },
    removeItem(event) {
      this.$emit("remove-item", this.username);
      if (event && event.stopPropagation) event.stopPropagation();
      else window.event.cancelBubble = true;
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
.recent-list:hover .pointer>.close-btn {
  background: #f0f0f0;
  box-shadow: 2px 2px #888888;
  transition: all 0.3s;
  background: #f0f0f0;
  color: black;
}

.close-btn {
  /* color: black; */
  background: white;
  color: white;
  border: none;
}

.recent-flex {
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