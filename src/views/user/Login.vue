<template>
  <div class="login-page">
    <top-bar title="登录" transparent :border="false" />
    <img src="./images/bg.png" class="bg" />

    <div class="login-container">
      <div class="logo-wrapper"></div>

      <van-field
        v-model="data.form.phone_number"
        :border="false"
        placeholder="请输入手机号码"
        type="tel"
        maxlength="11"
      />

      <van-field
        v-model="data.form.code"
        :border="false"
        placeholder="请输入验证码"
        type="digit"
        maxlength="4"
      >
        <template v-slot:button>
          <div class="send-btn" v-if="data.timeCount <= 0" @click="handleSendCode">获取验证码</div>
          <div class="send-btn disabled" v-else>{{ data.timeCount }}s后再获取</div>
        </template>
      </van-field>

      <van-button block type="primary" @click="handleLogin">登录</van-button>

      <div class="privacy">
        <van-checkbox :model-value="true" :checked-color="'black'">
          <span>登录即同意</span>
          <router-link to="/user-privacy">《用户协议》</router-link>
          <router-link to="/privacy">《隐私协议》</router-link>
        </van-checkbox>
      </div>
    </div>
  </div>
</template>

<script setup>
import Schema from 'async-validator';
import { showToast } from 'vant';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

import { useStore } from '@/store';
import { setToken } from '@/utils/auth';
import { isPhoneNumber } from '@/utils/validator';

const validator = new Schema({
  phone_number: [
    { required: true, message: '请输入手机号' },
    {
      validator(rules, val) {
        return isPhoneNumber(val);
      },
      message: '请输入正确的手机号',
    },
  ],
  code: [{ required: true, message: '请输入验证码' }],
});

const store = useStore();
const router = useRouter();
const data = reactive({
  form: {
    phone_number: '',
    code: '',
  },
  timeCount: 0,
  checked: true,
  timer: null,
});

const handleSendCode = async () => {
  if (data.timeCount > 0) {
    return;
  }

  validator.validate(data.form, async (errors) => {
    if (errors && errors[0].field === 'phone_number') {
      showToast(errors[0].message);
      return;
    }

    data.timeCount = 59;

    data.timer = setInterval(() => {
      data.timeCount--;

      if (data.timeCount <= 0) {
        clearInterval(data.timer);
        data.timeCount = 0;
      }
    }, 1000);
  });
};

const handleLogin = async () => {
  if (!data.checked) {
    showToast('请勾选同意用户协议及隐私协议');
    return;
  }

  validator.validate(data.form, async (errors) => {
    if (errors) {
      showToast(errors[0].message);
      return;
    }

    setToken(data.form.phone_number);
    showToast('登录成功');

    store.getUserInfo();
    router.go(-1);
  });
};
</script>

<style lang="less" scoped>
.login-page {
  padding: 20px;
  background: #ffef3e;

  .logo-wrapper {
    width: 80px;
    height: 80px;
    margin: 40px auto 60px;
    background: var(--black);
    border-radius: 50%;
  }

  :deep(.van-cell) {
    margin: 15px 0;
    border: 2px solid var(--black);
    border-radius: 4px;
  }

  :deep(.van-checkbox__icon) {
    font-size: 16px;
  }

  .send-btn {
    color: var(--text-color-1);

    &.disabled {
      color: var(--text-color-1);
    }
  }

  .privacy {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    font-size: 13px;
    color: var(--text-color-1);

    a {
      color: var(--text-color-1);
    }
  }

  .bg {
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
  }
}
</style>
