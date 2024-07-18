<template>
  <div class="birthday-page">
    <top-bar title="生日" transparent :border="false" />

    <div class="birthday-title">
      <span>Hi !</span>
      您的生日是哪天呢？
    </div>

    <div class="birthday-sub-title">请正确选择出生日期，这样才能更好的结交朋～</div>

    <div class="birthday-picker">
      <van-date-picker :show-toolbar="false" v-model="state.birthday" />
    </div>

    <common-button block>完成</common-button>

    <img src="./images/bg.png" class="bg" />
  </div>
</template>

<script setup>
import { reactive } from 'vue';

const state = reactive({
  birthday: ['2020', '01', '02'],
});
</script>

<style lang="less" scoped>
.birthday-page {
  padding: 20px;
  background: #ffef3e;

  .birthday-title {
    font-size: 15px;
    font-weight: bold;

    span {
      font-size: 24px;
    }
  }

  .birthday-sub-title {
    margin-top: 8px;
  }

  .birthday-picker {
    padding-top: 30px;

    :deep(.van-picker) {
      background: transparent;

      .van-picker__mask {
        display: none;
      }

      .van-picker__frame {
        background: rgb(0 0 0 / 10%);
        border-radius: 8px;

        &::after {
          border-color: transparent;
        }
      }
    }
  }

  .common-button {
    margin-top: 32px;
  }

  .bg {
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
  }
}
</style>
