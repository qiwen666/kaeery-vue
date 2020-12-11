<template>
  <el-dialog
    title="上传组件"
    :visible.sync="dialogVisible"
    width="778px"
    @close="closeDialog"
  >
    <Process
      :stepList="stepList"
      :step="step"
      :activeColor="activeColor"
    />
    <span slot="footer" class="dialog-footer">
      <el-button @click="handlePrev($event)">{{
        step === 1 ? "取消" : "上一步"
      }}</el-button>
      <el-button type="primary" @click="handleNext(2)">下一步</el-button>
    </span>
  </el-dialog>
</template>

<script>
import Process from "./Process";

export default {
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      dialogVisible: false,
      stepList: ["选择文件", "确定有效区", "确定长宽", "确定坐标", "上传地图"], // 选择文件->确定有效区->确定长宽->确定坐标->上传地图
      step: 1,
      activeColor: "#aef523",
    };
  },
  methods: {
    closeDialog() {
      this.$emit("update:isShow", false);
    },
    handleNext(index) {
      this.step = index;
    },
    handlePrev(event) {
      console.log(event.target.innerHTML);
      event.target.innerHTML === "上一步"
        ? (this.step = 1)
        : (this.dialogVisible = false);
    },
  },
  watch: {
    isShow(val) {
      this.dialogVisible = val;
    },
  },
  components: {
    Process,
  },
};
</script>

<style>
</style>