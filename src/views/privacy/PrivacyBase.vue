<template>
  <div class="privacy-page">
    <top-bar :title="title" theme />

    <div class="privacy-list">
      <div class="privacy-list-item" v-for="(item, index) in props.content" :key="index">
        <p v-if="typeof item === 'string'">
          {{ item }}
        </p>

        <template v-else-if="Array.isArray(item)">
          <p v-for="(sub, subIndex) in item" :key="sub" class="privacy-list-sub-item">
            ({{ subIndex + 1 }}) {{ sub }}
          </p>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  content: {
    type: Array,
    default: () => [],
  },
  title: {
    type: String,
    default: '隐私协议',
  },
});
</script>

<style lang="less" scoped>
.privacy-page {
  padding: 12px;

  .privacy-list {
    .privacy-list-item {
      margin-bottom: 8px;
      line-height: 1.6;
      word-break: break-all;

      .privacy-list-sub-item {
        margin-bottom: 4px;
        word-break: break-all;

        &:last-child {
          margin-bottom: 8px;
        }
      }
    }
  }
}
</style>
