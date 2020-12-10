<template>
  <div>
    <div class="user-top">
      <el-input v-model="keyword" placeholder="根据用户昵称搜索"></el-input>
      <el-button plain icon="el-icon-search">搜索</el-button>
    </div>
    <table-template 
      :hasPagination="hasPagination"
      :columns="tableHeader"
      :tableOptions="tableOptions"
      :tableHandle="tableHandle"
      :tableData="tableData"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
    >
    <template v-slot:content="slotProps">
      <el-tooltip
        class="item"
        effect="dark"
        :content="slotProps.row.content"
        placement="bottom"
      >
        <div>{{ slotProps.row.content | toFormatContent }}</div>
      </el-tooltip>
    </template>
      <template v-slot:quality="slotProps">
        <span class="operator">{{slotProps.row.quality}}</span>
      </template>
    </table-template>
  </div>
</template>

<script>
import tableTemplate from "@/components/mod/tableTemplate";

export default {
  filters: {
    toFormatContent(val) {
      return val.length > 12 ? val.slice(0,12) + '...' : val
    }
  },
  data() {
    return {
      keyword: "",
      // table配置
      tableHeader: [
        {
          label: '公司名称',
          prop: 'title'
        },
        {
          label: '注册时间',
          prop: 'registerTime'
        },
        {
          label: '内容',
          prop: 'content',
          slotContent: 'slot',
          slotName: 'content'
        },
        {
          label: '权限',
          prop: 'quality',
          slotContent: 'slot',
          slotName: 'quality'
        },
        {
          label: '审核时间',
          prop: 'status',
          render: (row) => row.status === 1 ? '已发布' : row.status === 2 ? '发布中' : '未发布'
        },
        {
          label: '状态',
          prop: 'handleStatus',
          render: (row) => row.handleStatus === 1 ? '正常' : '停用'
        }
      ],
      tableOptions: {
        selection: false,
        index: true,
        labelIndex: '序号'
      },
      tableHandle: {
        label: '操作',
        options: [
          {
            label: '修改',
            method: (index,row) => {
              this.handleEdit(index,row);
            }
          },
          {
            label: '删除',
            method: (index,row) => {
              this.handleDel(index,row);
            }
          },
          {
            label: '禁用',
            disabled: true,
            method: (index,row) => {}
          },
          {
            label: '启用',
            method: (index,row) => {}
          }
        ]
      },
      tableData: [
        {
          registerTime: "2016-05-02",
          title: "王小虎",
          status: 1,
          content: '意见反馈意见反馈意见反馈意见反馈意见反馈意见反馈',
          quality: '查看',
          handleStatus: 1 // 正常
        },
        {
          registerTime: "2016-05-02",
          title: "王小虎",
          status: 2,
          content: '意见反馈意见反馈意见反馈意见反馈意见反馈意见反馈',
          handleStatus: 2 //停用
        },
        {
          registerTime: "2016-05-02",
          title: "王小虎",
          status: 3,
          content: '意见反馈意见反馈意见反馈意见反馈意见反馈意见反馈',
          handleStatus: 2
        },
        {
          registerTime: "2016-05-02",
          title: "王小虎",
          status: 1,
          content: '意见反馈意见反馈意见反馈意见反馈意见反馈意见反馈',
          handleStatus: 1
        },
      ],
      hasPagination: false
    }
  },
  mounted() {
    let breadcrumb = [
      {
        link: "#",
        title: "用户管理",
      },
      {
        link: "",
        title: "注册用户",
      },
    ];
    this.$store.commit("SET_BREADCRUMB", breadcrumb);
  },
  methods: {
    handleEdit(index,row) {
      console.log(index,row,'编辑');
    },
    handleDel(index,row) {
      console.log(index,row,'删除');
    },
    handleSizeChange(val) {
      console.log(val,'pageSize改变');
    },
    handleCurrentChange(val) {
      console.log(val,'当前页改变');
    }
  },
  components: {
    tableTemplate,
  },
};
</script>

<style lang="scss">
.user-top {
  display: flex;
  margin-bottom: 15px;
  .el-input {
    width: 200px;
    margin-right: 10px;
    input::placeholder {
      color: var(--font-keyword-color);
    }
  }
  .el-button {
    width: 80px;
    padding: 10px;
  }
}
.operator {
  color: var(--font-checked-color);
  cursor: pointer;
}
</style>