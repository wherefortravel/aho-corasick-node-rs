const native = require('../prebuilt/index.node')

// Same public API as 0.1.8: `new AhoCorasick(patterns).find_iter(haystack)`.
class AhoCorasick {
  constructor(patterns) {
    this._automaton = native.build(patterns)
  }

  find_iter(haystack) {
    return native.findIter(this._automaton, haystack)
  }
}

module.exports = { AhoCorasick }
