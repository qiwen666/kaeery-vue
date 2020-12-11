<template>
  <div>
    <div class=role-btn>
      <el-button class="add"><i class="el-icon-plus"></i>添加角色</el-button>
      <el-button class="edit"><i class="el-icon-edit"></i>编辑</el-button>
      <el-button type="danger"><i class="el-icon-delete"></i>删除</el-button>
    </div>
    <table-template :columns="columns" :tableOptions="tableOptions" :tableData="tableData"></table-template>
  </div>
</template>

<script>
import tableTemplate from "@/components/mod/tableTemplate";

export default {
  data() {
    return {
      columns: [
        {
          label: '角色名称',
          prop: 'roleName',
          width: 180
        },
        {
          label: '角色描述',
          prop: 'description'
        }
      ],
      tableOptions: {
        index: true,
        labelIndex: '序号'
      },
      tableData: [
        {
          id: 1,
          roleName: 1, // 管理员
          description: '测试角色'
        },
        {
          id: 2,
          roleName: 2,
          description: '测试角色'
        }

      ]
    }
  },
  mounted() {
    let breadcrumb = [
      {
        link: '#',
        title: '权限管理'
      },
      {
        link: '',
        title: '系统角色'
      },
    ];
    this.$store.commit('SET_BREADCRUMB',breadcrumb); 
  },
  components: {
    tableTemplate
  }
}
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