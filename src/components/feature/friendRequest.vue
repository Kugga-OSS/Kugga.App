<template>
  <el-dialog
    :title="title"
    :visible.sync="isVisiable"
    width="40%"
    :before-close="handleClose"
    :center="true"
  >
    <div style="height: 600px;max-height: 600px;">
      <!-- 我收到的好友请求 -->
      <div style="height: 300px;max-height: 300px; overflow: auto;">
        <h4>收到的好友请求</h4>
        <div v-if="receiveList.length > 0" style="max-height: 80px;">
          <friend-item
            v-for="(item, index) in receiveList"
            v-bind:key="index"
            v-on:when-update="reload"
            :displayName="item.other.displayName"
            :requestStatus="item.status"
            :avatar="item.other.avatar"
            :username="item.other.userName"
            :showIcon="false"
          ></friend-item>
        </div>
      </div>
      <div class="single-line"></div>
      <!-- 我发出的好友请求  -->
      <div style="height: 300px; max-height: 300px; overflow: auto;">
        <h4>发出的好友请求</h4>
        <div v-if="sentList.length > 0" style="max-height: 80px;">
          <friend-item
            v-for="(item, index) in sentList"
            v-bind:key="index"
            v-on:when-update="reload"
            :displayName="item.other.displayName"
            :requestStatus="item.status"
            :avatar="item.other.avatar"
            :username="item.other.userName"
            :showIcon="true"
          ></friend-item>
        </div>
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
      receiveList: [],
      sentList: []
    };
  },
  methods: {
    async fetchReceiveList() {
      const res = await this.$service.get("/auth_api/user/friendRequest", {
        type: "other"
      });
      this.receiveList = res.data.relations;
    },
    async fetchSentList() {
      const res = await this.$service.get("/auth_api/user/friendRequest", {
        type: "owner"
      });
      this.sentList = res.data.relations;
    },
    reload() {
      this.fetchReceiveList();
    },
    close() {
      this.$emit("close-float-box");
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          this.$emit("close-float-box");
        })
        .catch(_ => {});
    }
  },
  watch: {
    isVisiable: {
      immediate: true,
      handler() {
        if (this.isVisiable) {
          this.fetchReceiveList();
          this.fetchSentList();
        }
      }
    }
  }
};
</script>

<style>
</style>