<template>
  <div class="share-details">
    <top-bar title="邀请记录" theme />

    <div class="share-list">
      <div class="share-item van-hairline--bottom" v-for="(item, index) in list" :key="index">
        <div class="nickname">
          {{ item.name }}
        </div>
        <div class="time">{{ item.created_at }}</div>
        <div class="amount">
          <img src="@/assets/images/star.png" />
          <span>{{ 3000 }}</span>
        </div>
      </div>
      <infinite-loading @infinite="infinite" />
    </div>
  </div>
</template>

<script>
import { getUserList } from '@/api/user';

export default {
  data() {
    return {
      list: [],
      page: 0,
    };
  },
  methods: {
    async infinite(cb) {
      const res = await getUserList({
        limit: 20,
        page: ++this.page,
      });

      cb(this.page, res);
      this.list = this.list.concat(res.data.list);
    },
  },
};
</script>

<style lang="less" scoped>
.share-details {
  .share-list {
    background: var(--white);

    .share-item {
      display: flex;
      align-items: center;
      padding: 16px;
      color: var(--black);
      background: var(--white);

      .nickname {
        margin-left: 4px;
        width: 100px;
        font-weight: bold;
      }

      .time {
        margin-top: 3px;
        font-size: 13px;
        text-align: center;
        color: var(--text-color-2);
        flex: 1;
      }

      .amount {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        width: 100px;
        font-weight: bold;

        img {
          width: 28px;
        }
      }
    }
  }
}
</style>
