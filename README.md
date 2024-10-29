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

There are a number of releases packages that are to be built and applied to the release.

The following steps need to be done for each of the platforms we are using. Please see [https://github.com/wherefortravel/aho-corasick-node-rs/releases][Releases].

1. Make sure that you have the correct node version selected - `nvm use [current node version]`
2. Run `npm i -g yarn`
3. Run `yarn`
4. Run `yarn run build:release`
5. Run `yarn run upload-binary`

We need to make sure that the `native/index.node` file is of type **ELF**. If it is Mach-O there is a problem and the run will not work in the container.

You can run the steps above using different platforms.

```shell
docker run --rm -it --entrypoint "" --platform=linux/arm64 -v ./:/node-rs node:22.8 /bin/bash
```

Use docker containers with required platform settings to build and output required release packages.

## Bumping Version and Creating Release
With each new change, make sure to bump the package version. Please follow semantic versioning with regards to major, minor and patch version due to changes, updates or breaking changes. See [https://semver.org/][Semantic Versioning].

1. bump the package version
2. build and public the version
3. follow the build and deploy above
4. create a release based on that version
5. upload all the relevant platform build versions
