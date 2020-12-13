<template>
  <el-dialog
    title="收货地址"
    :visible.sync="dialogFormVisible"
    @close="closeDialog"
  >
    <form-template :formItem="formItem" :formHandler="formHandler" :labelPosition="labelPosition">
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
    return {
      dialogFormVisible: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      formItem: [
        {
          type: "text",
          label: "角色名称",
          placeholder: "请输入角色名称",
          prop: "roleName",
          labelWidth: "90px",
          width: "400px"
        },
        {
          type: "select",
          label: "角色选择",
          placeholder: "请选择角色",
          prop: "area",
          labelWidth: "90px",
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
        },
        {
          type: "textarea",
          label: "角色描述",
          placeholder: "请填写角色描述",
          prop: "description",
          labelWidth: "90px",
          width: "400px"
        },
        {
          type: "checkbox",
          model: 'hobby',
          label: "爱好",
          placeholder: "",
          prop: "hobby",
          labelWidth: "90px",
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
          placeholder: "",
          prop: "sex",
          labelWidth: "90px",
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
          placeholder: "请选择日期",
          prop: "range",
          labelWidth: "90px",
          width: "400px"
        },
        {
          type: "switch",
          label: "即时配送",
          placeholder: "",
          prop: "delivery",
          labelWidth: "90px",
          width: ""
        },


      ],
      labelPosition: "left",
      formHandler: {
        labelWidth: "90px", //占位
        options:  [
          {
            label: '确定',
            type: 'primary',
            handler: () => {}
          },
          {
            label: '取消',
            type: '',
            handler: () => {}
          }
        ]
      },
      
    };
  },
  methods: {
    closeDialog() {
      this.$emit("update:isShow", false);
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