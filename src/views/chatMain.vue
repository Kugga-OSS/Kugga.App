<template>
  <div style="background: pink; height: 100%;">
      <el-row style="height: 70%; background: white;">
          <el-row style="height: 10%; background: blue;">
            <el-col :span="2">
                <div style="padding: 5px;">
                    <el-button icon="el-icon-close" @click="back" circle></el-button>
                </div>
            </el-col>
          </el-row>
      </el-row>
      <el-row style="height: 30%; background: green;">

      </el-row>
  </div>
</template>

<script>
export default {
    props: {
        people: String
    },
    data() {

        return {

        }
    },
    methods: {
        back() {
            this.$router.push({ name: "defaultView" });
        }
    }
}
</script>

<style>

</style>