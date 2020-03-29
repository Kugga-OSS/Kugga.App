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
// 基本上所有通信需要的全局状态都是保存在这个次根组件中
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
      // 侧边栏的最近联系人列表
      recentChatList: [],
      // 自己的用户信息
      ownerInfo: {
        userName: "",
        state: "",
        uid: "",
        email: "",
        avatar: "",
        displayName: ""
      }
    };
  },
  methods: {
    reload() {},
    sendMsg(msgDto) {
      // msgDto中的接收者和消息内容在chatMain中已经设置
      msgDto.senderUid = this.ownerInfo.uid;
      // 1 代表默认markdown形式
      msgDto.contentType = "1";
      // ONLINE = 1       上线请求
      // NEWMSG = 2       新消息
      // ACK = 3          对某条消息的ACK
      // HEARTBEAT = 4    心跳反馈
      msgDto.msgType = "2";
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
      return res.data.uid;
    },
    // 初始化websocket
    init() {
      if (typeof WebSocket === "undefined") {
        alert("您的浏览器不支持我们的站点，请选择Chrome或Firefox浏览器！");
      } else {
        // 实例化socket
        this.websocket = new WebSocket(this.wspath);
        // 监听socket连接
        this.websocket.onopen = this.open;
        // 监听socket错误信息
        this.websocket.onerror = this.error;
        // 监听socket消息
        this.websocket.onmessage = this.getMessage;
        this.websocket.onclose = this.close;
      }
    },
    open() {
      console.log("连接建立成功");
      // 这步操作和stackoverflow上学了一手
      var uid;
      (async () => {
        uid = await this.getUser();
      })()
      this.websocket.send(
        JSON.stringify({ senderUid: uid, msgType: "1" })
      );
    },
    error() {
      console.log("连接错误");
    },
    getMessage(msg) {
      alert(msg);
    },
    // 发送消息
    send(msgDto) {
      this.websocket.send(msgDto);
    },
    close() {
      console.log("连接已经关闭");
    },
    generateMsg(msgDto) {
      console.log(msgDto);
    }
  },
  created() {
    this.init();
  },
  destroyed() {
    
  }
};
</script>

<style>
</style>