'use strict';

const test = require('tape');
const CircuitBreaker = require('opossum');
const PrometheusMetrics = require('../');
const client = require('prom-client');
const { Registry } = client;

/**
 * Returns a promise that resolves if the parameter
 * 'x' evaluates to >= 0. Otherwise the returned promise fails.
 */

/* eslint prefer-promise-reject-errors: "off" */
function passFail (x) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      (x > 0) ? resolve(x) : reject(`Error: ${x} is < 0`);
    }, 100);
  });
}

test('The factory function accept no parameter', t => {
  t.plan(1);

  const prometheus = new PrometheusMetrics();
  t.ok(prometheus);
  prometheus.clear();

  t.end();
});

test('The factory function takes an object instead of just an Array', t => {
  t.plan(2);
  const c1 = new CircuitBreaker(passFail, { name: 'fred' });
  const prometheus = new PrometheusMetrics(c1);
  t.equal(c1.name, 'fred');
  t.ok(/circuit_fred_/.test(prometheus.metrics));
  prometheus.clear();
  t.end();
});

test('The factory function provides access to metrics for all circuits', t => {
  t.plan(4);
  const c1 = new CircuitBreaker(passFail, { name: 'fred' });
  const c2 = new CircuitBreaker(passFail, { name: 'bob' });
  const prometheus = new PrometheusMetrics([c1, c2]);
  t.equal(c1.name, 'fred');
  t.equal(c2.name, 'bob');
  t.ok(/circuit_fred_/.test(prometheus.metrics));
  t.ok(/circuit_bob_/.test(prometheus.metrics));
  prometheus.clear();
  t.end();
});

test('The factory function uses a custom prom-client registry', t => {
  t.plan(6);
  const registry = new Registry();
  const c1 = new CircuitBreaker(passFail, {
    name: 'fred'
  });
  const c2 = new CircuitBreaker(passFail, {
    name: 'bob'
  });
  const prometheus = new PrometheusMetrics([c1, c2], registry);
  t.equal(c1.name, 'fred');
  t.equal(c2.name, 'bob');
  t.ok(/circuit_fred_/.test(registry.metrics()));
  t.ok(/circuit_bob_/.test(registry.metrics()));
  t.ok(/circuit_fred_/.test(prometheus.metrics));
  t.ok(/circuit_bob_/.test(prometheus.metrics));
  prometheus.clear();
  t.end();
});

test('The add function takes an object instead of just an Array', t => {
  t.plan(2);
  const c1 = new CircuitBreaker(passFail, { name: 'fred' });
  const prometheus = new PrometheusMetrics();
  prometheus.add(c1);
  t.equal(c1.name, 'fred');
  t.ok(/circuit_fred_/.test(prometheus.metrics));
  prometheus.clear();
  t.end();
});

test('The add function provides access to metrics for all circuits', t => {
  t.plan(6);
  const c1 = new CircuitBreaker(passFail, { name: 'fred' });
  const c2 = new CircuitBreaker(passFail, { name: 'bob' });
  const c3 = new CircuitBreaker(passFail, { name: 'foo' });
  const prometheus = new PrometheusMetrics([c1]);
  prometheus.add([c2, c3]);
  t.equal(c1.name, 'fred');
  t.equal(c2.name, 'bob');
  t.equal(c3.name, 'foo');
  t.ok(/circuit_fred_/.test(prometheus.metrics));
  t.ok(/circuit_bob_/.test(prometheus.metrics));
  t.ok(/circuit_foo_/.test(prometheus.metrics));
  prometheus.clear();
  t.end();
});

test('The add function takes an object instead of just an Array', t => {
  t.plan(1);
  const prometheus = new PrometheusMetrics();
  prometheus.add();
  t.notOk(/circuit_/.test(prometheus.metrics));
  prometheus.clear();
  t.end();
});

