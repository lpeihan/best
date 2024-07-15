<template>
  <div class="home-page">
    <top-bar title="首页" />

    <div>
      {{ $t('hello') }}
      <van-button type="primary" @click="handleChangeLocale">Change Locale</van-button>
    </div>

    <div class="color-section">
      <div class="color">Color</div>

      <van-button type="primary" @click="handleChangeColor">Change Color</van-button>
    </div>

    <div>
      <van-button @click="showDialog({ message: '提示' })">showDialog</van-button>
    </div>
    <bottom-bar />
  </div>
</template>

<script setup>
import { showDialog } from 'vant';
import { onMounted } from 'vue';

import { getUserInfo } from '@/api/user';
import { setLocale } from '@/locales';
import { getRandom } from '@/utils';

const THEME_LIST = [
  { key: '默认', color: '#fc2834' },
  { key: '薄暮', color: '#f7234f' },
  { key: '火山', color: '#FA541C' },
  { key: '日暮', color: '#FAAD14' },
  { key: '明青', color: '#13C2C2' },
  { key: '极光绿', color: '#52C41A' },
  { key: '拂晓蓝', color: '#1890FF' },
  { key: '极客蓝', color: '#2F54EB' },
  { key: '酱紫', color: '#722ED1' },
];

onMounted(() => {
  getUserInfo();
});

const handleChangeColor = () => {
  const index = getRandom(0, THEME_LIST.length - 1);
  document.documentElement.style.setProperty('--primary-color', THEME_LIST[index].color);
};

const handleChangeLocale = () => {
  setLocale('en-US');
};
</script>

<style lang="less" scoped>
.home-page {
  .color-section {
    color: var(--primary-color);
  }
}
</style>
