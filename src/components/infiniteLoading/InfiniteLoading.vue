<template>
  <div class="infinite" ref="root">
    <template v-if="state.status === Status.Loading">
      <slot name="loading">
        <div class="loading-wrapper">
          <van-loading>{{ props.loadingText }}</van-loading>
        </div>
      </slot>
    </template>

    <template v-if="state.status === Status.NoMore">
      <slot name="no-more">
        <div class="no-more-wrapper">
          <div class="line"></div>
          <div class="text">{{ props.noMoreText }}</div>
          <div class="line"></div>
        </div>
      </slot>
    </template>

    <template v-if="state.status === Status.Empty">
      <slot name="empty">
        <div class="empty-wrapper">
          <img src="@/assets/images/empty.png" />
          <div class="text">{{ props.emptyText }}</div>
        </div>
      </slot>
    </template>

    <template v-if="state.status === Status.Error">
      <slot name="error">
        <div class="error-wrapper">
          <img src="@/assets/images/empty.png" />
          <div class="text">网络好像出错了...</div>
        </div>
      </slot>
    </template>
  </div>
</template>

<script setup>
import { onActivated, onBeforeUnmount, onDeactivated, onMounted, reactive, ref } from 'vue';

const Status = {
  Ready: 0,
  Loading: 1,
  NoMore: 2,
  Empty: 3,
  Error: 4,
};

const props = defineProps({
  distance: {
    type: Number,
    default: 10,
  },
  immediate: {
    type: Boolean,
    default: false,
  },
  loadingText: {
    type: String,
    default: '加载中...',
  },
  noMoreText: {
    type: String,
    default: '到底啦',
  },
  emptyText: {
    type: String,
    default: '没有更多了...',
  },
  container: {
    type: String,
    default: '',
  },
});

const emits = defineEmits(['infinite']);

const state = reactive({
  scrollParent: null,
  status: Status.Ready,
  hasData: false,
});
const root = ref(null);

onMounted(() => {
  state.scrollParent = getScrollParent();

  setTimeout(() => {
    if (props.immediate) {
      load();
    } else {
      handleScroll();
    }

    addListener();
  }, 1);

  addListener();
});

onBeforeUnmount(() => {
  removeListener();
});

onActivated(() => {
  addListener();
});

onDeactivated(() => {
  if (state.status === state.Loading) {
    state.status = state.Ready;
  }

  removeListener();
});

const isVisible = (el) => {
  const clientHeight =
    state.scrollParent === window
      ? window.innerHeight
      : state.scrollParent.getBoundingClientRect().bottom;

  return el.value.getBoundingClientRect().top <= clientHeight + props.distance;
};

const getScrollParent = () => {
  let el = window;
  if (props.container) {
    el = document.querySelector(props.container);
  }

  return el;
};

const load = () => {
  if (state.status === Status.Ready) {
    state.status = Status.Loading;
    emits('infinite', callback);
  }
};

const handleScroll = () => {
  if (isVisible(root)) {
    load();
  }
};

const removeListener = () => {
  state.scrollParent.removeEventListener('scroll', handleScroll);
};

const addListener = () => {
  state.scrollParent.addEventListener('scroll', handleScroll);
};

const callback = (page, res, error) => {
  if (error) {
    state.status = Status.Error;
    removeListener();
    return;
  }

  if (page === 1 && res.data.list.length === 0) {
    state.status = Status.Empty;
  } else if (res.data.list.length < 10 || page >= 5) {
    state.status = Status.NoMore;
    removeListener();
  } else {
    state.status = Status.Ready;
  }
};
</script>

<style lang="less" scoped>
@height: 50px;

.infinite {
  min-height: @height;

  .loading-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: @height;
    font-size: 13px;
  }

  .no-more-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: @height;
    color: #c8c9cc;

    .line {
      width: 40px;
      height: 1px;
      margin: 0 10px;
      background: #ebedf0;
    }
  }

  .empty-wrapper,
  .error-wrapper {
    padding: 20px 0 30px;
    text-align: center;

    img {
      width: 200px;
    }

    .text {
      margin-top: 16px;
      color: #c8c9cc;
    }
  }

  .error-wrapper {
    :deep(.van-button--normal) {
      width: 100px;
      height: 38px;
      margin-top: 20px;
      line-height: 38px;
    }
  }

  :deep(.van-loading__spinner) {
    width: 18px;
    height: 18px;
  }
}
</style>
