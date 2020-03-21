<template>
    <div class="chat-item" @click="chatWith">
        <div style="" class="avatar-div">
            <img src="https://kugga-storage.oss-cn-hangzhou.aliyuncs.com/avatar/default.png" alt="" class="avatar">
        </div>
        <div class="chat-preview">
            <div class="chat-preview-display-name">
                <span class="overflow-text">yfc</span>
            </div>
            <div class="chat-preview-last-message">
                <span class="overflow-text">hello</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    methods: {
        chatWith() {
            this.$router.push({name : "chatMain", params : {people : String(Math.random())}});
        }
    }
}
</script>

<style>

</style>