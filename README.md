# Prometheus Metrics for Opossum Circuit Breaker

[![CircleCI](https://circleci.com/gh/nodeshift/opossum-prometheus.svg?style=svg)](https://circleci.com/gh/nodeshift/opossum-prometheus)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/6dcbcd9e5a6649faafb5b00ceeecb4db)](https://www.codacy.com/app/nodeshift/opossum-prometheus?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=nodeshift/opossum-prometheus&amp;utm_campaign=Badge_Grade)
[![Codacy Badge](https://api.codacy.com/project/badge/Coverage/6dcbcd9e5a6649faafb5b00ceeecb4db)](https://www.codacy.com/app/nodeshift/opossum-prometheus?utm_source=github.com&utm_medium=referral&utm_content=nodeshift/opossum-prometheus&utm_campaign=Badge_Coverage)
[![dependencies Status](https://david-dm.org/nodeshift/opossum-prometheus/status.svg)](https://david-dm.org/nodeshift/opossum-prometheus)
[![Known Vulnerabilities](https://snyk.io/test/npm/opossum-prometheus/badge.svg)](https://snyk.io/test/npm/opossum-prometheus)

This module provides [Prometheus](https://prometheus.io/) metrics for
[opossum](https://github.com/nodeshift/opossum) circuit breakers. To use
it with your circuit breakers, just pass them in to the `PrometheusMetrics`
constructor.

Example:

```js
  const circuitBreaker = require('opossum');
  const PrometheusMetrics = require('opossum-prometheus');

  // create a couple of circuit breakers
  const c1 = circuitBreaker(someFunction);
  const c2 = circuitBreaker(someOtherfunction);

  // Provide them to the constructor
  const prometheus = new PrometheusMetrics([c1, c2]);

  // Write metrics to the console
  console.log(prometheus.metrics);
```

This module would typically be used in an application that can provide
an endpoint for the Prometheus server to monitor.
