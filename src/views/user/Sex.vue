<template>
  <div class="sex-page">
    <top-bar title="性别" transparent :border="false" />

    <div class="sex-title">
      <span>Hi !</span>
      您的性别是？
    </div>

    <div class="sex-sub-title">只有一次选择性别的机会哦～</div>

    <div class="sex-selection">
      <div class="selection-item">
        <img src="./images/ico_man.png" />
      </div>

      <div class="selection-item">
        <img src="./images/ico_woman.png" />
      </div>
    </div>

    <img src="./images/bg.png" class="bg" />
  </div>
</template>

<style lang="less" scoped>
.sex-page {
  padding: 40px;
  background: #ffef3e;

  .sex-title {
    font-size: 15px;
    font-weight: bold;

    span {
      font-size: 24px;
    }
  }

  .sex-sub-title {
    margin-top: 8px;
  }

  .sex-selection {
    display: flex;
    justify-content: space-around;
    padding: 40px 0;

    .selection-item {
      width: 80px;
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
