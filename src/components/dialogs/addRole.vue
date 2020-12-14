<template>
  <el-dialog
    title="收货地址"
    width="600px"
    :visible.sync="dialogFormVisible"
    @close="closeDialog"
  >
    <form-template ref="form" :formItem="formItem" :formData="form" :formHandler="formHandler" :labelPosition="labelPosition">
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
    let validateRole = (rule,value,callback) => {
      if(!value) {
        callback(new Error('请输入角色名称'));
      }else {
        callback();
      }
    }
    return {
      dialogFormVisible: false,
      // 表单数据
      form: {
        roleName: "",
        area: "",
        description: "",
        hobby: [],
        sex: null,
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
          labelWidth: "90px",
          width: "400px",
          validator: [{ validator: validateRole, trigger: 'blur' }]
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
          value: []
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
          prop: "date",
          labelWidth: "90px",
          width: "400px"
        },
        {
          type: "switch",
          label: "即时配送",
          placeholder: "",
          prop: "delivery",
          labelWidth: "90px",
          width: "",
          value: false
        },


      ],
      labelPosition: "left",
      formHandler: {
        labelWidth: "90px", //占位
        options:  [
          {
            label: '确定',
            type: 'primary',
            handler: (args) => this.submitForm()
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
    submitForm() {
      this.$refs['form'].$refs.form.validate(valid => {
        if(valid) {
          console.log(this.form);
        }else {
          return false
        }
      })
    }
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