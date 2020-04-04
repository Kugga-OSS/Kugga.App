<template>
  <el-dialog
    :title="title"
    :visible.sync="isVisiable"
    width="30%"
    :before-close="handleClose"
    :center="true"
  >
    <div>
        <center><h3>别骂了，别骂了，开发小哥在做了~</h3></center>
    </div>
    <!-- <span slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="close">确 定</el-button>
    </span> -->
  </el-dialog>
</template>

<script>
export default {
  props: {
    isVisiable: Boolean,
    title: String
  },
  data() {
    return {};
  },
  methods: {
    close() {
        this.$emit("close-float-box");
    },
    handleClose(done) {
      // this.$confirm("确认关闭？")
      //   .then(_ => {
      //     this.$emit("close-float-box");
      //   })
      //   .catch(_ => {});
      this.$emit("close-float-box");
    }
  }
};
</script>

<style>
</style>