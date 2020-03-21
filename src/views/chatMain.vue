<template>
  <div style="height: 100%;">
      <!-- 消息显示区域 -->
      <el-row style="height: 70%; background: white;">
          <el-row style="height: 10%;" class="chat-banner">
            <el-col :span="2">
                <div style="padding: 5px;">
                    <el-button icon="el-icon-close" @click="back" circle></el-button>
                </div>
            </el-col>
            <el-col :span="10" :offset="5" style="height: 100%;">
                <div>
                    <p class="chat-banner-title overflow-text">hello world123211111111</p>
                </div>
            </el-col>
          </el-row>
      </el-row>
      <!-- 消息输入区域 -->
      <el-row style="height: 30%; background: green;">

      </el-row>
  </div>
</template>

<script>
export default {
    props: {
        people: String
    },
    data() {
        return {

        }
    },
    methods: {
        back() {
            this.$router.push({ name: "defaultView" });
        }
    }
}
</script>

<style>

</style>