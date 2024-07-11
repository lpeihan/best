<template>
  <div class="wechat-page">
    <top-bar title="绑定微信" transparent :border="false" />

    <div class="logo-wrapper"></div>

    <common-button block @click="bind">绑定微信</common-button>

    <img src="./images/bg.png" class="bg" />
  </div>
</template>

<script setup>
const bind = () => {};
</script>

<style lang="less" scoped>
.wechat-page {
  padding: 20px;
  background: #ffef3e;

  .logo-wrapper {
    width: 80px;
    height: 80px;
    margin: 40px auto 60px;
    background: var(--black);
    border-radius: 50%;
  }

  .common-button {
    margin-top: 32px;
  }

  .bg {
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
  }
}
</style>
