<template>
  <transition @after-leave="onAfterLeave">
    <div class="base-loading" v-if="show" @touchmove.stop.prevent>
      <div class="base-loading-wrapper">
        <div class="base-loading-spin"></div>
        <div class="base-loading-text" v-if="message">{{ message }}</div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      show: false,
    };
  },
  props: {
    message: {
      type: String,
      default: '',
    },
    destroy: {
      type: Function,
      default: () => {},
    },
  },
  methods: {
    open() {
      this.show = true;
    },
    close() {
      this.show = false;
    },
    onAfterLeave() {
      this.destroy();
    },
  },
};
</script>

<style lang="less" scoped>
@keyframes spin-rotate {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

@spin-color: #ccc;

.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.base-loading {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 50px;

  &-wrapper {
    z-index: 3000;
    padding: 28px;
    color: white;
    text-align: center;
    background: rgb(0 0 0 / 70%);
    border-radius: 5px;
    box-sizing: border-box;
  }

  &-spin {
    width: 32px;
    height: 32px;
    margin: 0 auto;
    border: 5px solid transparent;
    border-top-color: @spin-color;
    border-bottom-color: @spin-color;
    border-left-color: @spin-color;
    border-radius: 50%;
    animation: spin-rotate 0.8s infinite linear;
  }

  &-text {
    margin-top: 6px;
  }
}
</style>
