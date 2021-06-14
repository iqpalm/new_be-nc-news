const { mappedTopics } = require('../db/utils/data-manipulation');
describe('topics ', () => {
  test('when given an empty object in an array will return a nested array with 2 undefined values', () => {
    expect(mappedTopics([{}])).toEqual([[undefined, undefined]]);
  });
  test('When given an array with an object containing slug and description keys, return their values inside the nested array', () => {
    expect(mappedTopics([{ slug: 'test1', description: 'test2' }])).toEqual([
      ['test1', 'test2']
    ]);
  });
  test('mappedTopics does not mutate the origional', () => {
    const input = [{ test: 'test', test1: 'test1' }];
    const unmutated = [{ test: 'test', test1: 'test1' }];
    const output = mappedTopics(input);
    expect(input).toEqual(unmutated);
    expect(output).not.toBe(input);
  });
});
