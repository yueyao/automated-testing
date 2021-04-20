/*
 * @Descripttion: Mock Test
 * @Author: Chen Xue
 * @Date: 2021-04-08 16:14:10
 * @LastEditors: Chen Xue
 * @LastEditTime: 2021-04-08 16:32:55
 */

test('object assignment', () => {
  const data = { one: 1 };
  data.two = 2;
  expect(data).toEqual({ one: 1, two: 2 });
});

// mock function
function forEachFn(items, callback) {
  for (let index = 0; index < items.length; index += 1) {
    callback(items[index]);
  }
}
test('mockCallback', () => {
  const mockCallback = jest.fn((x) => 42 + x);
  forEachFn([0, 1], mockCallback);

  // The mock function is called twice
  expect(mockCallback.mock.calls.length).toBe(2);

  // The first argument of the first call to the function was 0
  expect(mockCallback.mock.calls[0][0]).toBe(0);

  // The first argument of the second call to the function was 1
  expect(mockCallback.mock.calls[1][0]).toBe(1);

  // The return value of the first call to the function was 42
  expect(mockCallback.mock.results[0].value).toBe(42);
});

// 所有模拟函数都有这个特殊的.mock属性，关于如何调用函数和函数返回内容的数据都保存在这个属性中。
// mock属性也会在每次调用时跟踪this的值，因此也可以检查this:
const MyMock = jest.fn();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const a = new MyMock();
const b = {};
const bound = MyMock.bind(b);
bound();

console.log(MyMock.mock.instances);
// > [ <a>, <b> ]
// The function was called exactly once
// expect(someMockFunction.mock.calls.length).toBe(1);

// The first arg of the first call to the function was 'first arg'
// expect(someMockFunction.mock.calls[0][0]).toBe('first arg');

// The second arg of the first call to the function was 'second arg'
// expect(someMockFunction.mock.calls[0][1]).toBe('second arg');

// The return value of the first call to the function was 'return value'
// expect(someMockFunction.mock.results[0].value).toBe('return value');

// This function was instantiated exactly twice
// expect(someMockFunction.mock.instances.length).toBe(2);

// The object returned by the first instantiation of this function
// had a `name` property whose value was set to 'test'
// expect(someMockFunction.mock.instances[0].name).toEqual('test');

// 在测试期间将测试值注入到代码中
MyMock.mockReturnValueOnce(10).mockReturnValueOnce('x').mockReturnValue(true);

console.log(MyMock(), MyMock(), MyMock(), MyMock());
