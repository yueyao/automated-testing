/*
 * @Descripttion: 异步测试
 * @Author: Chen Xue
 * @Date: 2021-04-02 11:35:38
 * @LastEditors: Chen Xue
 * @LastEditTime: 2021-04-08 14:41:09
 */

// 错误用法
// Jest测试在执行结束后就完成了。这意味着这个测试将不能正常工作:
// Don't do this!
// test('the data is peanut butter', () => {
//   function callback(data) {
//     expect(data).toBe('peanut butter');
//   }

//   fetchData(callback);
// });

// 有一种替代形式的测试可以修复这个问题。
// 使用一个名为done的参数，而不是将测试放在一个带空参数的函数中。
// Jest将等待done回调函数被调用，然后才能完成测试。

const fetchData = (fn) => {
  setTimeout(() => {
    fn('peanut butter');
  }, 1000);
};

test('the data is peanut butter', (done) => {
  function callback(data) {
    try {
      expect(data).toBe('peanut butter');
      done();
    } catch (error) {
      done(error);
    }
  }

  fetchData(callback);
});

// Promise
const fetchPromiseData = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve('peanut butter');
    }, 1000);
  });
test('the data is peanut butter', () => {
  return fetchPromiseData().then((data) => {
    expect(data).toBe('peanut butter');
  });
});

// Promiise catch
const fetchPromiseDataCatch = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      // eslint-disable-next-line prefer-promise-reject-errors
      reject('error');
    }, 1000);
  });
// 如果您希望promise被拒绝，请使用.catch方法。
// 确保添加expect断言，以验证调用了一定数量的断言。
// 否则，一个兑现的承诺就不会在测试中失败。
test('the fetch fails with an error', () => {
  expect.assertions(1);
  return fetchPromiseDataCatch().catch((e) => expect(e).toMatch('error'));
});

// .resolves
test('the data is peanut butter', () => {
  return expect(fetchPromiseData()).resolves.toBe('peanut butter');
});
// .rejects
test('the fetch fails with an error', () => {
  return expect(fetchPromiseDataCatch()).rejects.toMatch('error');
});

// Async/Await
test('the data is peanut butter', async () => {
  const data = await fetchPromiseData();
  expect(data).toBe('peanut butter');
});

test('the fetch fails with an error', async () => {
  expect.assertions(1);
  try {
    await fetchPromiseDataCatch();
  } catch (e) {
    expect(e).toMatch('error');
  }
});
