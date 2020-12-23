<template>
  <div>添加角色</div>
</template>

<script>
export default {
  data() {
    return {
      tableSearch: [
        {
          label: '姓名ID/手机号',
          inputType: 'number',
          value: 'name',
        },
        {
          type: 'select',
          label: '是否添加微信',
          value: 'joinWeChatStatus',
          children: [
            {
              label: '未添加',
              value: 1
            },
            {
              label: '已添加',
              value: 2
            }
          ]
        }
      ]
    }
  }
}
</script>

<style>

</style>