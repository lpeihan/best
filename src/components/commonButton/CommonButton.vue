<template>
  <div class="common-button">
    <slot></slot>
  </div>
</template>

<script setup></script>

<style lang="less" scoped>
.common-button {
  margin: 20px 0;
  height: 48px;
  font-size: 15px;
  font-weight: bold;
  text-align: center;
  background: url('~@/assets/images/btn.png');
  background-size: 100% 100%;
  line-height: 42px;
}
</style>
