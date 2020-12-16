<template>
  <el-dialog
    :title="title"
    width="550px"
    :visible.sync="dialogFormVisible"
    @close="closeDialog"
    custom-class="addrRoleDailog"
  >
    <form-template
      ref="VueForm"
      :formItem="formItem"
      :formData="form"
      :formHandler="formHandler"
      :labelPosition="labelPosition"
    >
    </form-template>
  </el-dialog>
</template>

<script>
import formTemplate from "@/components/mod/formTemplate";
import { validateRoleDesc } from "@/utils/validate";

export default {
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    listInfo: {
      type: Object,
      default: () => {}
    },
    title: {
      type: String,
      default: "添加角色"
    }
  },
  data() {
    return {
      dialogFormVisible: false,
      // 表单数据
      form: {
        roleName: "",
        description: ""
      },
      // 表单配置
      formItem: [
        {
          type: "text",
          label: "角色名称",
          placeholder: "请输入角色名称",
          prop: "roleName",
          width: "400px",
          validator: [{ validator:  validateRoleDesc, trigger: 'change'}]
        },
        {
          type: "textarea",
          label: "角色描述",
          placeholder: "请填写角色描述",
          prop: "description",
          width: "400px",
          required: true,
          rules: [
            {
              min: 1,
              max: 120,
              message: "长度在 1 到 120 个字符",
              trigger: "change",
            },
          ],
        },
      ],
      labelPosition: "left",
      // 表单方法
      formHandler: {
        labelWidth: "90px", //占位
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
              this.resetForm("form")
              this.$emit("cancelSelect")
            }
          },
        ],
      },
    };
  },
  methods: {
    closeDialog() {
      this.$emit("update:isShow", false);
    },
    // 提交表单
    submitForm() {
      const self = this.$refs["VueForm"];
      self.$refs.form.validate((valid) => {
        if (valid) {
          console.log(this.form);
          // 添加角色后，弹框消失， 清空内容和校验规则,取消选中
          this.dialogFormVisible = false;
          this.$nextTick(() => {
            this.$refs["VueForm"].$refs['form'].clearValidate()
          })
          this.$parent.cancelSelect()

        } else {
          return false;
        }
      });
    },
    // 重置表单
    // 取消操作，弹框消失，清空内容
    resetForm(formName) {
      this.dialogFormVisible = false;
      this.$refs["VueForm"].$refs[formName].resetFields();
      for(let key in this.form) {
        this.form[key] = ""
      }
    },
    // 编辑与添加共用一个弹框，点击编辑后，再点击新增，数据不重新初始化的解决方法
    reset() {
      this.$nextTick(() => {
        this.$refs["VueForm"].$refs["form"].clearValidate();
      })
      for(let key in this.form) {
        this.form[key] = ""
      }
    }
  },
  watch: {
    isShow(val) {
      this.dialogFormVisible = val;
      // this.form = {
      //   roleName: "",
      //   description: ""
      // }
      // 重置表单
      // if(this.dialogFormVisible) {
        // this.$nextTick(() => {
        //   this.$refs["VueForm"].$refs['form'].resetFields();
        // })
      // }
    },
    listInfo(val) {
      if(val) {
        this.form = val;
      }
      
    },
  },
  components: {
    formTemplate,
  },
};
</script>

<style lang="scss">
.addrRoleDailog {
  .el-dialog__body {
    padding: 10px 20px;
  }
}
</style>