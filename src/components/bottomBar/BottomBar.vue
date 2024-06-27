<template>
  <ul class="bottom-bar">
    <li
      class="bar-item"
      :class="{ active: $route.path === item.path }"
      v-for="item in list"
      :key="item.name"
      @click="handleClick(item)"
    >
      <img class="icon" :src="$route.path === item.path ? item.activeIcon : item.icon" />
      <p class="text">{{ item.name }}</p>
    </li>
  </ul>
  <div class="bottom-bar-placeholder"></div>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const list = computed(() => {
  return [
    {
      name: '首页',
      path: '/',
      icon: require('./home.png'),
      activeIcon: require('./home_active.png'),
    },
    {
      name: '福利',
      path: '/welfare',
      icon: require('./welfare.png'),
      activeIcon: require('./welfare_active.png'),
    },
    {
      name: '视频',
      path: '/video',
      icon: require('./video.png'),
      activeIcon: require('./video_active.png'),
    },
    {
      name: '圈子',
      path: '/social',
      icon: require('./social.png'),
      activeIcon: require('./social_active.png'),
    },
    {
      name: '我的',
      path: '/user',
      icon: require('./user.png'),
      activeIcon: require('./user_active.png'),
    },
  ];
});

const handleClick = (item) => {
  router.push(item.path);
};
</script>

<style lang="less" scoped>
@keyframes scale {
  50% {
    transform: scale(0.8);
  }
}

.bottom-bar-placeholder {
  height: var(--bottom-bar-height);
}

.bottom-bar {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  border-radius: 0;
  padding: 0 8px 4px;
  height: var(--bottom-bar-height);
  background: var(--white);
  box-shadow: 0 0 10px rgba(#c1c1c1, 0.5);

  .bar-item {
    flex: 1;
    text-align: center;

    &.active {
      .text {
        position: relative;
        color: transparent;
        background: var(--primary-color);
        background-clip: text;
      }

      .icon {
        animation: scale 0.3s ease-in;
      }
    }

    .icon {
      width: 22px;
      height: 22px;
    }

    .text {
      margin-top: 2px;
      font-size: 12px;
      color: #7e7e7e;
    }
  }
}
</style>
