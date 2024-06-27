<template>
  <privacy-base :content="privacyData.privacy" />
</template>

<script setup>
import PrivacyBase from './PrivacyBase.vue';
import privacyData from './privacyData.json';
</script>
