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
              this.resetForm("form");
              this.$emit("cancel")
            }
          },
        ],
      },
    };
  },
  methods: {
    closeDialog() {
      this.$emit("update:isShow", false);
      this.resetForm('form')
    },
    // 提交表单
    submitForm() {
      const self = this.$refs["VueForm"];
      self.$refs.form.validate((valid) => {
        if (valid) {
          console.log(this.form);
          this.dialogFormVisible = false;
        } else {
          return false;
        }
      });
    },
    // 重置表单
    resetForm(formName) {
      this.$refs["VueForm"].$refs[formName].resetFields();
      this.dialogFormVisible = false;
    },
    reset() {
        this.$nextTick(() => {
          this.$refs["VueForm"].$refs['form'].resetFields();
        })

    }
  },
  watch: {
    isShow(val) {
      this.dialogFormVisible = val;
      // 重置表单
      // if(this.dialogFormVisible) {
      //   this.$nextTick(() => {
      //     this.$refs["VueForm"].$refs['form'].resetFields();
      //   })
      // }
    },
    listInfo(val) {
      if(val) {
        this.form = val;
      }
    },
    // title(val) {
    //   if(val === '添加角色') {
    //     // this.$refs["VueForm"].$refs['form'].resetFields();
    //     this.form = {}
    //   }else {
    //     this.form = this.listInfo;
    //   }
    // }
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