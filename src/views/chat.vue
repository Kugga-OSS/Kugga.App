<template>
  <div class="container">
    <el-row style="height: 100%;">
      <!-- 左侧的最近联系人列表区域 -->
      <el-col
        :span="5"
        style="height: 100%; border-radius: 5px; border-right: 1px solid #e1e7ec; overflow: auto;"
      >
        <div v-if="recentChatList.length > 0">
          <div v-for="(item, index) in recentChatList" v-bind:key="index" @click="chatWith(item)">
            <friend-item
              v-on:when-update="reload"
              :displayName="item.displayName"
              :avatar="item.avatar"
              :username="item.userName"
              :showIcon="false"
              type="recentChatList"
            ></friend-item>
            <div class="line"></div>
          </div>
        </div>
        <div v-if="recentChatList.length == 0" class="tmp">
          <h5>最近没有联系人，选择好友来聊天吧</h5>
        </div>
      </el-col>

      <el-col :span="19" style="height: 100%;">
        <!-- 此处的router-view 可能指向一个聊天窗口，也可能指向默认的功能界面 -->
        <router-view v-on:push-item="addItem" v-on:send-msg="sendMsg"></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// 基本上所有全局状态的维护都是保存在这个次根组件中
import base64url from "base64url";
export default {
  data() {
    return {
      // websocket相关状态
      websocket: "",
      wspath: "ws://localhost:10086/ws",

      // 侧边栏的最近联系人列表项
      eachItem: {
        displayName: "ayang818",
        avatar:
          "http://kugga-storage.oss-cn-hangzhou.aliyuncs.com/avatar/41e3afbe-c3df-4ee0-89d7-fcf0e6c3bb57.jpg?Expires=1900741373&OSSAccessKeyId=LTAI4Fdcq1D8vVSDWQWuHZ6V&Signature=AqcPu0XxMNt7mIU0%2BZKNFBuW3Uo%3D",
        userName: "1004210191",
        uid: "1",
        email: "",
        state: ""
      },
      // 最近联系人列表
      recentChatList: [],
      // 自己的用户信息
      ownerInfo: {
        userName: "",
        state: "",
        uid: "",
        email: "",
        avatar: "",
        displayName: "",
      },
    };
  },
  methods: {
    reload() {},
    sendMsg(msgDto) {
      // msgDto中的接收者和消息内容在chatMain中已经设置
      msgDto.senderUid = this.ownerInfo.uid;
      // 1 代表默认markdown形式
      msgDto.contentType = "1";
      // 1 表示文本
      msgDto.msgType = "1";
      this.send(JSON.stringify(msgDto));
    },
    // 往侧边栏先判重再加入最近联系人
    addItem(item) {
      var isContain = false;
      for (var entry of this.recentChatList) {
        if (item.userName === entry.userName) {
          isContain = true;
          break;
        }
      }
      !isContain && this.recentChatList.push(item);
      this.$router.push({
        name: "chatMain",
        params: {
          userInfo: item,
          id: base64url.encode("username:" + String(item.userName))
        }
      });
    },
    // 进入和某个好友的聊天界面
    chatWith(item) {
      this.$router.push({
        name: "chatMain",
        params: {
          userInfo: item,
          id: base64url.encode("username:" + String(item.userName))
        }
      });
    },
    // 获取自己的信息
    async getUser() {
      const res = await this.$service.get("/auth_api/user").catch(() => {});
      this.ownerInfo = res.data;
    },
    init() {
      if (typeof WebSocket === "undefined") {
        alert("您的浏览器不支持socket");
      } else {
        // 实例化socket
        this.socket = new WebSocket(this.wspath);
        // 监听socket连接
        this.socket.onopen = this.open;
        // 监听socket错误信息
        this.socket.onerror = this.error;
        // 监听socket消息
        this.socket.onmessage = this.getMessage;
      }
    },
    open() {
      console.log("socket连接成功");
    },
    error() {
      console.log("连接错误");
    },
    getMessage(msg) {
      console.log(msg.data);
    },
    // 发送消息
    send(msgDto) {
      this.socket.send(msgDto);
    },
    close() {
      console.log("socket已经关闭");
    },
    generateMsg(msgDto) {
      console.log(msgDto);
    }
  },
  mounted() {
    this.init();
    this.getUser();
  },
  destroyed() {
    this.websocket.onclose = this.close;
  }
};
</script>

<style>
</style>