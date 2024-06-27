<template>
  <privacy-base :content="privacyData.termsOfService" title="用户协议" />
</template>

<script setup>
import PrivacyBase from './PrivacyBase.vue';
import privacyData from './privacyData.json';
</script>
