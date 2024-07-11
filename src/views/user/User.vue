<template>
  <div class="user-page">
    <div class="user-top-card" :style="style">
      <div class="balance-info">
        <div class="balance-item one">10001</div>
        <div class="balance-item two">18888</div>

        <div class="settings-wrapper" @click="goSettings">
          <img src="./images/ico_settings.png" />
        </div>
      </div>

      <div class="user-info" @click="goSettings">
        <div class="avatar-wrapper">
          <img :src="store.userInfo.avatar" />
        </div>

        <div class="nickname-wrapper">
          <div class="nickname">{{ store.userInfo.nickname }}</div>
          <div class="id">{{ store.userInfo.uniqueId }}</div>
        </div>

        <div class="share-code">邀请码 | {{ store.userInfo.shareCode }}</div>
      </div>
    </div>

    <div class="user-fields">
      <div class="fields-item" v-for="item in fields" :key="item.key" @click="handleClick(item)">
        <img :src="item.icon" />
        <div class="name">{{ item.name }}</div>
      </div>
    </div>

    <div class="share-wrapper" @click="router.push('/share')">邀请好友</div>

    <div class="social-section">
      <div class="social-title">
        <img src="./images/ico_social.png" />
        Ta的圈圈
      </div>

      <empty />
    </div>

    <bottom-bar />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';

import { useStore } from '@/store';

const style = computed(() => {
  return {
    paddingTop: store.getNavHeight(20),
  };
});

const router = useRouter();
const store = useStore();

const fields = computed(() => [
  {
    icon: require('./images/ico_bag.png'),
    name: '我的背包',
    key: 'bag',
  },
  {
    icon: require('./images/ico_exchange.png'),
    name: '兑换记录',
    key: 'exchange',
  },
  {
    icon: require('./images/ico_diamond.png'),
    name: '星钻明细',
    key: 'diamond',
  },
  {
    icon: require('./images/ico_contact.png'),
    name: '联系客服',
    key: 'contact',
  },
]);

const goSettings = () => router.push('/user/settings');

const handleClick = (item) => {
  if (item.key === 'contact') {
    router.push('/user/contact');
  }
};
</script>

<style lang="less" scoped>
.user-page {
  background: #f5f5f5;

  .user-top-card {
    height: 230px;
    padding: 40px 16px;
    background: url('./images/user_bg.png');
    background-size: 100% 100%;

    .balance-info {
      display: flex;
      align-items: center;

      .balance-item {
        width: 128px;
        height: 32px;
        padding-left: 32px;
        font-size: 15px;
        font-weight: bold;
        line-height: 30px;

        &.one {
          background: url('./images/balance_one.png');
          background-size: 100% 100%;
        }

        &.two {
          margin-left: 12px;
          background: url('./images/balance_two.png');
          background-size: 100% 100%;
        }
      }

      .settings-wrapper {
        flex: 1;
        text-align: right;

        img {
          width: 22px;
        }
      }
    }

    .user-info {
      display: flex;
      align-items: center;
      margin: 24px 0;
      color: var(--white);

      .share-code {
        position: relative;
        right: -16px;
        padding: 4px 8px;
        font-size: 12px;
        background: rgba(#7e7e7e, 0.9);
        border-bottom-left-radius: 4px;
        border-top-left-radius: 4px;
      }

      .avatar-wrapper {
        width: 54px;
        height: 54px;
        overflow: hidden;
        border: 2px solid var(--white);
        border-radius: 50%;
      }

      .nickname-wrapper {
        flex: 1;
        padding-left: 16px;

        .nickname {
          font-size: 16px;
        }

        .id {
          margin-top: 4px;
          font-size: 13px;
        }
      }

      .van-icon-arrow {
        font-size: 18px;
        color: var(--white);
      }
    }
  }

  .user-fields {
    display: flex;
    padding: 14px 4px;
    margin: -44px 16px 0;
    background: var(--white);
    border-radius: 8px;
    box-shadow: 0 0 5px rgba(#c1c1c1, 0.3);

    .fields-item {
      flex: 1;
      font-size: 12px;
      text-align: center;

      img {
        width: 32px;
      }

      .name {
        margin-top: 4px;
      }
    }
  }

  .share-wrapper {
    margin: 16px;
    font-weight: bold;
    line-height: 44px;
    color: var(--white);
    text-align: center;
    background: #1e1e1e;
    border-radius: 4px;
    box-shadow: 0 4px 4px 0 rgb(162 162 162 / 30%);
  }

  .social-section {
    padding: 0 16px;

    .social-title {
      display: flex;
      align-items: center;
      font-weight: bold;

      img {
        width: 20px;
        margin-right: 8px;
      }
    }
  }
}
</style>
