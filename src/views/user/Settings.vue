<template>
  <div class="settings">
    <top-bar title="账户信息" theme />

    <div class="settings-field">
      <div
        class="field-item van-hairline--bottom"
        v-for="item in fields"
        :key="item.key"
        @click="handleClick(item)"
      >
        <img class="icon" :src="item.icon" />
        <div class="name">{{ item.name }}</div>
        <div class="value">{{ item.value }}</div>
        <van-icon name="arrow" v-if="item.clickable" />
      </div>
    </div>

    <div class="copyright">
      {{ config.copyright }}
    </div>
  </div>
</template>

<script setup>
import { showConfirmDialog, showToast } from 'vant';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

import config from '@/config';
import { showBindCodePopup } from '@/popup';
import { useStore } from '@/store';
import { copyText } from '@/utils';

const store = useStore();
const router = useRouter();

const fields = computed(() => {
  return [
    {
      icon: require('./images/ico_user.png'),
      name: '用户ID',
      clickable: true,
      key: 'user',
      value: store.userInfo.id,
    },
    {
      icon: require('./images/ico_we.png'),
      name: '绑定微信',
      clickable: false,
      key: '/user/wechat',
      value: store.userInfo.nickname,
    },
    {
      icon: require('./images/ico_share.png'),
      name: '填写邀请',
      clickable: true,
      key: 'share',
      value: store.userInfo.shareCode,
    },
    {
      icon: require('./images/ico_phone.png'),
      name: '绑定手机号',
      clickable: false,
      key: 'phone',
      value: store.userInfo.phone_number,
    },
    {
      icon: require('./images/ico_service.png'),
      name: '用户协议',
      clickable: true,
      key: '/user-privacy',
    },
    {
      icon: require('./images/ico_privacy.png'),
      name: '隐私协议',
      clickable: true,
      key: '/privacy',
    },
    {
      icon: require('./images/ico_logout.png'),
      name: '退出登录',
      clickable: true,
      key: 'logout',
    },
  ];
});

const handleClick = (item) => {
  const { key, value } = item;

  if (key.includes('/')) {
    router.push(key);
    return;
  }

  if (key === 'user') {
    copyText(value);
  } else if (key === 'share') {
    showBindCodePopup();
  } else if (key === 'logout') {
    logout();
  }
};

const logout = async () => {
  await showConfirmDialog({
    title: '是否退出登录？',
  });

  store.logout();
  showToast('退出成功');
  router.replace('/');
};
</script>

<style lang="less" scoped>
.settings {
  .settings-field {
    .field-item {
      display: flex;
      align-items: center;
      padding: 18px 12px;

      .icon {
        margin-right: 8px;
        width: 18px;
      }

      .name {
        flex: 1;
      }

      .value {
        color: var(--text-color-2);
      }

      .van-icon-arrow {
        margin-left: 6px;
        color: var(--text-color-3);
      }
    }
  }

  .copyright {
    margin-top: 24px;
    font-size: 12px;
    text-align: center;
    color: var(--text-color-2);
  }
}
</style>
