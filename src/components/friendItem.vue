<template>
  <div class="friend-flex">
    <div style="display: flex; justify-content: flex-start;">
        <div style="width: 30%;">
          <img :src="avatar" class="friend-avatar" />
        </div>
        <div style="margin-top: 25px; margin-left: 5px;">
            用户名 : {{username}}
            <br />
            昵称 : {{displayName}}
        </div>
    </div>
    <div v-if="showIcon == true">
      <i v-if="requestStatus == pass" class="el-icon-success icon-font status-success"></i>
      <i v-if="requestStatus == wait" class="el-icon-loading icon-font statuc-wait"></i>
      <i v-if="requestStatus == fail" class="el-icon-error icon-font status-fail"></i>
    </div>
    <div style="min-width: 50px;" v-if="showIcon == false">
      <el-button type="success" icon="el-icon-check" style="margin: 3px 3px;"  circle></el-button>
      <el-button type="info" icon="el-icon-close" style="margin: 3px 3px;" circle></el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    displayName: String,
    requestStatus: Number,
    avatar: String,
    username: String,
    showIcon: Boolean
  },
  data() {
    return {
      pass: 2,
      wait: 1,
      fail: 0
    };
  },
  methods: {}
};
</script>

<style>
.friend-flex {
  display: flex;
  justify-content: center;
  align-items:center;
}
.friend-flex:hover {
  background: #f0f0f0;
}
.icon-font {
  font-size: 2rem;
}
.status-success {
  color: greenyellow;
}
.status-wait {
  color: blue;
}
.status-fail {
  color: red;
}
</style>