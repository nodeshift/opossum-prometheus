# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [0.5.0](https://github.com/nodeshift/opossum-prometheus/compare/v0.4.0...v0.5.0) (2025-06-10)


### ⚠ BREAKING CHANGES

* remove Node 18 support (#108)
* Bump supported node.js version (#91)

### Features

* add node 24 support ([#107](https://github.com/nodeshift/opossum-prometheus/issues/107)) ([f39e426](https://github.com/nodeshift/opossum-prometheus/commit/f39e426f5b047eb6a37d4c77f31c5e81ff79804f))
* Bump supported node.js version ([#91](https://github.com/nodeshift/opossum-prometheus/issues/91)) ([65886aa](https://github.com/nodeshift/opossum-prometheus/commit/65886aa4332a4f58143e061dfea301751c8ddd49))
* remove Node 18 support ([#108](https://github.com/nodeshift/opossum-prometheus/issues/108)) ([025d55f](https://github.com/nodeshift/opossum-prometheus/commit/025d55f6230ea495c2d581d0a2527196d2929d01))


### Bug Fixes

* upgrade opossum from 8.3.0 to 8.4.0 ([#96](https://github.com/nodeshift/opossum-prometheus/issues/96)) ([2dcebf3](https://github.com/nodeshift/opossum-prometheus/commit/2dcebf34ccd6fd01c987c27f1fbd4552295ecdbc))
* upgrade prom-client from 15.1.0 to 15.1.1 ([#80](https://github.com/nodeshift/opossum-prometheus/issues/80)) ([e29d378](https://github.com/nodeshift/opossum-prometheus/commit/e29d378a7ca5bad9e6aaf0cc0982bc74bdfc323e))

## [0.4.0](https://github.com/nodeshift/opossum-prometheus/compare/v0.3.0...v0.4.0) (2024-04-08)


### ⚠ BREAKING CHANGES

* Drop support for Node.js v14
Update prom-client to v15
metrics is now an async function
* drop Node.js 12

### Features

* support Node.js v20 ([#78](https://github.com/nodeshift/opossum-prometheus/issues/78)) ([1f3e050](https://github.com/nodeshift/opossum-prometheus/commit/1f3e0503c616a57b77eef8e8e31634e2ae79f598))
* upgrade opossum from 5.1.3 to 6.2.1 ([#62](https://github.com/nodeshift/opossum-prometheus/issues/62)) ([88e13d5](https://github.com/nodeshift/opossum-prometheus/commit/88e13d5a1e3f4a9cb87375e97c1be8f5742de522))
* using semistandard and greenkeeper badge removed ([bdfe980](https://github.com/nodeshift/opossum-prometheus/commit/bdfe9809dd46eac7d8cc4161ef2c21f4b5a1029f))


### Bug Fixes

* package.json & package-lock.json to reduce vulnerabilities ([#56](https://github.com/nodeshift/opossum-prometheus/issues/56)) ([5c57b1e](https://github.com/nodeshift/opossum-prometheus/commit/5c57b1e22a1147355c9cf983dcfc06ac4fd7cf7a))
* upgrade coveralls from 3.1.0 to 3.1.1 ([#51](https://github.com/nodeshift/opossum-prometheus/issues/51)) ([1bcbaae](https://github.com/nodeshift/opossum-prometheus/commit/1bcbaae923eea55c2e4b6159f2612c9890c54669))
* upgrade opossum from 5.0.0 to 5.0.1 ([#33](https://github.com/nodeshift/opossum-prometheus/issues/33)) ([e9e700a](https://github.com/nodeshift/opossum-prometheus/commit/e9e700ad77c7919c7de51234c3ce43ad5e26ee9f))
* upgrade opossum from 5.0.1 to 5.0.2 ([#36](https://github.com/nodeshift/opossum-prometheus/issues/36)) ([c45d4b1](https://github.com/nodeshift/opossum-prometheus/commit/c45d4b14970734474c78b31a6470a3073a79b3e7))
* upgrade opossum from 5.0.2 to 5.1.0 ([#38](https://github.com/nodeshift/opossum-prometheus/issues/38)) ([d3f509d](https://github.com/nodeshift/opossum-prometheus/commit/d3f509d313268548c6c5c362548c322d5abb673e))
* upgrade opossum from 5.1.0 to 5.1.1 ([#39](https://github.com/nodeshift/opossum-prometheus/issues/39)) ([ae9f69b](https://github.com/nodeshift/opossum-prometheus/commit/ae9f69b07f35ff07230ef15d7efa14fdbd272301))
* upgrade opossum from 5.1.1 to 5.1.2 ([#43](https://github.com/nodeshift/opossum-prometheus/issues/43)) ([f0c00fe](https://github.com/nodeshift/opossum-prometheus/commit/f0c00fe04518b100fc18f0be32fe7e6fd4cb530e))
* upgrade opossum from 5.1.2 to 5.1.3 ([#44](https://github.com/nodeshift/opossum-prometheus/issues/44)) ([78c826b](https://github.com/nodeshift/opossum-prometheus/commit/78c826b0b941f6a8a8dab142b2c27f3264b6f855))
* upgrade standard-version from 9.0.0 to 9.1.0 ([#40](https://github.com/nodeshift/opossum-prometheus/issues/40)) ([6c694ed](https://github.com/nodeshift/opossum-prometheus/commit/6c694eda67f0e7743c4dcf5001daa1f5955e6106))
* upgrade standard-version from 9.1.0 to 9.3.0 ([#49](https://github.com/nodeshift/opossum-prometheus/issues/49)) ([d29b608](https://github.com/nodeshift/opossum-prometheus/commit/d29b60878b76133bcda3be3d57328993b5c94441))
* upgrade tape from 5.0.1 to 5.1.0 ([#41](https://github.com/nodeshift/opossum-prometheus/issues/41)) ([c51f9d3](https://github.com/nodeshift/opossum-prometheus/commit/c51f9d3e8263b4f47cc7de0a3cd5009152c7ccd4))
* upgrade tape from 5.1.0 to 5.1.1 ([#42](https://github.com/nodeshift/opossum-prometheus/issues/42)) ([d45e86a](https://github.com/nodeshift/opossum-prometheus/commit/d45e86aa0b83d9b333f73f8f4407e43b16cd9452))
* upgrade tape from 5.1.1 to 5.2.2 ([#50](https://github.com/nodeshift/opossum-prometheus/issues/50)) ([ebeeed4](https://github.com/nodeshift/opossum-prometheus/commit/ebeeed431aa4589054d496616898a5241d39ce74))


* drop Node.js 12 ([b14eca3](https://github.com/nodeshift/opossum-prometheus/commit/b14eca32fc996d46f97b3055c295fb77e436b8fb))

## [0.3.0](https://github.com/lholmquist/opossum-prometheus/compare/v0.2.0...v0.3.0) (2020-09-02)


### Features

* Providing metric prefix for circuit metrics ([#32](https://github.com/lholmquist/opossum-prometheus/issues/32)) ([0d85a86](https://github.com/lholmquist/opossum-prometheus/commit/0d85a86a9f594c58f3f900cb98000e58a9eeb058))


### Bug Fixes

* upgrade standard-version from 8.0.1 to 8.0.2 ([#30](https://github.com/lholmquist/opossum-prometheus/issues/30)) ([e8edaa1](https://github.com/lholmquist/opossum-prometheus/commit/e8edaa11c2bd35908810477872519d6694fc4857))

## [0.2.0](https://github.com/lholmquist/opossum-prometheus/compare/v0.1.0...v0.2.0) (2020-04-23)


### ⚠ BREAKING CHANGES

* Options object is now used to configure custom registry and initial circuits

* docs: Updates and adds documentation for options object configuration

### Features

* adds option for performance metrics so they can be disabled, default is enabled ([#20](https://github.com/lholmquist/opossum-prometheus/issues/20)) ([2437eca](https://github.com/lholmquist/opossum-prometheus/commit/2437eca65e7e5d55d3685f213c24e589827d2899))
* Use options object for all configuration ([#19](https://github.com/lholmquist/opossum-prometheus/issues/19)) ([b353a59](https://github.com/lholmquist/opossum-prometheus/commit/b353a5907212a5eabae420ff4ef06c105f953d3f))


### Bug Fixes

* upgrade standard-version from 7.0.0 to 7.1.0 ([#17](https://github.com/lholmquist/opossum-prometheus/issues/17)) ([2b68517](https://github.com/lholmquist/opossum-prometheus/commit/2b68517ae6902837ff9d94cbcbab11621fba920d))
* upgrade tape from 4.11.0 to 4.13.2 ([#16](https://github.com/lholmquist/opossum-prometheus/issues/16)) ([6233d53](https://github.com/lholmquist/opossum-prometheus/commit/6233d53041727d8b44126b061a18cc411642bb34))

## [0.1.0](https://github.com/lholmquist/opossum-prometheus/compare/v0.0.4...v0.1.0) (2020-03-13)


### ⚠ BREAKING CHANGES

* Changes event metrics to use labels rather than seporate metrics
* Changes metrics to use labels for circuit name rather than seporate metrics

Co-authored-by: martlandh <HarryMartland@Rentalcars.com>

### Features

* Change event name to be a label ([#15](https://github.com/lholmquist/opossum-prometheus/issues/15)) ([075b033](https://github.com/lholmquist/opossum-prometheus/commit/075b033))

### [0.0.4](https://github.com/lholmquist/opossum-prometheus/compare/v0.0.3...v0.0.4) (2019-10-02)


### Features

* add stats (percentiles stats, reponse times) in Prometheus metrics ([#10](https://github.com/lholmquist/opossum-prometheus/issues/10)) ([712fa2d](https://github.com/lholmquist/opossum-prometheus/commit/712fa2d))

### [0.0.3](https://github.com/lholmquist/opossum-prometheus/compare/v0.0.2...v0.0.3) (2019-09-18)


### Features

* allow one circuit to be pass in without an array. ([#5](https://github.com/lholmquist/opossum-prometheus/issues/5)) ([02ca8f5](https://github.com/lholmquist/opossum-prometheus/commit/02ca8f5)), closes [#4](https://github.com/lholmquist/opossum-prometheus/issues/4)
* allow to add circuits dynamicaly ([#7](https://github.com/lholmquist/opossum-prometheus/issues/7)) ([afbaef2](https://github.com/lholmquist/opossum-prometheus/commit/afbaef2))

### 0.0.2 (2019-08-13)
