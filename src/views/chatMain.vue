<template>
  <div style="height: 100%;">
    <el-row style="height: 65%; background: white;">
      <el-row style="height: 10%;" class="chat-banner">
        <el-col :span="2">
          <div style="padding: 5px;">
            <el-button icon="el-icon-close" @click="back" accesskey="w" circle></el-button>
          </div>
        </el-col>
        <el-col :span="10" :offset="5" style="height: 100%;">
          <div>
            <p class="chat-banner-title overflow-text">{{ realUserInfo.displayName }}</p>
          </div>
        </el-col>
      </el-row>
      <!-- 消息显示区域 -->
      <div class="msg-container">
        <!-- <markdown :source="msgDto.content"></markdown> -->
        <div class="dialog"></div>
      </div>
    </el-row>
    <div class="line"></div>
    <!-- 消息发送快捷键 -->
    <div style="width: 100%; height: 0px; background: black;" @click="send" accesskey="/"></div>
    <!-- 消息输入区域 -->
    <el-row style="height: 35%;">
      <mavon-editor class="editor" v-model="msgDto.content" codeStyle="monokai-sublime" />
    </el-row>
  </div>
</template>

<script>
export default {
  props: {
    userInfo: {
      displayName: "",
      avatar: "",
      userName: "",
      email: "",
      uid: ""
    }
  },
  data() {
    return {
      msgDto: {
        senderUid: "",
        receiverUid: "",
        content: "",
        contentType: "",
        msgType: ""
      },
      realUserInfo: {
        displayName: "",
        avatar: "",
        userName: "",
        email: "",
        uid: ""
      }
    };
  },
  methods: {
    back() {
      this.$router.push({ name: "defaultView" });
    },
    send() {
      this.$emit("send-msg", {
        senderUid: "",
        receiverUid: this.userInfo.uid,
        content: this.msgDto.content,
        contentType: "",
        msgType: "",
        state: "1"
      });
      // 将这条消息刷到屏幕中，设置一个等待回应的图标，若回应成功，删掉取消回应的图标
      this.msgDto.content = "";
    },
    async getUser() {
      const res = await this.$service.get("/auth_api/user").catch(() => {});
      this.realUserInfo = res.data;
    }
  },
  created() {
    if (this.userInfo != null) {
      this.realUserInfo = this.userInfo;
    } else {
      this.getUser();
    }
  }
};
</script>

<style>
.editor {
  max-height: 100% !important;
  min-height: 100% !important;
}
.dialog {
  width: 70%;
  height: auto;
  min-height: 1.5rem;
  background: black;
  border: 1px solid black;
  border-radius: 5px;
}
.owner {
}
.other {
}
.msg-container {
}
</style>