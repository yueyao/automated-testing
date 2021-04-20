/*
 * @Descripttion: 测试的测试
 * @Author: Chen Xue
 * @Date: 2021-04-01 16:19:44
 * @LastEditors: Chen Xue
 * @LastEditTime: 2021-04-08 17:59:11
 */
const sum = require('./sum');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
