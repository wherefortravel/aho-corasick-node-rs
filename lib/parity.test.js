const { AhoCorasick } = require('./index')
// Recorded from the 0.1.8 legacy-ABI build on Node 22 (real city/airport names, overlaps, unicode).
const cases = require('./__fixtures__/parity-0.1.8.json')

test('find_iter output matches the 0.1.8 build on every recorded case', () => {
  const mismatches = cases.filter(
    ({ tokens, query, expected }) =>
      JSON.stringify(new AhoCorasick(tokens).find_iter(query)) !== JSON.stringify(expected),
  )
  expect(cases.length).toBeGreaterThan(6000)
  expect(mismatches).toEqual([])
})
