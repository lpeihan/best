<template>
  <div class="share-page">
    <top-bar title="" transparent :border="false" />

    <div class="share-code-section">
      <div class="share-code-left">
        <span>我的邀请码:</span>
        <span>{{ store.userInfo.id }}</span>
        <div class="copy-wrapper" @click="copyText(store.userInfo.id)">复制</div>
      </div>

      <div class="share-code-right" @click="showBindCodePopup">
        <span>填写邀请码</span>
        <img src="./images/ico_right.png" />
      </div>
    </div>

    <div class="share-info-section">
      <div class="title-wrapper van-hairline--bottom">
        <div class="title">我的好友</div>
        <div class="more" @click="$router.push('/share/records')">查看详情 ></div>
      </div>
      <div class="share-info">
        <div class="user-amount">
          <img src="./images/ico_user.png" />
          <div class="text-wrapper">
            好友数量:
            <span>0人</span>
          </div>
        </div>
        <div class="share-balance">
          <img src="./images/ico_balance.png" />
          <div class="text-wrapper">
            累计返利:
            <span>0.00元</span>
          </div>
        </div>
      </div>
    </div>

    <div class="share-rules-section">
      <div class="title-wrapper">返利规则</div>

      <div class="rules-list">
        <img src="./images/rule_1.png" />
        <img src="./images/rule_2.png" />
      </div>
    </div>

    <div class="share-btn">
      <common-button @click="showSharePopup">立即邀请</common-button>
    </div>
  </div>
</template>

<script setup>
import { showSharePopup, showBindCodePopup } from '@/popup';
import { useStore } from '@/store';
import { copyText } from '@/utils';

const store = useStore();
</script>

<style lang="less" scoped>
@keyframes scale {
  from {
    transform: scale(1);
  }

  to {
    transform: scale(0.9);
  }
}

.share-page {
  position: relative;
  padding: 120px 12px 16px;
  background: #f8f8f8 url('./images/share_bg.png') no-repeat;
  background-size: 100% 667px;

  .share-code-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 8px;
    padding: 16px 12px;
    background: var(--white);

    .share-code-left {
      display: flex;
      gap: 4px;
      align-items: center;

      .copy-wrapper {
        border-radius: var(--radius-max);
        padding: 2px 10px;
        font-size: 12px;
        color: #5a5cff;
        background: #dde7ff;
      }
    }

    .share-code-right {
      display: flex;
      gap: 4px;
      align-items: center;

      img {
        width: 14px;
      }
    }
  }

  .share-info-section {
    margin-top: 12px;
    border-radius: 8px;
    padding: 4px 12px;
    background: var(--white);

    .title-wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 0;

      .title {
        font-size: 16px;
        font-weight: bold;
      }
    }

    .share-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 0;

      .user-amount,
      .share-balance {
        display: flex;
        align-items: center;

        img {
          width: 24px;
        }

        .text-wrapper {
          margin-left: 6px;
          color: #29447c;

          span {
            font-size: 15px;
            font-weight: bold;
          }
        }
      }

      .user-amount {
        span {
          color: #5a5cff;
        }
      }

      .share-balance {
        span {
          color: #ff7b20;
        }
      }
    }
  }

  .share-rules-section {
    margin-top: 12px;
    border-radius: 8px;
    padding: 16px;
    background: var(--white);
    box-shadow: 0 2px 6px #f0f1f3;

    .title-wrapper {
      font-size: 16px;
      font-weight: bold;
    }

    .rules-list {
      display: flex;
      justify-content: space-between;
      margin-top: 12px;

      img {
        width: 48%;
      }
    }
  }

  .share-btn {
    margin-top: 20px;

    .common-button {
      animation: scale 0.8s infinite alternate;
    }
  }
}
</style>
