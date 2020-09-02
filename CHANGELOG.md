# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

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
