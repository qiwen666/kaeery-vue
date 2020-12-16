<template>
  <el-dialog
    title="添加管理员"
    :visible.sync="dialogVisible"
    width="550px"
    @close="closeDialog"
  >
    <form-template 
      ref="VueForm"
      :formItem="formItem"
      :formHandler="formHandler"
      :formData="formData"
      :labelWidth="labelWidth"
      :labelPosition="labelPosition"
    >
    </form-template>
  </el-dialog>
</template>

<script>
import formTemplate from "@/components/mod/formTemplate";

export default {
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    listInfo: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      formData: {
        userName: "",
        role: "",
        password: "",
        tel: null,
        email: ""
      },
      formItem: [
        {
          type: "text",
          label: "账号",
          placeholder: "请输入账号",
          prop: "userName",
          width: "400px",
          required: true
        },
        {
          type: "select",
          label: "角色",
          prop: "role",
          width: "400px",
          placeholder: "请输入角色",
          options: [
            {
              label: "测试角色",
              value: 1
            }
          ],
          required: true
        },
        {
          type: "text",
          label: "密码",
          prop: "password",
          width: "400px",
          placeholder: "请输入密码",
          required: true //自定义校验规则
        },
        {
          type: "text",
          label: "手机号",
          prop: "tel",
          width: "400px",
          placeholder: "请输入手机号",
          required: true //自定义校验规则
        },
        {
          type: "text",
          label: "邮箱",
          prop: "email",
          width: "400px",
          placeholder: "请填写邮箱",
          required: true //自定义校验规则
        },

      ],
      formHandler: {
        labelWidth: "70px", //占位
        position: "right",
        options: [
          {
            label: "确定",
            type: "primary",
            handler: () => this.submitForm(),
          },
          {
            label: "取消",
            type: "",
            handler: () => {
              // 文本清空，弹框消失,取消选中
              this.$refs['VueForm'].$refs['form'].resetFields()
              this.dialogVisible = false
              this.$parent.cancelSelect()
            }
          },
        ],
      },
      labelWidth: "70px",
      labelPosition: "right",
      dialogVisible: false
    }

  },
  methods: {
    closeDialog() {
      this.$emit("update:isShow", false)
    },
    // 提交表单
    submitForm() {
      this.$refs['VueForm'].$refs['form'].validate((valid) => {
        if (valid) {
          // 清空文本，弹框消失
          this.$emit("submitForm",this.formData)
          // 点击新增后，添加数据，然后取消，再次点击新增，表单数据被显示的解决方法？
          this.dialogVisible = false;
        } else {
          return false;
        }
      })
    },
    // 清除校验规则，表单清空
    reset() {
      this.$nextTick(() => {
        this.$refs['VueForm'].$refs['form'].clearValidate()
      })
      for(let key in this.formData) {
        this.formData[key] = ""
      }
    }
  },
  watch: {
    isShow(val) {
      this.dialogVisible = val;
    },
    listInfo(val) {
      if(val) {
        this.formData = val;
      }
    }
  },
  components: {
    formTemplate
  }
};
</script>

<style>
</style>