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
  t.teardown(() => prometheus.clear());
  t.ok(prometheus);

  t.end();
});

test('The factory function takes an object instead of just an Array',
  async t => {
    t.plan(3);
    const c1 = new CircuitBreaker(passFail, { name: 'fred' });
    const prometheus = new PrometheusMetrics({ circuits: c1 });
    t.teardown(() => prometheus.clear());
    await c1.fire(1);
    const metrics = await prometheus.metrics();
    t.equal(c1.name, 'fred');
    t.ok(/circuit.*fred/.test(metrics));
    t.ok(/circuit_perf.*fred/.test(metrics));
    t.end();
  });

test('The factory function provides access to metrics for all circuits',
  async t => {
    t.plan(6);
    const c1 = new CircuitBreaker(passFail, { name: 'fred' });
    const c2 = new CircuitBreaker(passFail, { name: 'bob' });
    const prometheus = new PrometheusMetrics({ circuits: [c1, c2] });
    t.teardown(() => prometheus.clear());
    await c1.fire(1);
    await c2.fire(1);
    const metrics = await prometheus.metrics();
    t.equal(c1.name, 'fred');
    t.equal(c2.name, 'bob');
    t.ok(/circuit.*fred/.test(metrics));
    t.ok(/circuit_perf.*fred/.test(metrics));
    t.ok(/circuit.*bob/.test(metrics));
    t.ok(/circuit_perf.*bob/.test(metrics));
    t.end();
  });

test('The factory function uses a custom prom-client registry', async t => {
  t.plan(10);
  const registry = new Registry();
  const c1 = new CircuitBreaker(passFail, {
    name: 'fred'
  });
  const c2 = new CircuitBreaker(passFail, {
    name: 'bob'
  });
  const prometheus = new PrometheusMetrics({
    circuits: [c1, c2],
    registry
  });
  t.teardown(() => prometheus.clear());
  await c1.fire(1);
  await c2.fire(1);
  const rMetrics = await registry.metrics();
  const pMetrics = await prometheus.metrics();
  t.equal(c1.name, 'fred');
  t.equal(c2.name, 'bob');
  t.ok(/circuit.*fred/.test(rMetrics));
  t.ok(/circuit_perf.*fred/.test(rMetrics));
  t.ok(/circuit.*bob/.test(rMetrics));
  t.ok(/circuit_perf.*bob/.test(rMetrics));
  t.ok(/circuit.*bob/.test(pMetrics));
  t.ok(/circuit_perf.*fred/.test(pMetrics));
  t.ok(/circuit.*bob/.test(pMetrics));
  t.ok(/circuit_perf.*bob/.test(pMetrics));
  t.end();
});

test('The add function takes an object instead of just an Array', async t => {
  t.plan(3);
  const c1 = new CircuitBreaker(passFail, { name: 'fred' });
  const prometheus = new PrometheusMetrics();
  t.teardown(() => prometheus.clear());
  prometheus.add(c1);
  await c1.fire(1);
  const metrics = await prometheus.metrics();
  t.equal(c1.name, 'fred');
  t.ok(/circuit.*fred.*/.test(metrics));
  t.ok(/circuit_perf.*fred.*/.test(metrics));
  t.end();
});

test('The add function provides access to metrics for all circuits',
  async t => {
    t.plan(9);
    const c1 = new CircuitBreaker(passFail, { name: 'fred' });
    const c2 = new CircuitBreaker(passFail, { name: 'bob' });
    const c3 = new CircuitBreaker(passFail, { name: 'foo' });
    const prometheus = new PrometheusMetrics({ circuits: [c1] });
    t.teardown(() => prometheus.clear());
    prometheus.add([c2, c3]);
    await c1.fire(1);
    await c2.fire(1);
    await c3.fire(1);
    const metrics = await prometheus.metrics();
    t.equal(c1.name, 'fred');
    t.equal(c2.name, 'bob');
    t.equal(c3.name, 'foo');
    t.ok(/circuit.*fred/.test(metrics));
    t.ok(/circuit_perf.*fred/.test(metrics));
    t.ok(/circuit.*bob/.test(metrics));
    t.ok(/circuit_perf.*bob/.test(metrics));
    t.ok(/circuit.*foo/.test(metrics));
    t.ok(/circuit_perf.*foo/.test(metrics));
    t.end();
  });

test('The add function called without parameter do nothing', async t => {
  t.plan(1);
  const prometheus = new PrometheusMetrics();
  t.teardown(() => prometheus.clear());
  prometheus.add();
  t.ok(/circuit/.test(await prometheus.metrics()));
  t.end();
});

test('Circuit fire/success/failure are counted', async t => {
  const circuit = new CircuitBreaker(passFail);
  const fire = /circuit\{name="passFail",event="fire"\} 2/;
  const success = /circuit\{name="passFail",event="success"\} 1/;
  const failure = /circuit\{name="passFail",event="failure"\} 1/;
  const prometheus = new PrometheusMetrics({ circuits: [circuit] });
  t.teardown(() => prometheus.clear());
  t.plan(3);
  try {
    await circuit.fire(1);
    await circuit.fire(-1);
  } catch (e) {
    const metrics = await prometheus.metrics();
    t.ok(fire.test(metrics), fire);
    t.ok(success.test(metrics), success);
    t.ok(failure.test(metrics), failure);
    t.end();
  }
});

