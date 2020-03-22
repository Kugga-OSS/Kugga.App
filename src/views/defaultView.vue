<template>
  <!-- 主要功能页面 -->
  <div class="default">
    <div>
      <h3 class="overflow-text">欢迎回来！{{ user.displayName }} ~</h3>
    </div>
    <float-box :isVisiable="show"></float-box>
    <div class="feature-container">
      <h2 style="float: left;">联系人</h2>
      <div class="feature-block-set">
        <div @click="showFloatBox">
          <feature-block iconName="el-icon-connection" message="通讯录"></feature-block>
        </div>
        <feature-block iconName="el-icon-plus" message="添加联系人/群组"></feature-block>
        <feature-block iconName="el-icon-close" message="删除联系人"></feature-block>
        <feature-block iconName="el-icon-chat-line-round" message="创建群组"></feature-block>
      </div>
    </div>
    <div class="feature-container">
      <h2 style="float: left;">个人信息</h2>
      <div class="feature-block-set">
        <feature-block iconName="el-icon-edit" message="编辑个人信息"></feature-block>
        <feature-block iconName="el-icon-delete" message="注销账号"></feature-block>
      </div>
    </div>
    <div class="feature-container">
      <h2 style="float: left;">开发者信息</h2>
      <div class="feature-block-set">
        <feature-block iconName="el-icon-paperclip" message="联系开发者"></feature-block>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {},
      show: false
    };
  },
  methods: {
    async getUser() {
      const res = await this.$service.get("/auth_api/user").catch(() => {});
      this.user = res.data;
      this.$forceUpdate();
    },
    showFloatBox() {
      this.show = true;
      this.$forceUpdate();
    }
  },
  created() {
    this.getUser();
  }
};
</script>

<style>
</style>