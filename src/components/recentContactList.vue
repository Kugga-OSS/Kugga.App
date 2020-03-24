<template>
    <div class="contact-list">
        <chat-item v-for="item in chatItems" :key="item">
        </chat-item>
    </div>
</template>

<script>
export default {
    data() {
        return {
            chatItems: [1,2,3,4,5]
        }
    },
    methods: {

    },
}
</script>

<style>

</style>