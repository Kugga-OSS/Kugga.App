<template>
  <el-dialog
    :title="title"
    :visible.sync="isVisiable"
    width="30%"
    :before-close="handleClose"
    :center="true"
  >
    <div class="friend-list" v-if="friendList.length > 0">
      <div v-for="(item,index) in friendList" v-bind:key="index" @dblclick="pushToRecent(item)">
      <friend-item
        :displayName="item.displayName"
        :avatar="item.avatar"
        :username="item.userName"
        :showIcon="false"
      ></friend-item>
      <div class="line"></div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    isVisiable: Boolean,
    title: String
  },
  data() {
    return {
      friendList: []
    };
  },
  methods: {
    pushToRecent(item) {
      this.$emit("push-item", item);
    },
    async fetchFriendList() {
      const res = await this.$service
        .get("/auth_api/user/friendList", null)
        .catch(() => {});
      this.friendList = res.data.friendList;
    },
    handleClose(done) {
      this.$emit("close-float-box");
    }
  },
  watch: {
    isVisiable: {
      immediate: true,
      handler() {
        if (this.isVisiable) {
          this.fetchFriendList();
        }
      }
    }
  }
};
</script>

<style>
.friend-list {
  height: 500px;
  max-height: 500px;
  overflow: auto;
}
</style>