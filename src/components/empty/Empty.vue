<template>
  <div class="empty">
    <img src="@/assets/images/empty.png" />
    <div class="text">{{ text }}</div>
  </div>
</template>

<script setup>
defineProps({
  text: {
    type: String,
    default: '暂无数据',
  },
});
</script>

<style lang="less" scoped>
.empty {
  padding: 12px;
  text-align: center;

  img {
    width: 180px;
  }

  .text {
    margin-top: 12px;
    font-size: 13px;
    color: var(--text-color-3);
  }
}
</style>
