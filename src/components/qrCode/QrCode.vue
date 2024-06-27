<template>
  <div class="qrcode-wrapper"></div>
</template>

<script>
import QRCode from 'qrcodejs2';

import { getRealSize } from '@/utils/dom';

export default {
  props: {
    value: {
      type: String,
      default: '',
    },
    width: {
      type: Number,
      default: 136,
    },
    height: {
      type: Number,
      default: 136,
    },
  },
  watch: {
    value(val) {
      if (this.qrcode) {
        this.qrcode.makeCode(val);
      }
    },
  },
  methods: {
    generate() {
      this.qrcode = new QRCode(this.$el, {
        text: this.value,
        width: getRealSize(this.width || this.$el.offsetWidth),
        height: getRealSize(this.height || this.$el.offsetHeight),
        correctLevel: QRCode.CorrectLevel.L,
      });

      this.qrcode.makeCode(this.value);

      setTimeout(() => {
        window.QRCODE_URL = this.$el.querySelector('img').src;
      }, 500);
    },
  },
  mounted() {
    this.generate();
  },
};
</script>

<style lang="less" scoped>
.qrcode-wrapper {
  display: inline-block;
}
</style>
