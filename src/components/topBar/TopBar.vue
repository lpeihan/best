<template>
  <div>
    <header
      class="header"
      :class="{
        'van-hairline--bottom': border && !transparent,
        fixed,
        theme,
        transparent,
      }"
      :style="style"
    >
      <div class="header-left">
        <slot name="left">
          <div class="back-wrapper" @click="handleBack" v-show="back">
            <svg-icon name="back" />
          </div>
        </slot>
      </div>

      <div class="header-middle">
        <slot>
          {{ title }}
        </slot>
      </div>

      <div class="header-right">
        <slot name="right"></slot>
      </div>
    </header>

    <div class="header-placeholder" :style="style" v-if="fixed"></div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';

import { useStore } from '@/store';

const router = useRouter();
const store = useStore();

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  back: {
    type: Boolean,
    default: true,
  },
  border: {
    type: Boolean,
    default: true,
  },
  to: {
    type: String,
    default: '',
  },
  fixed: {
    type: Boolean,
    default: true,
  },
  theme: {
    type: Boolean,
    default: false,
  },
  transparent: {
    type: Boolean,
    default: false,
  },
});

const style = computed(() => {
  return {
    paddingTop: store.getNavHeight(),
  };
});

const handleBack = () => {
  if (props.to) {
    router.push(props.to);
  } else {
    router.go(-1);
  }
};
</script>

<style lang="less" scoped>
.header {
  display: flex;
  align-items: center;
  overflow: hidden;
  height: var(--top-bar-height);
  text-align: center;
  color: var(--text-color);
  background: var(--white);
  box-sizing: content-box;

  &.theme {
    background: #cdd6f7;
    background-size: 100% 100%;
  }

  &.fixed {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 10;
  }

  &.transparent {
    background: transparent;
  }

  &-left {
    display: flex;
    align-items: center;
    padding-left: 16px;
    width: 80px;
    height: 100%;

    .back-wrapper {
      position: relative;

      &::after {
        position: absolute;
        top: -10px;
        right: -10px;
        bottom: -10px;
        left: -10px;
        overflow: hidden;
        border-radius: 50%;
        background-color: var(--black);
        opacity: 0;
        content: '';
        pointer-events: none;
      }

      &:active::after {
        opacity: 0.1;
      }
    }
  }

  &-middle {
    font-size: 16px;
    font-weight: bold;
    flex: 1;
  }

  &-right {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    overflow: hidden;
    padding-right: 12px;
    width: 80px;
    height: 100%;
    font-size: 15px;
  }
}

.header-placeholder {
  box-sizing: content-box;
  height: var(--top-bar-height);
}
</style>
