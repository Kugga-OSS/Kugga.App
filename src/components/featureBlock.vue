<template>
  <div style="margin-right: 20px;">
    <div class="feature-block">
      <span class="feature-icon" :class="iconName"></span>
    </div>
    <div class="feature-font">{{ message }}</div>
  </div>
</template>

<script>
export default {
  props: {
    iconName: String,
    message: String,
  }
};
</script>

<style>
.feature-font {
  font-size: 1rem;
  font-weight: bolder;
  max-width: 80px;
}

.feature-block {
    height: 80px;
    width: 80px;
    background: #ffffff;
    border: 1px solid rgba(145,148,163,1);
    border-radius: 5px;
    margin-bottom: 5px;
}

.feature-block:hover {
    background: #f0f0f0;
}

.feature-icon {
    font-size: 40px;
    margin: 20px auto;
}
</style>