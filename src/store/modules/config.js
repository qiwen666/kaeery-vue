const state = {
  // 订单状态
  orderStatus: [
    { label: '全部', value: null },
    { label: '待支付', value: 1 },
    { label: '已支付', value: 2 },
  ]
}

export default {
  namespaced: true,
  state
}