test('Metrics are enabled for all circuit events', async t => {
  const circuit = new CircuitBreaker(passFail);
  circuit.on = (event, callback) => {
    callback(null, 1);
  };
  const prometheus = new PrometheusMetrics({ circuits: [circuit] });
  t.teardown(() => prometheus.clear());
  const metrics = await prometheus.metrics();
  t.plan(circuit.eventNames().length);
  for (const name of circuit.eventNames()) {
    const match = new RegExp(`circuit{name="passFail",event="${name}"}`);
    t.ok(match.test(metrics), name);
  }
  t.end();
});

test('Default prometheus metrics are enabled', async t => {
  const circuit = new CircuitBreaker(passFail);
  const prometheus = new PrometheusMetrics({ circuits: [circuit] });
  t.teardown(() => prometheus.clear());
  const metrics = await prometheus.metrics();
  const names = [
    'process_cpu_seconds_total',
    'process_resident_memory_bytes',
    'process_start_time_seconds'
  ];
  if (process.platform === 'linux') {
    names.concat([
      'process_virtual_memory_bytes',
      'process_heap_bytes',
      'process_open_fds',
      'process_max_fds'
    ]);
  }
  t.plan(names.length);
  for (const name of names) {
    const match = new RegExp(`opossum_${name}`);
    t.ok(match.test(metrics), name);
  }
  t.end();
});

test('Should not add default metrics to custom registry', async t => {
  const registry = new Registry();
  const circuit = new CircuitBreaker(passFail);
  const prometheus = new PrometheusMetrics({
    circuits: [circuit],
    registry
  });
  t.teardown(() => prometheus.clear());
  const metrics = await prometheus.metrics();
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
  t.end();
});

test('Default prometheus metrics are enabled without circuit', async t => {
  const registry = new Registry();
  const prometheus = new PrometheusMetrics({ registry });
  t.teardown(() => prometheus.clear());
  const metrics = await prometheus.metrics();
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
    t.notOk(match.test(metrics), name);
  }
  t.end();
});

test('Node.js specific metrics are enabled', async t => {
  const circuit = new CircuitBreaker(passFail);
  const prometheus = new PrometheusMetrics({ circuits: [circuit] });
  t.teardown(() => prometheus.clear());
  const metrics = await prometheus.metrics();
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
  t.end();
});

test('Performance metrics are not created when disabled',
  async t => {
    t.plan(3);
    const c1 = new CircuitBreaker(passFail, { name: 'fred' });
    const prometheus = new PrometheusMetrics({
      circuits: [c1],
      exposePerformanceMetrics: false
    });
    t.teardown(() => prometheus.clear());
    await c1.fire(1);
    const metrics = await prometheus.metrics();
    t.equal(c1.name, 'fred');
    t.ok(/circuit.*fred/.test(metrics));
    t.notOk(/circuit_perf.*fred/.test(metrics));
    t.end();
  });

test('Performance metrics are created when not configured in options',
  async t => {
    t.plan(3);
    const c1 = new CircuitBreaker(passFail, { name: 'fred' });
    const prometheus = new PrometheusMetrics({ circuits: [c1] });
    t.teardown(() => prometheus.clear());
    await c1.fire(1);
    const metrics = await prometheus.metrics();
    t.equal(c1.name, 'fred');
    t.ok(/circuit.*fred/.test(metrics));
    t.ok(/circuit_perf.*fred/.test(metrics));
    t.end();
  });

test('Performance metrics are created when enabled in options',
  async t => {
    t.plan(3);
    const c1 = new CircuitBreaker(passFail, { name: 'fred' });
    const prometheus = new PrometheusMetrics({
      circuits: [c1],
      exposePerformanceMetrics: true
    });
    t.teardown(() => prometheus.clear());
    await c1.fire(1);
    const metrics = await prometheus.metrics();
    t.equal(c1.name, 'fred');
    t.ok(/circuit.*fred/.test(metrics));
    t.ok(/circuit_perf.*fred/.test(metrics));
    t.end();
  });

test('The factory function provides metric prefix and it append to metric name',
  async t => {
    t.plan(6);
    const c1 = new CircuitBreaker(passFail, { name: 'fred' });
    const c2 = new CircuitBreaker(passFail, { name: 'bob' });
    const prometheus = new PrometheusMetrics({
      circuits: [c1, c2],
      metricPrefix: 'some_prefix_'
    });
    t.teardown(() => prometheus.clear());
    await c1.fire(1);
    await c2.fire(1);
    const metrics = await prometheus.metrics();
    t.equal(c1.name, 'fred');
    t.equal(c2.name, 'bob');
    t.ok(/some_prefix_circuit.*fred/.test(metrics));
    t.ok(/some_prefix_circuit_perf.*fred/.test(metrics));
    t.ok(/some_prefix_circuit.*bob/.test(metrics));
    t.ok(/some_prefix_circuit_perf.*bob/.test(metrics));
    t.end();
  });
