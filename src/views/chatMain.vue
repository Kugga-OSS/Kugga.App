<template>
  <div style="height: 100%;">
    <!-- 消息显示区域 -->
    <el-row style="height: 65%; background: white;">
      <el-row style="height: 10%;" class="chat-banner">
        <el-col :span="2">
          <div style="padding: 5px;">
            <el-button icon="el-icon-close" @click="back" circle></el-button>
          </div>
        </el-col>
        <el-col :span="10" :offset="5" style="height: 100%;">
          <div>
            <p class="chat-banner-title overflow-text">{{ userInfo.displayName }}</p>
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
        <mavon-editor class="editor" v-model="msgDto.content" codeStyle="monokai-sublime"/>
    </el-row>
  </div>
</template>

<script>
export default {
  props: {
    userInfo: {
      displayName: "",
      avatar: "",
      userName: ""
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
      }
    };
  },
  methods: {
    back() {
      this.$router.push({ name: "defaultView" });
    },
    send() {
        console.log("发送消息");
        this.msgDto.content = "";
    }
  }
};
</script>

<style>
.editor {
    max-height: 100%!important;
    min-height: 100%!important;
}
</style>