'use strict';

const client = require('prom-client');

// The current tests has circuit names like:
// 'circuit one' (with blank space) and others like
// 3beb8f49-62c0-46e0-b458-dcd4a62d0f48.
// So to avoid "Error: Invalid metric name" we are changing the
// circuit name to pass the tests.
// More details:
// https://prometheus.io/docs/concepts/data_model/#metric-names-and-labels

class PrometheusMetrics {
  constructor (options = {}) {
    this._registry = options.registry || client.register;
    this._metricPrefix = options.metricPrefix || ``;
    this._client = client;
    this._options = options;
    this._counter = new this._client.Counter({
      name: `${this._metricPrefix}circuit`,
      help: `A count of all circuit' events`,
      registers: [this._registry],
      labelNames: ['name', 'event']
    });

    if (this.exposePerformanceMetrics()) {
      this._summary = new this._client.Summary({
        name: `${this._metricPrefix}circuit_perf`,
        help: `A summary of all circuit's events`,
        registers: [this._registry],
        labelNames: ['name', 'event']
      });
    }

    if (!options.registry) {
      this._client.collectDefaultMetrics({
        prefix: `${this._metricPrefix}opossum_`,
        register: this._registry
      });
    }

    if (options.circuits) {
      this.add(options.circuits);
    }
  }

  exposePerformanceMetrics () {
    return this._options === undefined ||
      this._options.exposePerformanceMetrics === undefined ||
      this._options.exposePerformanceMetrics;
  }

  add (circuits) {
    if (!circuits) {
      return;
    }
    circuits = Array.isArray(circuits) ? circuits : [circuits];

    circuits.forEach(circuit => {
      for (const eventName of circuit.eventNames()) {
        circuit.on(eventName, _ => {
          this._counter.labels(circuit.name, eventName).inc();
        });

        if (this.exposePerformanceMetrics() &&
          (eventName === 'success' || eventName === 'failure')) {
          // not the timeout event because runtime == timeout
          circuit.on(eventName, (result, runTime) => {
            this._summary.labels(circuit.name, eventName).observe(runTime);
          });
        }
      }
    });
  }

  clear () {
    this._registry.clear();
  }

  metrics () {
    return this._registry.metrics();
  }

  get client () {
    return this._client;
  }
}

module.exports = PrometheusMetrics;