test('Circuit fire/success/failure are counted', t => {
  const circuit = new CircuitBreaker(passFail);
  const fire = /circuit_passFail_fire 2/;
  const success = /circuit_passFail_success 1/;
  const failure = /circuit_passFail_failure 1/;
  const prometheus = new PrometheusMetrics([circuit]);
  t.plan(3);
  circuit.fire(1)
    .then(_ => circuit.fire(-1))
    .catch(_ => {
      const metrics = prometheus.metrics;
      t.ok(fire.test(metrics), fire);
      t.ok(success.test(metrics), success);
      t.ok(failure.test(metrics), failure);
      prometheus.clear();
      t.end();
    });
});

test('Metrics are enabled for all circuit events', t => {
  const circuit = new CircuitBreaker(passFail);
  const prometheus = new PrometheusMetrics([circuit]);
  const metrics = prometheus.metrics;
  t.plan(circuit.eventNames().length);
  for (const name of circuit.eventNames()) {
    const match = new RegExp(`circuit_passFail_${name}`);
    t.ok(match.test(metrics), name);
  }
  prometheus.clear();
  t.end();
});

test('Default prometheus metrics are enabled', t => {
  const circuit = new CircuitBreaker(passFail);
  const prometheus = new PrometheusMetrics([circuit]);
  const metrics = prometheus.metrics;
  const names = [
    'process_cpu_seconds_total',
    'process_open_fds',
    'process_max_fds',
    'process_virtual_memory_bytes',
    'process_resident_memory_bytes',
    'process_heap_bytes',
    'process_start_time_seconds'
  ];
  t.plan(names.length);
  for (const name of names) {
    const match = new RegExp(`opossum_${name}`);
    t.ok(match.test(metrics), name);
  }
  prometheus.clear();
  t.end();
});

test('Should not add default metrics to custom registry', t => {
  const registry = new Registry();
  const circuit = new CircuitBreaker(passFail);
  const prometheus = new PrometheusMetrics([circuit], registry);
  const metrics = prometheus.metrics;
  const names = [
    'process_cpu_seconds_total',
    'process_open_fds',
    'process_max_fds',
    'process_virtual_memory_bytes',
    'process_resident_memory_bytes',
    'process_heap_bytes',
    'process_start_time_seconds'
  ];
  t.plan(names.length);
  for (const name of names) {
    const match = new RegExp(`opossum_${name}`);
    t.notOk(match.test(metrics), name);
  }
  prometheus.clear();
  t.end();
});

test('Default prometheus metrics are enabled without circuit', t => {
  const registry = new Registry();
  const prometheus = new PrometheusMetrics(registry);
  const metrics = prometheus.metrics;
  const names = [
    'nodejs_eventloop_lag',
    'nodejs_active_handles',
    'nodejs_active_requests',
    'nodejs_heap_size_total_bytes',
    'nodejs_heap_size_used_bytes',
    'nodejs_external_memory_bytes',
    'nodejs_heap_space_size_total_bytes',
    'nodejs_heap_space_size_used_bytes',
    'nodejs_heap_space_size_available_bytes',
    'nodejs_version_info',
    'process_cpu_seconds_total',
    'process_open_fds',
    'process_max_fds',
    'process_virtual_memory_bytes',
    'process_resident_memory_bytes',
    'process_heap_bytes',
    'process_start_time_seconds'
  ];
  t.plan(names.length);
  for (const name of names) {
    const match = new RegExp(`opossum_${name}`);
    t.ok(match.test(metrics), name);
  }
  prometheus.clear();
  t.end();
});

test('Node.js specific metrics are enabled', t => {
  const circuit = new CircuitBreaker(passFail);
  const prometheus = new PrometheusMetrics([circuit]);
  const metrics = prometheus.metrics;
  const names = [
    'nodejs_eventloop_lag',
    'nodejs_active_handles',
    'nodejs_active_requests',
    'nodejs_heap_size_total_bytes',
    'nodejs_heap_size_used_bytes',
    'nodejs_external_memory_bytes',
    'nodejs_heap_space_size_total_bytes',
    'nodejs_heap_space_size_used_bytes',
    'nodejs_heap_space_size_available_bytes',
    'nodejs_version_info'
  ];
  t.plan(names.length);
  for (const name of names) {
    const match = new RegExp(`opossum_${name}`);
    t.ok(match.test(metrics), name);
  }
  prometheus.clear();
  t.end();
});
