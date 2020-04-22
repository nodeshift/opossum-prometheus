# Prometheus Metrics for Opossum Circuit Breaker

[![CircleCI](https://circleci.com/gh/nodeshift/opossum-prometheus.svg?style=svg)](https://circleci.com/gh/nodeshift/opossum-prometheus)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/6dcbcd9e5a6649faafb5b00ceeecb4db)](https://www.codacy.com/app/nodeshift/opossum-prometheus?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=nodeshift/opossum-prometheus&amp;utm_campaign=Badge_Grade)
[![Codacy Badge](https://api.codacy.com/project/badge/Coverage/6dcbcd9e5a6649faafb5b00ceeecb4db)](https://www.codacy.com/app/nodeshift/opossum-prometheus?utm_source=github.com&utm_medium=referral&utm_content=nodeshift/opossum-prometheus&utm_campaign=Badge_Coverage)
[![dependencies Status](https://david-dm.org/nodeshift/opossum-prometheus/status.svg)](https://david-dm.org/nodeshift/opossum-prometheus)
[![Known Vulnerabilities](https://snyk.io/test/npm/opossum-prometheus/badge.svg)](https://snyk.io/test/npm/opossum-prometheus) [![Greenkeeper badge](https://badges.greenkeeper.io/nodeshift/opossum-prometheus.svg)](https://greenkeeper.io/)

This module provides [Prometheus](https://prometheus.io/) metrics for
[opossum](https://github.com/nodeshift/opossum) circuit breakers. To use
it with your circuit breakers, just pass them in to the `PrometheusMetrics`
constructor.

For each circuit breaker, the metrics are:

  * a `prometheus counter` for each event name
  * a `prometheus summary` for the events `success`, `failed` execution time.

Example:

```js
  const CircuitBreaker = require('opossum');
  const PrometheusMetrics = require('opossum-prometheus');

  // create a couple of circuit breakers
  const c1 = new CircuitBreaker(someFunction);
  const c2 = new CircuitBreaker(someOtherfunction);

  // Provide them to the constructor
  const prometheus = new PrometheusMetrics({ circuits: [c1, c2] });

  //...
  // Provide other circuit breaker later
  const c3 = new CircuitBreaker(someOtherfunction3);
  prometheus.add([C3]);
  
  // Write metrics to the console
  console.log(prometheus.metrics);
```

This module would typically be used in an application that can provide
an endpoint for the Prometheus server to monitor.

The `prometheusRegistry` constructor parameter allows you to provide an existing
[prom-client](https://github.com/siimon/prom-client) registry.
The metrics about the circuit will be added to the provided registry instead
of the global registry.
The [default metrics](https://github.com/siimon/prom-client#default-metrics)
will not be added to the provided registry.

```js
const CircuitBreaker = require('opossum');
const PrometheusMetrics = require('opossum-prometheus');
const { Registry } = require('prom-client');

// Create a registry
const registry = new Registry();

// create a circuit
const circuit = new CircuitBreaker(functionThatMightFail);
const metrics = new PrometheusMetrics({ circuits: [circuit], registry: registry })
```

## Options
The `PrometheusMetrics` constructor takes an options object as detailed below.

```js
const options = {};
new PrometheusMetrics(options)
```

|Name      |Description                                               |Default                                                                                                |
|----------|----------------------------------------------------------|-------------------------------------------------------------------------------------------------------|
|`circuits`|A list or individual circuit breaker to create metrics for|No circuits                                                                                            |
|`registry`|An existing registry to use for prometheus metrics        |`undefined` - The default prometheus registry will be used and default system metrics will be collected|
