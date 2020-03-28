<template>
  <!-- 主要功能页面 -->
  <div class="default">
    <div>
      <h3 class="overflow-text">欢迎回来！{{ user.displayName }} ！</h3>
    </div>
    <!-- 监听close-float-box事件，若close-float-box出发，则在父组件中执行close -->
    <contact :isVisiable="show.contact" v-on:close-float-box="close" title="好友列表" v-on:push-item="pushItem"></contact>
    <add-new-friend :isVisiable="show.addNewFriend" v-on:close-float-box="close" title="添加联系人"></add-new-friend>
    <friend-request :isVisiable="show.friendRequest" v-on:close-float-box="close" title="好友请求"></friend-request>
    <edit :isVisiable="show.edit" v-on:close-float-box="close" title="编辑个人信息">
    </edit>
    <div class="feature-container">
      <h2 style="float: left;">联系人</h2>
      <div class="feature-block-set">
        <div @click="showFloatBox('contact')" class="block">
          <feature-block iconName="el-icon-connection" message="好友列表"></feature-block>
        </div>
        <div @click="showFloatBox('addNewFriend')" class="block">
          <feature-block iconName="el-icon-plus" message="添加联系人"></feature-block>
        </div>
        <div @click="showFloatBox('deleteFriend')" class="block">
          <feature-block iconName="el-icon-close" message="删除联系人"></feature-block>
        </div>
        <div @click="showFloatBox('createGroup')" class="block">
          <feature-block iconName="el-icon-chat-line-round" message="创建群组"></feature-block>
        </div>
        <div @click="showFloatBox('friendRequest')" class="block">
          <feature-block iconName="el-icon-bell" message="好友请求"></feature-block>
        </div>
      </div>
    </div>
    <div class="feature-container">
      <h2 style="float: left;">个人信息</h2>
      <div class="feature-block-set">
        <div @click="showFloatBox('edit')" class="block">
          <feature-block iconName="el-icon-edit" message="个人信息"></feature-block>
        </div>
        <div @click="showFloatBox('deleteAccount')" class="block">
          <feature-block iconName="el-icon-delete" message="注销账号"></feature-block>
        </div>
        <div @click="quit" class="block">
          <feature-block iconName="el-icon-d-arrow-right" message="退出登录"></feature-block>
        </div>
      </div>
    </div>
    <div class="feature-container">
      <h2 style="float: left;">开发者信息</h2>
      <div class="feature-block-set">
        <div @click="showFloatBox('callMe')" class="block">
          <feature-block iconName="el-icon-paperclip" message="联系开发者"></feature-block>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {},
      show: {
        contact: false,
        addNewFriend: false,
        deleteFriend: false,
        createGroup: false,
        friendRequest: false,
        edit: false,
        deleteAccount: false,
        callMe: false
      }
    };
  },
  methods: {
    async getUser() {
      const res = await this.$service.get("/auth_api/user").catch(() => {});
      this.user = res.data;
      this.$forceUpdate();
    },
    showFloatBox(featureName) {
      for (var name in this.show) {
        if (featureName !== String(name)) {
          this.show[name] = false;
        } else {
          this.show[name] = true;
        }
      }
    },
    pushItem(item) {
      this.$emit("push-item", item);
    },
    close() {
      for (var name in this.show) {
        this.show[name] = false;
      }
    },
    quit() {
      this.$confirm("是否退出登录?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.realQuit();
        })
        .catch(() => {
          this.$message({
            type: "success",
            message: "仍然在线~"
          });
        });
    },
    realQuit() {
      localStorage.removeItem("token");
      this.$router.push({ name: "login" });
      this.$message({
        message: "已退出登录",
        type: "success"
      });
    }
  },
  created() {
    this.getUser();
  }
};
</script>

<style>
.block {
  width: 80px;
  margin-right: 20px;
}
</style>