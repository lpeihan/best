<template>
  <div class="app-root">
    <router-view v-slot="{ Component }" class="app-view" :key="state.key">
      <transition :name="state.transitionName" mode="out-in">
        <keep-alive :include="state.keepAlive">
          <component :is="Component" :key="$route.name" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script setup>
import { onMounted, reactive, watch } from 'vue';
import { useRouter } from 'vue-router';

import eventBus from '@/utils/eventBus';

const router = useRouter();

const state = reactive({
  transitionName: '',
  key: 0,
  keepAlive: [],
});

onMounted(async () => {
  eventBus.on('reloadApp', () => {
    state.key++;
  });
});

watch(
  () => router.currentRoute.value,
  (to, from) => {
    if (!from.name || to.meta.index === from.meta.index) {
      state.transitionName = '';

      return;
    }

    if (to.meta.index > from.meta.index) {
      state.transitionName = 'slide-left';
    } else {
      state.transitionName = 'slide-right';
    }
  },
);
</script>
<style lang="less">
.app-root {
  height: 100vh;
  -webkit-overflow-scrolling: touch;
}

.app-view {
  position: relative;
  min-height: 100%;
  overflow-x: hidden;
  background: var(--white);
}

.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  position: absolute;
  inset: 0;
  transition: all 300ms;
  will-change: transform;
}

.slide-right-enter {
  transform: translate3d(-100%, 0, 0);
}

.slide-right-leave-active {
  transform: translate3d(100%, 0, 0);
}

.slide-left-enter {
  transform: translate3d(100%, 0, 0);
}

.slide-left-leave-active {
  transform: translate3d(-100%, 0, 0);
}
</style>
