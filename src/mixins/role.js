export default {
  data() {
    return {
      orderStatus: null,
      range: {
        startTime: '',
        endTime: ''
      },
      keyword: ''
    }
  },
  methods: {
    // formSearch回调
    callbackSelect(args) {
      this.orderStatus = args
      this.getTableList()
    },
    callbackDate(args) {
      for(let key in args) {
        this.range[key] = args[key]
      }
      this.getTableList()
      
    },
    callbackKeyword(args) {
      this.keyword = args
      this.getTableList()
    },
    handleChange(val) {
      console.log(val, 'keyword');
    }

  }
}