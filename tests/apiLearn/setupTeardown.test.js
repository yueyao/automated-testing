/*
 * @Descripttion: 挂载 卸载
 * @Author: Chen Xue
 * @Date: 2021-04-08 15:53:30
 * @LastEditors: Chen Xue
 * @LastEditTime: 2021-04-08 16:09:54
 */
const initializeCityDatabase = () => true;
const clearCityDatabase = () => true;

// 在每个测试之前调用它
beforeEach(() => {
  initializeCityDatabase();
});

// 在每个测试之后调用它
afterEach(() => {
  clearCityDatabase();
});

const isCity = () => true;
test('city database has Vienna', () => {
  expect(isCity('Vienna')).toBeTruthy();
});

test('city database has San Juan', () => {
  expect(isCity('San Juan')).toBeTruthy();
});

// 异步
beforeEach(() => {
  return initializeCityDatabase();
});
afterAll(() => {
  return clearCityDatabase();
});

// 块内 before after
describe('matching cities to foods', () => {
  // Applies only to tests in this describe block
  beforeEach(() => {
    return initializeFoodDatabase();
  });

  test('Vienna <3 sausage', () => {
    expect(isValidCityFoodPair('Vienna', 'Wiener Schnitzel')).toBe(true);
  });

  test('San Juan <3 plantains', () => {
    expect(isValidCityFoodPair('San Juan', 'Mofongo')).toBe(true);
  });
});

beforeAll(() => console.log('1 - beforeAll'));
afterAll(() => console.log('1 - afterAll'));
beforeEach(() => console.log('1 - beforeEach'));
afterEach(() => console.log('1 - afterEach'));
test('', () => console.log('1 - test'));
describe('Scoped / Nested block', () => {
  beforeAll(() => console.log('2 - beforeAll'));
  afterAll(() => console.log('2 - afterAll'));
  beforeEach(() => console.log('2 - beforeEach'));
  afterEach(() => console.log('2 - afterEach'));
  test('', () => console.log('2 - test'));
});

// 描述块和测试块的执行顺序
// Jest在执行任何实际测试之前执行测试文件中的所有描述处理程序。
// 这是另一个在before*和after*处理程序中而不是在describe块中进行设置和拆卸的原因。
// 一旦描述块完成，默认情况下Jest将按收集阶段遇到的顺序串行运行所有测试，等待每个测试完成并进行整理，然后继续。
describe('outer', () => {
  console.log('describe outer-a');

  describe('describe inner 1', () => {
    console.log('describe inner 1');
    test('test 1', () => {
      console.log('test for describe inner 1');
      expect(true).toEqual(true);
    });
  });

  console.log('describe outer-b');

  test('test 1', () => {
    console.log('test for describe outer');
    expect(true).toEqual(true);
  });

  describe('describe inner 2', () => {
    console.log('describe inner 2');
    test('test for describe inner 2', () => {
      console.log('test for describe inner 2');
      expect(false).toEqual(false);
    });
  });

  console.log('describe outer-c');
});

// test.only 只执行文件内此test
test.only('this will be the only test that runs', () => {
  expect(true).toBe(true);
});

test('this test will not run', () => {
  expect('A').toBe('A');
});
