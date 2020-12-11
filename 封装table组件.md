table组件封装

| 参数         | 说明                       | 类型    | 默认值 | 必填项 |
| ------------ | -------------------------- | ------- | ------ | ------ |
| columns      | 表格列的配置描述，表头部分 | Array[] | -      | 是     |
| tableOptions | table参数扩展属性          | Object  | -      | 否     |
| tableHandle  | 操作列表按钮               | Object  | -      | 否     |
| tableData    | 数据数组                   | Array[] | -      | 是     |
| pagination   | 分页的配置项               | Object  | -      | 否     |
| loading      | 页面是否加载中             | Boolean | false  | 否     |

columns选项

| 参数        | 说明                      | 类型             | 默认值 | 必填项 |
| ----------- | ------------------------- | ---------------- | ------ | ------ |
| label       | 列头显示文字              | String           | -      | 是     |
| prop        | 列数据在数据项中对应的Key | String           | -      | 是     |
| width       | 列宽度                    | Number           | -      | 否     |
| render      | 数据格式化                | Function(row) {} | -      | 否     |
| slotContent | 自定义列(插槽)            | String           | slot   | 否     |
| slotName    | 自定义列名(插槽)          | String           | -      | 否     |

tableOptions选项

| 参数       | 说明           | 类型    | 默认值                   | 必填项 |
| ---------- | -------------- | ------- | ------------------------ | ------ |
| index      | 序列号         | Boolean | false                    | 否     |
| selection  | 复选框显示     | Boolean | false                    | 否     |
| labelIndex | 序列号文本显示 | String  | -                        | 否     |
| slotBtn    | 自定义操作按钮 | Boolean | false                    | 否     |
| pageExtend | 分页布局       | Object  | total, prev, pager, next | 否     |
| btnStyle | 操作列表按钮样式       | Object  | - | 否     |

tableHandle选项

| 参数    | 说明         | 类型   | 默认值 | 必填项 |
| ------- | ------------ | ------ | ------ | ------ |
| label   | 列头显示文字 | String | -      | 是     |
| options | 按钮选项     | Array  | -      | 是     |

options选项

| 参数   | 说明         | 类型             | 默认值 | 必填项 |
| ------ | ------------ | ---------------- | ------ | ------ |
| label  | 按钮文字     | String           | -      | 是     |
| method | 按钮回调事件 | Function(row) {} | -      | 是     |

pagination选项

| 参数        | 说明   | 类型   | 默认值 | 必填项 |
| ----------- | ------ | ------ | ------ | ------ |
| currentPage | 当前页 | Number | 1      | 是     |
| pageSize    | 页大小 | Number | 10     | 是     |
| total       | 总条数 | Number | 0      | 是     |

