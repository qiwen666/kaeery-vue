<template>
  <el-dialog
    title="重置密码"
    :visible.sync="dialogVisible"
    width="400px"
    >
  </el-dialog>
</template>

<script>
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialogVisible: false
    }
  },
  

}
</script>

<style>

</style>