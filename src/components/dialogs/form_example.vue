<template>
  <el-dialog
    title="收货地址"
    width="600px"
    :visible.sync="dialogFormVisible"
    @close="closeDialog"
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

export default {
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    let validateRole = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入角色名称"));
      } else {
        callback();
      }
    };
    return {
      dialogFormVisible: false,
      // 表单数据
      form: {
        roleName: "",
        area: "",
        description: "",
        hobby: [1, 2],
        sex: 1,
        date: null,
        delivery: false,
      },
      // 表单配置
      formItem: [
        {
          type: "text",
          label: "角色名称",
          placeholder: "请输入角色名称",
          prop: "roleName",
          width: "400px",
          validator: [{ validator: validateRole, trigger: "blur" }],
        },
        {
          type: "select",
          label: "角色",
          placeholder: "请选择角色",
          prop: "area",
          width: "",
          options: [
            {
              value: 1,
              label: "管理员",
            },
            {
              value: 2,
              label: "财务人员",
            },
          ],
          required: true,
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
        {
          type: "checkbox",
          label: "爱好",
          prop: "hobby",
          options: [
            {
              label: "睡觉",
              value: 1,
            },
            {
              label: "吃饭",
              value: 2,
            },
          ],
        },
        {
          type: "radio",
          label: "性别",
          prop: "sex",
          options: [
            {
              label: "男",
              value: 1,
            },
            {
              label: "女",
              value: 2,
            },
          ],
        },
        {
          type: "date",
          label: "日期范围",
          prop: "date",
          width: "400px",
          required: true,
        },
        {
          type: "switch",
          label: "即时配送",
          prop: "delivery",
          width: "",
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
            handler: () => this.resetForm("form"),
          },
        ],
      },
    };
  },
  methods: {
    closeDialog() {
      this.$emit("update:isShow", false);
    },
    submitForm() {
      const self = this.$refs["VueForm"];
      self.$refs.form.validate((valid) => {
        if (valid) {
          console.log(this.form);
        } else {
          return false;
        }
      });
    },
    // 重置表单
    resetForm(formName) {
      this.$refs["VueForm"].$refs[formName].resetFields();
    },
  },
  watch: {
    isShow(val) {
      this.dialogFormVisible = val;
    },
  },
  components: {
    formTemplate,
  },
};
</script>

<style>
</style>