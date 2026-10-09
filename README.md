# aho-corasick-node-rs

Works on any Node.js version with Node-API 6 (Node >= 10.20), including Node 22 and 24: the binary is
built against Node-API, so there is one prebuilt binary per platform rather than one per Node ABI.

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

Binaries are built and attached to releases by `.github/workflows/build.yml`:

- Every pull request builds `napi-{linux,darwin}-{x64,arm64}.tar.gz` and tests each one on Node 22
  and Node 24, including `lib/parity.test.js`, which replays 6000+ recorded inputs against the
  output of the 0.1.8 build.
- Pushing a tag equal to the `package.json` version (e.g. `0.1.9`) does the same and then creates
  the GitHub release with the four tarballs. `node-pre-gyp` downloads them from
  `https://github.com/wherefortravel/aho-corasick-node-rs/releases/download/<version>/` at install.

To release:

1. Bump `version` in `package.json` and `native/Cargo.toml` (semver), merge to `master`.
2. Tag the merge commit with the version (no `v` prefix) and push the tag.
3. When the release exists, publish the npm package to the internal registry.

Local development needs a Rust toolchain (`rustup`): `yarn build` (debug) or `yarn build:release`
writes `prebuilt/index.node`; `yarn test` runs the tests. If no prebuilt binary matches at install
time, the install script falls back to building from source with `cargo`.
