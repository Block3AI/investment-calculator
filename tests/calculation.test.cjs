const { test } = require('node:test');
const assert = require('node:assert/strict');
const { calculate, validate } = require('../calculation.js');
const base = { principal: 1000, monthly: 100, years: 1, rate: 12 };
function near(actual, expected) { assert.ok(Math.abs(actual - expected) < 0.000001, `${actual} != ${expected}`); }
test('known one-year monthly projection and accounting identity', () => {
  const result = calculate(base);
  near(result.futureValue, 2395.075331451667);
  assert.equal(result.contributions, 2200);
  near(result.growth, 195.075331451667);
  near(result.contributions + result.growth, result.futureValue);
});
test('ten-year projection agrees with independent annuity formula', () => {
  const rate = .06 / 12, months = 120;
  const expected = 5000 * (1 + rate) ** months + 250 * (((1 + rate) ** months - 1) / rate);
  near(calculate({ principal: 5000, monthly: 250, years: 10, rate: 6 }).futureValue, expected);
});
test('zero return, zero duration and all-zero inputs', () => {
  assert.deepEqual(calculate({ ...base, rate: 0 }), { futureValue: 2200, contributions: 2200, growth: 0 });
  assert.deepEqual(calculate({ ...base, years: 0 }), { futureValue: 1000, contributions: 1000, growth: 0 });
  assert.deepEqual(calculate({ principal: 0, monthly: 0, years: 100, rate: 0 }), { futureValue: 0, contributions: 0, growth: 0 });
});
test('no contributions and negative nominal return', () => {
  near(calculate({ ...base, monthly: 0 }).futureValue, 1000 * 1.01 ** 12);
  const result = calculate({ ...base, monthly: 0, rate: -12 });
  near(result.futureValue, 1000 * .99 ** 12);
  assert.ok(result.growth < 0);
  near(calculate({ ...base, monthly: 0, rate: -100 }).futureValue, 1000 * (1 - 1 / 12) ** 12);
});
test('accepts cents, decimal rates, numeric strings and boundary values', () => {
  assert.deepEqual(validate({ principal: '1000.50', monthly: '10.25', years: '1', rate: '5.25' }), {});
  assert.deepEqual(validate({ principal: 1e9, monthly: 1e6, years: 100, rate: 100 }), {});
});
test('rejects missing, malformed and nonfinite inputs', () => {
  for (const value of ['', ' ', '123abc', NaN, Infinity, -Infinity, null, undefined, true]) {
    assert.ok(validate({ ...base, principal: value }).principal);
    assert.throws(() => calculate({ ...base, principal: value }), RangeError);
  }
});
test('rejects invalid ranges and precision', () => {
  for (const [key, values] of Object.entries({ principal: [-1, 1e9 + 1, .001], monthly: [-1, 1e6 + 1, .001], years: [-1, 101, 1.5], rate: [-101, 101, .001] })) {
    for (const value of values) assert.ok(validate({ ...base, [key]: value })[key]);
  }
});
test('rejects projections beyond reliable cent precision', () => {
  assert.throws(() => calculate({ principal: 1e9, monthly: 1e6, years: 100, rate: 100 }), /too large/);
});
test('rejects tiny fractions of a cent, including exponential notation', () => {
  for (const key of ['principal', 'monthly', 'rate']) {
    for (const value of [0.0000001, '1e-20', '1.0000001', '0.01000001']) {
      assert.ok(validate({ ...base, [key]: value })[key]);
      assert.throws(() => calculate({ ...base, [key]: value }), RangeError);
    }
  }
});
test('accepts representable cent amounts without floating-point false positives', () => {
  for (const value of [0.29, 1.13, '1.2300', '1e-2', 999999.99]) {
    assert.deepEqual(validate({ ...base, principal: value, monthly: value }), {});
  }
});
