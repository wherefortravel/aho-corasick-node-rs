# aho-corasick-node-rs

Current Node Version: 22.8

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

There are a number of packages that are to be built and applied to the release.

The following steps need to be done for each of the platforms we are using. Please see [https://github.com/wherefortravel/aho-corasick-node-rs/releases][Releases].

With each new change, make sure to bump the package version. Please follow semantic versioning with regards to major, minor and patch version due to changes, updates or breaking changes. See [https://semver.org/][Semantic Versioning].

1. bump the package version - ex. 0.1.6 to 0.1.7
2. run a container with the target platform
```
  docker run --rm -it --entrypoint "" --platform=linux/x86 -v ./:/node-rs node:22.8 /bin/bash
```
3. install rust
```
  curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```
4. navigate to the project - `cd /node-rs`
5. Run `rm native/index.node`
6. Run `yarn`
7. Run `yarn run build:release`
8. Run `yarn run upload-binary`

We need to make sure that the `native/index.node` file is of type **ELF**. If it is Mach-O there is a problem and the run will not work in the container.

You can run the steps above using different platforms.

```
docker run --rm -it --entrypoint "" --platform=linux/x86 -v ./:/node-rs node:22.8 /bin/bash
docker run --rm -it --entrypoint "" --platform=linux/arm64 -v ./:/node-rs node:22.8 /bin/bash
```
