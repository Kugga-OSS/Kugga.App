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
        <router-view
          v-on:push-item="addItem"
          v-on:send-msg="sendMsg"
          v-on:send-new-request="pushNewFriendRequest"
        ></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// 基本上所有通信需要的全局状态都是保存在这个次根组件中
import base64url from "base64url";
const msgType = {
  heartBeat: "4",
  friendRequest: "5"
};
const heartBeat = {
  content: "heartbeat:ping",
  msgType: msgType.heartBeat
};
const friendReqStruct = {
  content: null,
  msgType: msgType.friendRequest
};
const hbStr = JSON.stringify(heartBeat);
const heartCheck = {
  // 每20秒发送心跳
  sendSpace: 20 * 1000,
  // 服务端回应超时时间
  timeout: 15 * 1000,
  timer: null,
  serverTimer: null,
  reset() {
    this.timer && clearTimeout(this.timer);
    this.serverTimer && clearTimeout(this.serverTimer);
  },
  start(ws) {
    this.reset();
    this.timer = setTimeout(() => {
      // 发送心跳
      ws.send(hbStr);
      this.serverTimer = setTimeout(() => {
        // 超过响应时间后端没有回应，说明连接已经断开了, 这个时候就断开连接
        ws.close();
      }, this.timeout);
    }, this.sendSpace);
  }
};

export default {
  data() {
    return {
      // websocket相关状态
      websocket: "",
      wspath: "ws://localhost:10086/ws",
      maxReconnectTimes: 5, // 最多重连五次
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
      // HEARTBEAT = 4    心跳
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
      try {
        this.$router.push({
          name: "chatMain",
          params: {
            userInfo: item,
            id: base64url.encode(String(item.userName))
          }
        });
      } catch {return}
    },
    // 进入和某个好友的聊天界面
    chatWith(item) {
      try {
        this.$router.push({
          name: "chatMain",
          params: {
            userInfo: item,
            id: base64url.encode(String(item.userName))
          }
        });
      } catch {return}
    },
    // 获取自己的信息
    async getUser() {
      const res = await this.$service.get("/auth_api/user").catch(() => {});
      this.ownerInfo = res.data;
      return res.data.uid;
    },
    // 推送好友请求提示
    pushNewFriendRequest(uid) {
      friendReqStruct.content = uid;
      const req = JSON.stringify(friendReqStruct);
      this.websocket.send(req);
    },
    showNewFriendRequestNotify(msg) {
      this.$notify({
        message: msg.data,
        duration: 0,
        title: "好友申请",
        type: "info"
      });
    },
    // ================  以下是Websocket相关方法  ================
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
      // https://stackoverflow.com/questions/49938266/how-to-return-values-from-async-functions-using-async-await-from-function
      (async () => {
        var uid = await this.getUser();
        // 注册网关机
        this.websocket.send(JSON.stringify({ senderUid: uid, msgType: "1" }));
      })();
      this.maxReconnectTimes = 5;
      // 开启心跳
      heartCheck.start(this.websocket);
    },
    error() {
      console.log("连接错误");
      this.reconnect();
    },
    getMessage(msg) {
      const data = msg.data;
      const msgObj = JSON.parse(data);
      switch (String(msgObj.msgType)) {
        // 收到了心跳回应，重置心跳计时器即可
        case msgType.heartbeat:
          heartCheck.start(this.websocket);
          break;
        // 好友请求
        case msgType.friendRequest:
          this.showNewFriendRequestNotify(msgObj);
          break;
        default:
          break;
      }
      // 重置心跳
    },
    // 发送消息
    send(msgDto) {
      this.websocket.send(msgDto);
    },
    close() {
      console.log("连接已经关闭");
      this.reconnect();
    },
    reconnect() {
      console.log("尝试重新连接");
      if (this.maxReconnectTimes < 0) {
        return;
      }
      this.maxReconnectTimes--;
      setTimeout(() => {
        this.init();
      }, 60 * 1000);
    }
  },
  created() {
    this.init();
  },
  destroyed() {
    this.websocket.close();
  }
};
</script>

<style>
</style>