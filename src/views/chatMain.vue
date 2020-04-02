<template>
  <div style="height: 100%;">
    <!-- 消息显示区域 -->
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
      <div class="msg-container" style="height: 90%; weight: 100%; overflow: auto;">
        <markdown :source="msgDto.content"></markdown>
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
import base64url from "base64url";

export default {
  props: {
    userInfo: {},
    newMsg: {}
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
      realUserInfo: {},
      msgList: []
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
    async getUser(un) {
      const res = await this.$service.get("/auth_api/user", {username : un}).catch(() => {});
      this.realUserInfo = res.data;
    },
  },
  watch: {
    newMsg: {
      immediate: true,
      handler(val) {
        if (this.newMsg === null || this.newMsg === undefined) {
          return;
        }
        console.log("val is" + JSON.stringify(val));
        console.log(JSON.stringify(this.newMsg) +" from children compom");
      }
    }
  },
  created() {
    // 本来otherInfo依赖于父组件传入的值，但是要是刷新之后，就会产生意外白屏的错误，所以在这里做一层判断
    if (this.userInfo === undefined || this.userInfo === null) {
        const encodedUsername = this.$route.params.id;
        const username = base64url.decode(encodedUsername);
        this.getUser(username);
    } else {
      this.realUserInfo = this.userInfo;
    }
  }
};
</script>

<style>
.editor {
  max-height: 100% !important;
  min-height: 100% !important;
}
</style>