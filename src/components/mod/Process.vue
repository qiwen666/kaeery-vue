<template>
  <div class="process">
    <div class="step" v-for="(item, index) in stepList" :key="index">
      <!-- 圆 -->
      <div class="circle-wrapper" :style="{ width: circleWidth + 'px' }">
        <div
          class="circle"
          :style="index + 1 === step ? { background: activeColor } : ''"
        >
          {{ index + 1 }}
        </div>
        <span :style="index + 1 === step ? { color: activeColor } : ''">{{
          item
        }}</span>
      </div>
      <!-- 线 -->
      <div
        class="line"
        :style="
          index + 1 === step
            ? { width: lineWidth + 'px', borderColor: activeColor }
            : { width: lineWidth + 'px' }
        "
        v-if="index !== stepList.length - 1"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    step: {
      type: Number,
      default: 1,
    },
    stepList: {
      type: Array,
    },
    activeColor: {
      type: String,
      default: "#409EFF",
    },
    circleWidth: {
      type: Number,
      default: 80,
    },
    lineWidth: {
      type: Number,
      default: 90,
    },
  },
};
</script>

<style lang="scss">
.circle-done {
  background: var(--font-checked-color);
}
.line-done {
  border-color: var(--bg-white-color);
}
.process {
  display: flex;
  height: 71px;
  text-align: center;
  .step {
    display: flex;
    .circle-wrapper {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .circle {
        width: 33px;
        height: 33px;
        margin-bottom: 10px;
        line-height: 33px;
        text-align: center;
        color: var(--bg-white-color);
        background: #c7c7c7;
        font-size: 16px;
        border-radius: 50%;
      }
    }
    .line {
      height: 2px;
      margin-top: 16px;
      border: 1px dashed rgba(199, 199, 199, 1);
    }
  }
}
</style>