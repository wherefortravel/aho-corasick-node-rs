# aho-corasick-node-rs

[https://en.wikipedia.org/wiki/Aho%E2%80%93Corasick_algorithm][Aho-Corasick] Rust library Node.js bindings

## How do I use it?

Here is an example:

```javascript
import { AhoCorasick } from 'aho-corasick-node-rs'

const ac = new AhoCorasick(['let', 'it', 'be']) // allocate new trie

const matches = ac.find_iter('let it be be not found') // query for terms

console.log(matches)

```



[]: https://en.wikipedia.org/wiki/Aho%E2%80%93Corasick_algorithm