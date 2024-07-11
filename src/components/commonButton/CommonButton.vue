<template>
  <div class="common-button">
    <slot></slot>
  </div>
</template>

<script setup></script>

<style lang="less" scoped>
.common-button {
  height: 48px;
  margin: 20px 0;
  font-size: 15px;
  font-weight: bold;
  line-height: 42px;
  text-align: center;
  background: url('~@/assets/images/btn.png');
  background-size: 100% 100%;
}
</style>
