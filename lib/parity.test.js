const { AhoCorasick } = require('./index')
// Recorded from the 0.1.8 legacy-ABI release binaries on Node 22 (real city/airport names,
// overlaps, unicode). `expected` is darwin/linux arm64. `expectedX64` is linux-x64 (production)
// where it differs: aho-corasick 0.7's x86 SIMD prefilter can report a lower pattern index for the
// same span (28 cases). 0.1.9 reproduces each platform's 0.1.8 output exactly.
const cases = require('./__fixtures__/parity-0.1.8.json')

test('find_iter output matches the 0.1.8 build on every recorded case', () => {
  const mismatches = cases.filter(({ tokens, query, expected, expectedX64 }) => {
    const want = process.arch === 'x64' && expectedX64 ? expectedX64 : expected
    return JSON.stringify(new AhoCorasick(tokens).find_iter(query)) !== JSON.stringify(want)
  })
  expect(cases.length).toBeGreaterThan(6000)
  expect(mismatches).toEqual([])
})
