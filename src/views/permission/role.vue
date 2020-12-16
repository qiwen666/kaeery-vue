<template>
  <div>
    <div class="role-btn">
      <el-button class="add" @click="showDialog(1)"
        ><i class="el-icon-plus"></i>添加角色</el-button
      >
      <el-button class="edit" @click="showDialog(2)"
        ><i class="el-icon-edit"></i>编辑</el-button
      >
      <el-button type="danger" @click="remove"><i class="el-icon-delete"></i>删除</el-button>
    </div>
    <table-template
      ref="singleTable"
      :columns="columns"
      :tableOptions="tableOptions"
      :tableData="tableData"
      @selectCureentChange="selectCureentChange"
    ></table-template>
    <add-role ref="addRoleDialog" :isShow.sync="isShow" :listInfo="selectRow" :title="title" @cancel="cancel"></add-role>
  </div>
</template>

<script>
import tableTemplate from "@/components/mod/tableTemplate";
import addRole from "@/components/dialogs/addRole";
import { formatContent } from "@/utils/common";

export default {
  data() {
    return {
      columns: [
        {
          label: "角色名称",
          prop: "roleName",
          width: 180,
          render: (val) => {
            return val.roleName === 1 ? "管理员" : "超级管理员";
          },
        },
        {
          label: "角色描述",
          prop: "description",
          render: (val) => {
            return formatContent(val.description);
          },
        },
      ],
      tableOptions: {
        index: true,
        labelIndex: "序号",
        highlightCurrentRow: true,
      },
      tableData: [
        {
          id: 1,
          roleName: 1, // 管理员
          description: "测试角色",
        },
        {
          id: 2,
          roleName: 2,
          description:
            "测试角色测试角色测试角色测试角色测试角色测试角色测试角色测试角色",
        },
      ],
      isShow: false,
      selectRow: {},
      title: "添加角色"
    };
  },
  mounted() {
    let breadcrumb = [
      {
        link: "#",
        title: "权限管理",
      },
      {
        link: "",
        title: "系统角色",
      },
    ];
    this.$store.commit("SET_BREADCRUMB", breadcrumb);
  },
  methods: {
    // 添加角色
    // add() {
    //   this.isShow = !this.isShow;
    //   this.title = "添加角色"
    // },
    // // 编辑角色
    // edit() {
    //   if(!this.selectRow.id) {
    //     this.$message.warning('请选中一行数据');
    //   }else {
    //     this.isShow = true
    //     this.title = "编辑角色"
    //   }
    // },
    showDialog(index) {
      // index && index === 1 ? this.isShow = true : this.selectRow.id ? this.isShow = true : this.$message.warning('请选中一行数据')
      // ;

      if(index === 1) {
          this.$refs['addRoleDialog'].reset()
      }else {
        if(!this.selectRow.id) {
          this.$message.warning('请选中一行数据')
          return false
        }
        
      }
      this.isShow = true;

    },
    // 删除
    remove() {},    // 选中当前行
    selectCureentChange(currentRow) {
      this.selectRow = JSON.parse(JSON.stringify(currentRow))
    },
    // 取消选中
    cancel() {
      this.$refs.singleTable.$refs['table'].setCurrentRow();
    }
  },
  components: {
    tableTemplate,
    addRole,
  },
};
</script>

<style lang="scss">
.role-btn {
  text-align: right;
  .el-button {
    height: 40px;
    line-height: 40px;
    padding: 0 20px;
    border-radius: 6px;
    i {
      margin-right: 6px;
    }
  }
  span {
    color: var(--bg-white-color);
  }
  .add {
    background: var(--bg-add-color);
  }
  .edit {
    background: var(--bg-edit-color);
  }
}
</style>