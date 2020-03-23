<template>
  <el-dialog title="提示" :visible.sync="isVisiable" width="30%" :before-close="handleClose">
    <span>{{  }}</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="isVisiable = false">取 消</el-button>
      <el-button type="primary" @click="isVisiable = false">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    props: {
        isVisiable: Boolean,
    },
    data() {
      return {
      };
    },
    methods: {
      handleClose(done) {
        this.$confirm('确认关闭？')
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