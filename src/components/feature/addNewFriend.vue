<template>
  <el-dialog
    :title="title"
    :visible.sync="isVisiable"
    width="30%"
    :before-close="handleClose"
    :center="true"
  >
    <div style="max-width: 100%;">
      <div class="addNewUser-flex">
        <el-input
          type="text"
          v-model="form.username"
          placeholder="根据 用户名/昵称 搜索"
          :clearable="true"
          maxlength="30"
          style="margin-right: 5px;"
          @clear="clearRes"
          @input="whileChange"
        ></el-input>
        <el-button type="primary" icon="el-icon-search" @click="search" plain></el-button>
      </div>
      <div class="line"></div>
      <div class="show-list">
        <div v-if="resList.length === 0">
          <p class="span-text" v-if="firstSearch === true">你可以根据用户名或昵称来搜索用户</p>
          <p class="span-text" v-if="firstSearch == false">你查找的用户不存在</p>
        </div>
        <div v-if="resList.length !== 0">
          <div v-for="res in resList" v-bind:key="res.username">
            <div class="addNewUser-flex-start">
              <div style="width: 30%; height: auto;">
                <img :src="res.avatar" alt class="avatar" />
              </div>
              <div style="width: 40%;">
                <p>用户名 : {{res.userName}}</p>
                <p>昵称 : {{res.displayName}}</p>
              </div>
              <div style="width: 20%;">
                <el-button
                  type="success"
                  icon="el-icon-plus"
                  @click="createAddRequest(res.userName)"
                  style="margin-top: 1rem"
                  circle
                ></el-button>
              </div>
            </div>
            <div class="line"></div>
          </div>
        </div>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <!-- <el-button type="primary" @click="close">关 闭</el-button> -->

    </span>
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
      form: {
        username: ""
      },
      resList: [],
      firstSearch: true
    };
  },
  methods: {
    // 搜索以用户名或昵称为关键字的用户
    async search() {
      if (String(this.form.username).trim() === "") {
        this.$message({
          message: "请输入内容"
        });
        return;
      }
      this.firstSearch = false;
      const res = await this.$service
        .post("/auth_api/user/search", { keyword: this.form.username }, null)
        .catch(() => {});
      if (res.data && res.data.resList) {
        this.resList = res.data.resList;
      }
    },
    // 发送一条添加好友请求
    async createAddRequest(userName) {
      this.$confirm("是否添加好友?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "已发送添加请求!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消添加"
          });
        });
    },
    close() {
      this.$emit("close-float-box");
    },
    clearRes() {
        this.resList = [];
        this.firstSearch = true;
    },
    whileChange() {
        if (String(this.form.username).trim().length === 0) {
            this.clearRes();
        }
    },
    handleClose(done) {
        this.$confirm("确认关闭？")
        .then(_ => {
          this.$emit("close-float-box");
        })  
        .catch(_ => {});
    }
  }
};
</script>

<style>
.addNewUser-flex {
  display: flex;
  margin-bottom: 1rem;
  max-width: 100%;
}
.addNewUser-flex-start {
  display: flex;
  justify-content: space-around;
  margin-bottom: 1rem;
  margin-left: 10px;
}
.line {
  width: 100%;
  display: flex;
  justify-content: center;
  height: 1px;
  background: #e1e7ec;
  margin-bottom: 1rem;
}
.span-text {
  text-align: center;
  font-size: 1.1rem;
}
.show-list {
  max-height: 300px;
  overflow: auto;
}
</style>