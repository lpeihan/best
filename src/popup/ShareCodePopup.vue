<template>
  <van-popup v-model:show="show" :close-on-click-overlay="false">
    <div class="share-code-body">
      <div class="share-code-box">
        <div class="title">填写邀请码</div>
        <van-field placeholder="请填写邀请码" v-model="data.value" />
      </div>
      <div class="share-code-btn" @click="confirm">确认</div>

      <div class="close">
        <img src="./images/ico_close.png" @click="close" />
      </div>
    </div>
  </van-popup>
</template>

<script setup>
import { showToast } from 'vant';
import { reactive } from 'vue';

import { usePopup } from './helper';

const emits = defineEmits(['success']);

const data = reactive({
  value: undefined,
});
const { show, open, close } = usePopup();

const confirm = async () => {
  if (!data.value) {
    showToast('请输入正确的邀请码');
    return;
  }

  emits('success', data.value);
  close();
};

defineExpose({
  open,
});
</script>

<style lang="less" scoped>
.van-popup {
  background: transparent;
}

.share-code-body {
  width: 320px;

  .share-code-box {
    padding: 50px 54px;
    height: 200px;
    text-align: center;
    background: url('./images/share_bg.png');
    background-size: 100% 100%;

    .title {
      font-size: 16px;
      font-weight: bold;
      color: var(--white);
    }

    :deep(.van-field) {
      margin-top: 16px;
      border-radius: 4px;

      .van-field__control {
        text-align: center;
      }
    }
  }

  .share-code-btn {
    margin: 16px 40px;
    height: 48px;
    font-size: 15px;
    font-weight: bold;
    text-align: center;
    background: url('./images/btn_bg.png');
    background-size: 100% 100%;
    line-height: 44px;
  }

  .close {
    text-align: center;

    img {
      width: 40px;
    }
  }
}
</style>
