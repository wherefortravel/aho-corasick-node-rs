const { AhoCorasick } = require('./index')

test('AhoCorasick test', () => {
  const ac = new AhoCorasick(['let', 'it', 'be'])
  const matches = ac.find_iter('let it be be not found')
  expect(matches.length).toBe(4)

  expect(matches[0]).toEqual([ 0, 0, 3 ])
  expect(matches[1]).toEqual([ 1, 4, 6 ])
  expect(matches[2]).toEqual([ 2, 7, 9 ])
  expect(matches[3]).toEqual([ 2, 10, 12 ])

})