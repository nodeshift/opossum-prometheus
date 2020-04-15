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
  constructor (circuits, options = {}) {
    var registry = options.registry;
    if (circuits instanceof client.Registry) {
      registry = circuits;
      circuits = undefined;
    }

    this._registry = registry || client.register;
    this._options = options;
    this._client = client;
    this._counter = new this._client.Counter({
      name: `circuit`,
      help: `A count of all circuit' events`,
      registers: [this._registry],
      labelNames: ['name', 'event']
    });

    if (this.exposePerformanceMetrics()) {
      this._summary = new this._client.Summary({
        name: `circuit_perf`,
        help: `A summary of all circuit's events`,
        registers: [this._registry],
        labelNames: ['name', 'event']
      });
    }

    if (!registry) {
      this.interval = this._client
        .collectDefaultMetrics({ prefix: 'opossum_', timeout: 5000 });
    }

    if (circuits) {
      this.add(circuits);
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
    clearInterval(this.interval);
    this._registry.clear();
  }

  get metrics () {
    return this._registry.metrics();
  }

  get client () {
    return this._client;
  }
}

module.exports = PrometheusMetrics;
