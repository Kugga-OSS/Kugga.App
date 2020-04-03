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
      <div class="msg-container">
        <!-- 消息发送者不是自己就在左边，是自己就在右边 -->
        <div v-for="(item,index) in msgList" v-bind:key="index" :class="String(item.senderUid) === String(realOwnerUserInfo.uid) ? 'chat-parent right' : 'chat-parent left'">
          <img v-if="String(item.senderUid) !== String(realOwnerUserInfo.uid)" :src="realUserInfo.avatar" alt="" class="chat-avatar">
          <!-- 消息内容框区域 -->
          <div
            class="dialog"
          >
            <div
              :class="String(item.senderUid) === String(realOwnerUserInfo.uid) ? 'arrow arrow-right' : 'arrow arrow-left'"
            ></div>
            <div>
              <markdown>{{ item.content }}</markdown>
            </div>
          </div>
          <!-- ------------- -->
          <!-- 头像区域 -->
          <img v-if="String(item.senderUid) === String(realOwnerUserInfo.uid)" :src="realOwnerUserInfo.avatar" alt="" class="chat-avatar">
        </div>
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
    newMsg: {
      // mid: Number,
      // content: String,
      // senderUid: Number,
      // receiverUid: Number,
      // type: Number,
      // msgType: Number,
      // createTime: String,
      // senderName: String,
      // receiverName: String
    },
    ownerUserInfo: {}
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
      // 对方的用户信息
      realUserInfo: {},
      // 自己的用户信息
      realOwnerUserInfo: {},
      msgList: []
    };
  },
  methods: {
    back() {
      this.$router.push({ name: "defaultView" });
    },
    send() {
      if (
        this.msgDto.content === null ||
        this.msgDto.content === "" ||
        this.msgDto.content === undefined
      ) {
        return;
      }
      this.$emit("send-msg", {
        senderUid: "",
        receiverUid: this.realUserInfo.uid,
        content: this.msgDto.content,
        contentType: "",
        msgType: "",
        state: "1"
      });
      // 将这条消息刷到屏幕中，设置一个等待回应的图标，若回应成功，删掉取消回应的图标
      this.msgDto.content = "";
    },
    async getUser(un) {
      const res = await this.$service
        .get("/auth_api/user", { username: un })
        .catch(() => {});
      this.realUserInfo = res.data;
    },
    addNewMsg2List(msg) {
      if (msg === null || msg === undefined) return;
      this.msgList.push(JSON.parse(JSON.stringify(msg)));
      console.log(this.msgList);
    }
  },
  watch: {
    newMsg: {
      immediate: true,
      deep: true,
      handler(oldVal, newVal) {
        if (
          this.newMsg === null ||
          this.newMsg === undefined ||
          Object.keys(this.newMsg).length === 0
        ) {
          return;
        }
        console.log("chatMain component");
        console.log(newVal);
        this.addNewMsg2List(newVal);
      }
    }
  },
  mounted() {
    // 本来otherInfo和ownerUserInfo依赖于父组件传入的值，但是要是刷新之后，就会产生意外白屏的错误，所以在这里做一层判断
    console.log("hello world");
    if (this.userInfo === undefined || this.userInfo === null) {
      const encodedUsername = this.$route.params.id;
      const username = base64url.decode(encodedUsername);
      this.getUser(username);
    } else {
      this.realUserInfo = this.userInfo;
    }
    if (this.ownerUserInfo === undefined || this.ownerUserInfo === null) {
      (async () => {
        const userInfo = await this.$service
          .get("/auth_api/user")
          .catch(() => {});
        this.realOwnerUserInfo = userInfo.data;
      })();
    } else {
      this.realOwnerUserInfo = this.ownerUserInfo;
    }
  },
  created() {}
};
</script>

<style>
.editor {
  max-height: 100% !important;
  min-height: 100% !important;
}

.msg-container {
  height: 90%;
  overflow: auto;
  width: 100%;
}
.dialog {
  min-width: 40%;
  width: auto;
  max-width: 80%;;
  height: auto;
  min-height: 2rem;
  border: 1.5px solid #000;
  border-radius: 10px;
  position: relative;
  margin-top: 10px;
}
.arrow {
  content: "";
  display: block;
  position: absolute;
  width: 0;
  height: 0;
  top: 5%;
  border-top: 8px solid transparent;
  border-bottom: 8px solid transparent;
}
.arrow-left {
border-right: 10px solid #000;
left: -12px;
}
.arrow-right {
border-left: 10px solid #000;
left: 100%;
}
.chat-avatar {
  width: 40px;
  height: 40px;
  border: 2px solid #f1f1f1;
  margin-top: 10px;
  border-radius: 100px;
  margin-left: 15px;
  margin-right: 15px;
}
.chat-parent {
  min-height: 50px;
  height: auto;
  width: 65%;
  margin: 0 5%;
  display: flex;
  align-items: flex-start;
}
.left {
  float: left;
  justify-content: flex-start;
}
.right {
  float: right;
  justify-content: flex-end;
}
</style>