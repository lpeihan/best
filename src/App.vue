<template>
  <div class="app-root">
    <router-view v-slot="{ Component }" class="app-view" :key="data.key">
      <transition :name="data.transitionName" mode="out-in">
        <keep-alive :include="data.keepAlive">
          <component :is="Component" :key="$route.name" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script setup>
import { watch, onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';

import eventBus from '@/utils/eventBus';

const router = useRouter();

const data = reactive({
  transitionName: '',
  key: 0,
  keepAlive: [],
});

onMounted(async () => {
  eventBus.on('reloadApp', () => {
    data.key++;
  });
});

watch(
  () => router.currentRoute.value,
  (to, from) => {
    if (!from.name || to.meta.index === from.meta.index) {
      data.transitionName = '';
      return;
    }

    if (to.meta.index > from.meta.index) {
      data.transitionName = 'slide-left';
    } else {
      data.transitionName = 'slide-right';
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
  overflow-x: hidden;
  min-height: 100%;
  background: var(--white);
}

.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
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
