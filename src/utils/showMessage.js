import { Message } from 'element-ui';

// /**
//  *
//  * @param {状态码} code
//  * @param {提示类型} type
//  * @param {提示信息} message
//  */
/**
 *
 * showMessage({
 *  code: re.err
 * })
 */

const codeStatus = {
  0: '请求成功',
  1: '服务器繁忙，请稍后重试',
  2018: '暂无权限',
  3: '取消删除'
};
const types = ['success', 'error', 'warning', 'info'];

export function showMessage(code) {
  let tips = '';
  let type = '';
  for (const enumName of Object.keys(codeStatus)) {
    code === parseInt(enumName) && (tips = codeStatus[enumName]);
    type = types[code];
  }
  Message({
    message: tips,
    type: type,
  });
}

/**
 * 枚举定义工具
 * 示例：
 * const STATUS = createEnum({
 *     AUDIT_WAIT: [1, '审核中'],
 *     AUDIT_PASS: [2, '审核通过']
 * })
 * 获取枚举值：STATUS.AUDIT_WAIT
 * 获取枚举描述：STATUS.getDesc('AUDIT_WAIT')
 * 通过枚举值获取描述：STATUS.getDescFromValue(STATUS.WAIT)
 *
 */

// Object.keys(obj) ->返回字符串数组
export function createEnum(definition) {
  const strToValueMap = {};
  const numToDescMap = {};
  for (const enumName of Object.keys(definition)) {
    const [value, desc] = definition[enumName];
    strToValueMap[enumName] = value;
    numToDescMap[value] = desc;
    /**
     * strToValueMap = {
     *  AUDIT_WAIT: 1,
     *  AUDIT_PASS: 2
     * }
     * numToDescMap = {
     *  1: '审核中',
     *  2: '审核通过'
     * }
     */
  }

  return {
    ...strToValueMap,
    getDesc(enumName) {
      return (definition[enumName] && definition[enumName][1]) || '';
    },
    getDescFormValue(value) {
      return numToDescMap[value] || '';
    },
  };
}
