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

## Build and Deployment

1. Make sure that you have the correct node version selected - `nvm use`
2. Run `npm i -g yarn`
3. Run `yarn`

For building use the build actions in the package.json.

For deployment run `yarn run upload-binary`. This will build the release but does not actually place the binary anywhere remote. You will be provided a path of the tar.gz file. Upload this file to Github release _manually_. 
