<template>
  <div class="settings">
    <top-bar title="联系客服" transparent />

    <div class="setting-title">
      <div class="title-wrapper">
        Hi
        <br />
        有什么可以帮助您!
      </div>

      <img src="./images/ico_help.png" />
    </div>

    <div class="settings-field">
      <div class="field-item" v-for="item in fields" :key="item.key" @click="handleClick(item)">
        <img class="icon" :src="item.icon" />
        <div class="name">{{ item.name }}</div>
        <div class="value">{{ item.value }}</div>
        <van-icon name="arrow" />
      </div>
    </div>

    <div class="copyright">
      {{ config.copyright }}
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

import config from '@/config';
import { copyText, openQQ, openQQGroup } from '@/utils';

const fields = computed(() => {
  return [
    {
      icon: require('@/assets/images/ico_qq.png'),
      name: '添加客服QQ',
      key: 'qq',
      value: '2943838358',
    },
    {
      icon: require('@/assets/images/ico_group.png'),
      name: '官方QQ群',
      key: 'group',
      value: '438493617',
    },
    {
      icon: require('@/assets/images/ico_wechat.png'),
      name: '添加客服微信',
      key: 'qq',
      value: '2943838358',
    },
  ];
});

const handleClick = (item) => {
  const { value, key } = item;

  if (key === 'group') {
    copyText(value);
    openQQGroup(value);
    return;
  }

  if (key === 'qq') {
    copyText(value);
    openQQ(value);
    return;
  }
};
</script>

<style lang="less" scoped>
.settings {
  background: linear-gradient(180deg, #cdd6f7 0%, rgb(255 255 255 / 0%) 100%);

  .setting-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 16px 16px;

    .title-wrapper {
      font-size: 20px;
      font-weight: bold;
      line-height: 1.6;
    }

    img {
      width: 44px;
    }
  }

  .settings-field {
    padding: 0 16px;

    .field-item {
      display: flex;
      padding: 18px 12px;
      margin-bottom: 12px;
      background: var(--white);
      border-radius: 8px;
      align-items: center;

      .icon {
        width: 36px;
        margin-right: 12px;
      }

      .name {
        flex: 1;
        font-size: 15px;
      }

      .value {
        color: var(--text-color-2);
      }

      .van-icon-arrow {
        margin-left: 6px;
        color: var(--text-color-2);
      }
    }
  }

  .copyright {
    margin-top: 20px;
    font-size: 12px;
    color: var(--text-color-3);
    text-align: center;
  }
}
</style>
