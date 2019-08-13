# Prometheus Metrics for Opossum Circuit Breaker

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