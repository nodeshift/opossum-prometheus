'use strict';

const client = require('prom-client');

// The current tests has circuit names like:
// 'circuit one' (with blank space) and others like
// 3beb8f49-62c0-46e0-b458-dcd4a62d0f48.
// So to avoid "Error: Invalid metric name" we are changing the
// circuit name to pass the tests.
// More details:
// https://prometheus.io/docs/concepts/data_model/#metric-names-and-labels
function normalizePrefix (prefixName) {
  return `circuit_${prefixName.replace(/[ |-]/g, '_')}`;
}

class PrometheusMetrics {
  constructor (circuits, registry) {
    if (circuits instanceof client.Registry) {
      registry = circuits;
      circuits = undefined;
    }

    this._registry = registry || client.register;
    this._client = client;
    this.counters = [];
    this.summaries = [];

    if (!registry) {
      this.interval = this._client
        .collectDefaultMetrics({ prefix: 'opossum_', timeout: 5000 });
    }

    if (circuits) {
      this.add(circuits);
    }
  }

  add (circuits) {
    if (!circuits) {
      return;
    }
    circuits = Array.isArray(circuits) ? circuits : [circuits];
    let prefix;
    circuits.forEach(circuit => {
      prefix = normalizePrefix(circuit.name);
      const counter = new this._client.Counter({
        name: `${prefix}`,
        help: `A count of the ${circuit.name} circuit' events`,
        registers: [this._registry],
        labelNames: ['event']
      });
      this.counters.push(counter);

      const summary = new this._client.Summary({
        name: `${prefix}_perf`,
        help: `A summary of the ${circuit.name} circuit's events`,
        registers: [this._registry],
        labelNames: ['event']
      });
      this.summaries.push(summary);

      for (const eventName of circuit.eventNames()) {
        circuit.on(eventName, _ => {
          counter.labels(eventName).inc();
        });

        if (eventName === 'success' || eventName === 'failure') {
          // not the timeout event because runtime == timeout
          circuit.on(eventName, (result, runTime) => {
            summary.labels(eventName).observe(runTime);
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
