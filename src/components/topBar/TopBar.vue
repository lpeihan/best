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
  height: var(--top-bar-height);
  overflow: hidden;
  color: var(--text-color-1);
  text-align: center;
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
    width: 80px;
    height: 100%;
    padding-left: 16px;

    .back-wrapper {
      position: relative;

      &::after {
        position: absolute;
        overflow: hidden;
        pointer-events: none;
        background-color: var(--black);
        border-radius: 50%;
        content: '';
        opacity: 0;
        inset: -10px;
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
    width: 80px;
    height: 100%;
    padding-right: 12px;
    overflow: hidden;
    font-size: 15px;
  }
}

.header-placeholder {
  height: var(--top-bar-height);
  box-sizing: content-box;
}
</style>
