<template>
  <van-popup v-model:show="show" class="qrcode-popup" :lazy-render="false">
    <qrcode :value="'12'" />
    <div class="text">扫二维码，邀请好友</div>

    <div class="close">
      <img src="./images/ico_close.png" @click="close" />
    </div>
  </van-popup>
</template>

<script setup>
import { usePopup } from './helper';

const { show, close, open } = usePopup();

defineExpose({
  open,
  close,
});
</script>

<style lang="less" scoped>
.qrcode-popup {
  border-radius: 8px;
  padding: 40px 20px;
  width: 250px;
  text-align: center;

  .qrcode {
    border-radius: 8px;
    width: 160px;
  }

  .text {
    margin-top: 16px;
    font-size: 13px;
  }

  .close {
    position: absolute;
    right: 0;
    bottom: -60px;
    left: 0;
    text-align: center;

    img {
      width: 32px;
    }
  }
}
</style>
