<template>
  <div id="app">
    <router-view />
    <input type="text" v-model="msg">
    <input type="button" @click="send" value="发送消息">
  </div>
</template>

<script>
export default {
  data() {
    return {
      websocket: "",
      wspath: "ws://localhost:10086/ws",
      msg: ''
    };
  },
  methods: {
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
    send() {
      this.socket.send(this.msg);
    },
    close() {
      console.log("socket已经关闭");
    }
  },
  mounted() {
    this.init();
  },
  destroyed() {
    this.websocket.onclose = this.close;
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
