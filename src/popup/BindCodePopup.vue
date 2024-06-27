<template>
  <van-popup v-model:show="data.show" class="common-popup">
    <div class="popup-title van-hairline--bottom">请填写邀请码</div>

    <div class="content-container">
      <div class="input-wrapper">
        <van-field v-model="data.value" label="" placeholder="请填写邀请码" />
      </div>

      <common-button @click="confirm">确定</common-button>
    </div>

    <div class="popup-close">
      <img src="./images/ico_close.png" @click="close" />
    </div>
  </van-popup>
</template>

<script setup>
import { showToast } from 'vant';
import { reactive } from 'vue';

import { useStore } from '@/store';

const store = useStore();
const data = reactive({
  show: false,
  value: undefined,
});

const open = () => {
  data.show = true;
};

const close = () => {
  data.show = false;
};

const confirm = async () => {
  if (!data.value) {
    showToast('请输入邀请码');
    return;
  }

  store.setUserInfo();
  showToast('绑定成功');
  close();
};

defineExpose({
  open,
});
</script>

<style lang="less" scoped>
.content-container {
  padding: 32px 24px;

  .input-wrapper {
    margin-bottom: 32px;

    .van-field {
      border: 1px solid var(--border-color);
      border-radius: 4px;
      text-align: center;
    }
  }
}
</style>
