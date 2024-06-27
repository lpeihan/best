<template>
  <div class="video-page">
    <top-bar title="视频" />

    <bottom-bar />
  </div>
</template>

<script setup>
import { closeLoading, showLoading } from '@/components';

showLoading();

setTimeout(() => {
  closeLoading();
}, 1000);

defineOptions({ name: 'video' });
</script>
