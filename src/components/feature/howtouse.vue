<template>
  <el-dialog
    :title="title"
    :visible.sync="isVisiable"
    width="40%"
    :before-close="handleClose"
    :center="true"
  >
    <div>
      <div>
        <h3>最基础的使用指南（Q&A形式）</h3>
        <div>
          <!-- 相信所有会使用本应用的朋友多少都带点极客精神，kugga的开发者也是一位不太喜欢使用鼠标的同学，所以他没有写发送消息的按钮，发送消息只有快捷键！ -->
          <!-- 关于移动端，移动端的 App 正在火热开发中！预计六月份上架应用商店！ -->
          <p>Q1 : 怎么发送消息？</p>
          <p>A1 : <font class="enhance">Chrome</font> 浏览器下的快捷键是 <font class="enhance">alt + / </font>; <font class="enhance">Firefox</font> 浏览器下的快捷键是 <font class="enhance">shift + alt + /</font> ; <font class="enhance">Safari</font> 浏览器下的快捷键是 ctrl + / ;啥？ IE 浏览器？不好意思，没听说过~。另外，按<font class="enhance">alt + w</font>(chrome浏览器下，其他浏览器参照发送消息快捷键)也是可以快速关闭当前的聊天窗口的</p>
          <p>Q2 : 我的信息安全吗？</p>
          <p>A2 : 答案是肯定的，安全！首先本站采用了全站的<font class="enhance">HTTPS，WSS</font>来保证你的传输内容安全。其次你的所有敏感信息比如密码，都是使用单向散列加盐加密的，即使是DBA也无法得到你的明文密码。</p>
        </div>
        <h3>开发者的小声BB</h3>
        <p>相信所有会使用本应用的朋友应该都带点极客精神。kugga的开发者也是一位不太喜欢使用鼠标的同学，所以他没有写发送消息的按钮，所以发送消息只有快捷键！<br><br>另外本应用是完全支持markdown语法的，这是开发者除了TypeScript和Java外用的最多的语言了2333。如果你十分熟悉markdown语法，那么恭喜你可以快速上手我们的应用。但是你要是不熟悉，问题不大，我们的markdown编辑器功能还是十分完善的。<br><br>此外，我们将至少持续更新至2021年4月！（因为这之后核心开发者就变成社畜啦）。<br><br>最后您有Github账号，也可以给这个应用点个Star，本应用的前后端都是完全开源，并集成了CI/CD的。Github仓库链接如下 : <a href="https://github.com/Kugga-OSS/Kugga.App">前端仓库</a>，<a href="https://github.com/Kugga-OSS/Kugga">后端仓库</a>！总之欢迎支持和使用我们的应用！</p>
      </div>
    </div>
    <!-- <span slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="close">确 定</el-button>
    </span>-->
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
.enhance {
  font-weight: bolder;
}
</style>