<template>
  <el-dialog
    title="重置密码"
    :visible.sync="dialogVisible"
    width="450px"
    @close="closeDialog"
    custom-class="pwd-dialog"
  >
    <el-form :model="form" label-position="left" ref="form" :rules="rules" :hide-required-asterisk="true">
      <el-form-item label="新密码" :label-width="formLabelWidth" prop="password">
        <el-input v-model="form.password" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="confirm"
        >确 定</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    isVisible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      dialogVisible: false,   
      formLabelWidth: "70px",
      form: {
        password: ""
      },
      rules: {
        password: [{ required: true, message: "请输入密码", trigger: "change" }]
      }
    };
  },

  methods: {
    closeDialog() {
      this.$emit("update:isVisible", false);
    },
    confirm() {
      this.$refs['form'].validate(valid => {
        if(valid) {
          this.$emit("resetPwd",this.form)
          this.dialogVisible = false
          this.$parent.cancelSelect()
        }else {
          return false
        }
      })
    },
    cancel() {
      this.$refs['form'].resetFields()
      this.dialogVisible = false
      this.$parent.cancelSelect()
    }
  },

  watch: {
    isVisible(val) {
      this.dialogVisible = val;
      if(this.dialogVisible) {
        this.$nextTick(() => {
          this.$refs['form'].resetFields()
        })
      }
    },
  },
};
</script>

<style lang="scss">
  .pwd-dialog {
    .el-dialog__body {
      padding: 15px 38px;
    }
}
</style>