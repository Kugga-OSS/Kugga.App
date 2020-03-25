<template>
  <el-dialog
    :title="title"
    :visible.sync="isVisiable"
    width="40%"
    :before-close="handleClose"
    :center="true"
  >
    <span>{{ }}</span>
    <div>
        
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="close">确 定</el-button>
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
    return {};
  },
  methods: {
    close() {
        this.$emit("close-float-box");
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    }
  }
};
</script>

<style>
</style>