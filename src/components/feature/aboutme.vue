<template>
  <el-dialog
    :title="title"
    :visible.sync="isVisiable"
    width="30%"
    :before-close="handleClose"
    :center="true"
  >
    <div>
        <markdown :source="this.content"></markdown>
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
      content: '- kugga号 : 1004210191 \n \
- github : https://github.com/ayang818 \n \
- blog :  https://ayang818.gitee.io/blog'
    };
  },
  methods: {
    close() {
        this.$emit("close-float-box");
    },
    handleClose(done) {
        this.$emit("close-float-box");
    }
  }
};
</script>

<style>
</style>