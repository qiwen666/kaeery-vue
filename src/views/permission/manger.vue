<template>
  <div>
    <div class="operate-btn">
      <el-button @click="add"><i class="el-icon-plus"></i>添加管理员</el-button>
      <el-button @click="edit"><i class="el-icon-edit"></i>编辑</el-button>
      <el-button @click="resetPwd">重置密码</el-button>
      <el-button><i class="el-icon-delete"></i>删除</el-button>
    </div>
    <table-template
      ref="table"
      :columns="columns"
      :tableData="tableData"
      :tableOptions="tableOptions"
      @selectCureentChange="selectCureentChange"
    >

    </table-template>
    <add-manger ref="addManger" :isShow.sync="isShow" @submitForm="submitForm" :listInfo="listInfo"></add-manger>
    <reset-password></reset-password>
  </div>
</template>

<script>
import tableTemplate from "@/components/mod/tableTemplate";
import addManger from "@/components/dialogs/addManger";
import resetPassword from "@/components/dialogs/resetPassword";

export default {
  data() {
    return {
      columns: [
        {
          label: "角色",
          prop: "role",
          width: "200px"
        },
        {
          label: "账号",
          prop: "userName",
          width: "200px"
        },
        {
          label: "手机",
          prop: "tel",
          width: "200px"
        },
        {
          label: "邮箱",
          prop: "email",
          width: ""
        }
      ],
      tableData: [
        {
          id: 1,
          role: "测试角色",
          userName: "test",
          tel: 1325002457,
          email: "3491123437@qq.com"
        },
        {
          id: 2,
          role: "测试角色",
          userName: "test",
          tel: 1325002457,
          email: "3491123437@qq.com"
        }
      ],
      tableOptions: {
        highlightCurrentRow: true,
        index: true,
        labelIndex: "序号"
      },
      isShow: false,
      selectRow: {},
      listInfo: {}
    }
  },
  methods: {
    add() {
      this.isShow= !this.isShow;
      this.$refs['addManger'].reset();
    },
    edit() {
      if(!this.selectRow.id) {
        this.$message.warning("请选中一行数据")
        return false
      }
      this.isShow = true
      this.listInfo = this.selectRow;
    },
    submitForm(args) {
      console.log(args,'args');
    },
    selectCureentChange(currentRow) {
      this.selectRow = Object.assign({}, currentRow)
    },
    cancelSelect() {
      this.$refs['table'].$refs['tableTemplate'].setCurrentRow()
    }
  },
  components: {
    tableTemplate,
    addManger,
    resetPassword
  }
}
</script>

<style lang="scss">
  .operate-btn {
    text-align: right;
    .el-button{
      i {
        margin-right: 6px;
      }
      color: var(--bg-white-color);
      &:nth-child(1) {
        background: var(--bg-add-color);
      }
      &:nth-child(2) {
        background: var(--bg-edit-color);
      }
      &:nth-child(3) {
        background: var(--bg-reset-color);
      }
      &:last-child {
        background: var(--bg-del-color);
      }

    }
  }
</style>