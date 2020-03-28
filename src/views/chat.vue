<template>
  <div class="container">
    <el-row style="height: 100%;">
      <!-- 左侧的最近联系人列表区域 -->
      <el-col :span="5" style="height: 100%; border-radius: 5px; border-right: 1px solid #e1e7ec; overflow: auto;">
        <div v-for="(item, index) in recentChatList" v-bind:key="index" @click="chatWith(item)">
            <friend-item
            v-on:when-update="reload"
            :displayName="item.displayName"
            :avatar="item.avatar"
            :username="item.userName"
            :showIcon="false"
            type='recentChatList'
          ></friend-item>
          <div class="line"></div>
        </div>
      </el-col>

      <el-col :span="19" style="height: 100%;">
        <router-view v-on:push-item="addItem"></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
        messageContent: "",
        recentChatList: [
          {displayName: "ayang818", avatar: "http://kugga-storage.oss-cn-hangzhou.aliyuncs.com/avatar/41e3afbe-c3df-4ee0-89d7-fcf0e6c3bb57.jpg?Expires=1900741373&OSSAccessKeyId=LTAI4Fdcq1D8vVSDWQWuHZ6V&Signature=AqcPu0XxMNt7mIU0%2BZKNFBuW3Uo%3D", userName: "1004210191"}
        ],
    };
  },
  methods: {
    reload() {},
    addItem(item) {
      this.recentChatList.push(item);
      this.$router.push({name: "chatMain", params: {userInfo: item, id: String(Math.random() * 1e16)}});
    },
    chatWith(item) {
      this.$router.push({name: "chatMain", params: {userInfo: item, id: String(Math.random() * 1e16)}});
    }
  },
  created() {
    // 向后端建立并注册 WebSocket 连接
  }
};
</script>

<style>
</style>