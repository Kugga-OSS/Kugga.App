<template>
  <el-dialog :title="title" :visible.sync="isVisiable" width="40%" :before-close="handleClose" center="true">
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
        title: String,
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