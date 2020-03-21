<template>
  <div class="container">
    <el-row style="height: 100%;">
      <!-- 左侧的最近联系人列表区域 -->
      <el-col :span="6" style="height: 100%; border-radius: 5px;">
        <contact-list></contact-list>
      </el-col>
      <el-col :span="18" style="height: 100%;">
        <router-view/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
        messageContent: ""
    };
  },
  methods: {},
  created() {
    // 向后端建立并注册 WebSocket 连接
  }
};
</script>

<style>
</style>