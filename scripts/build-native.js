// Builds prebuilt/index.node from source with cargo (fallback when no prebuilt binary matches).
const { execFileSync } = require('child_process')
const fs = require('fs')
const path = require('path')

const nativeDir = path.join(__dirname, '..', 'native')
const profile = process.argv.includes('--debug') ? 'debug' : 'release'
// Not CARGO_BUILD_TARGET: cargo reads that itself and rejects an empty value.
const target = process.env.RUST_TARGET || undefined

const cargoArgs = ['build', '--manifest-path', path.join(nativeDir, 'Cargo.toml')]
if (profile === 'release') cargoArgs.push('--release')
if (target) cargoArgs.push('--target', target)
execFileSync('cargo', cargoArgs, { stdio: 'inherit' })

const libName = { darwin: 'libaho_corasick_node_rs.dylib', linux: 'libaho_corasick_node_rs.so' }[
  process.platform
]
if (!libName) throw new Error(`Unsupported platform: ${process.platform}`)

const outDir = path.join(nativeDir, 'target', ...(target ? [target] : []), profile)
const prebuiltDir = path.join(__dirname, '..', 'prebuilt')
fs.mkdirSync(prebuiltDir, { recursive: true })
fs.copyFileSync(path.join(outDir, libName), path.join(prebuiltDir, 'index.node'))
console.log(`Built prebuilt/index.node (${profile}${target ? `, ${target}` : ''})`)
