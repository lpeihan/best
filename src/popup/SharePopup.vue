<template>
  <van-popup class="share-popup" position="bottom" v-model:show="show" round>
    <div class="share-popup-title">分享至</div>

    <ul class="share-popup-list">
      <li class="share-item" v-for="item in fields" :key="item.type" @click="handleClick(item)">
        <img :src="item.icon" />
        <div class="text">{{ item.text }}</div>
      </li>
    </ul>

    <common-button @click="close">取消</common-button>
  </van-popup>
</template>

<script setup>
import { computed } from 'vue';

import { usePopup } from './helper';
import { ShareTypes } from './types';

import config from '@/config';
import { showQrCodePopup } from '@/popup';
import { useStore } from '@/store';
import { copyText } from '@/utils';
import bridge from '@/utils/bridge';

const store = useStore();
const { show, close, open } = usePopup();

const fields = computed(() => [
  {
    icon: require('@/assets/images/ico_wechat.png'),
    type: ShareTypes.Wechat,
    text: '微信',
    platform: 1,
  },
  {
    icon: require('@/assets/images/ico_moments.png'),
    type: ShareTypes.Moments,
    text: '朋友圈',
    platform: 2,
  },
  {
    icon: require('@/assets/images/ico_qq.png'),
    type: ShareTypes.QQ,
    text: 'QQ',
    platform: 3,
  },
  {
    icon: require('@/assets/images/ico_qq_zone.png'),
    type: ShareTypes.QZone,
    text: 'QQ空间',
    platform: 4,
  },
  {
    icon: require('@/assets/images/ico_qr_code.png'),
    type: ShareTypes.QrCode,
    text: '扫码',
  },
  {
    icon: require('@/assets/images/ico_link.png'),
    type: ShareTypes.Link,
    text: '复制链接',
  },
]);

const handleClick = (item) => {
  const { type, platform } = item;

  if (type === ShareTypes.QrCode) {
    showQrCodePopup();
  } else if (type === ShareTypes.Link) {
    copyText(store.shareUrl);
  } else {
    const random = (Math.random() * (999 - 100) + 100).toFixed(2);

    bridge.sharePlatform({
      shareUrl: store.shareUrl,
      platform,
      shareImg: 'https://img.zwhudong.cn/owner/logo.jpg',
      shareTitle: `我在${config.appName}累计试玩${random}元，快来和我一起玩`,
      shareContent: '最火爆的试玩应用软件',
    });
  }
};

defineExpose({
  close,
  open,
});
</script>

<style lang="less" scoped>
.share-popup {
  padding: 16px;

  .share-popup-title {
    padding: 4px;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
  }

  .share-popup-list {
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;
    text-align: center;

    .share-item {
      width: 25%;
      margin-bottom: 20px;

      img {
        width: 36px;
        height: 36px;
      }

      .text {
        margin-top: 4px;
        font-size: 12px;
        color: var(--text-color-2);
      }
    }
  }

  .common-button {
    margin: 0 12px 20px;
  }
}
</style>
