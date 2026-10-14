(function (root) {
  'use strict';
  const limits = {
    principal: { min: 0, max: 1000000000, label: 'Initial investment' },
    monthly: { min: 0, max: 1000000, label: 'Monthly contribution' },
    years: { min: 0, max: 100, label: 'Years to grow' },
    rate: { min: -100, max: 100, label: 'Annual return' }
  };

  function hasCentPrecision(value) {
    const [coefficient, exponent = '0'] = String(value).split('e');
    const decimals = (coefficient.split('.')[1] || '').length;
    return decimals - Number(exponent) <= 2;
  }

  function validate(values) {
    const errors = {};
    for (const [key, rule] of Object.entries(limits)) {
      const raw = values[key];
      const value = typeof raw === 'number' ? raw :
        typeof raw === 'string' && raw.trim() !== '' ? Number(raw) : NaN;
      if (!Number.isFinite(value)) errors[key] = `Enter a number for ${rule.label.toLowerCase()}.`;
      else if (value < rule.min || value > rule.max) errors[key] = `${rule.label} must be between ${rule.min.toLocaleString('en-US')} and ${rule.max.toLocaleString('en-US')}.`;
      else if (key === 'years' && !Number.isInteger(value)) errors[key] = 'Enter a whole number of years.';
      else if (key !== 'years' && !hasCentPrecision(value)) errors[key] = 'Use no more than two decimal places.';
    }
    return errors;
  }

  function calculate(values) {
    const errors = validate(values);
    if (Object.keys(errors).length) throw new RangeError(Object.values(errors)[0]);
    const { principal, monthly, years, rate } = Object.fromEntries(
      Object.keys(limits).map(key => [key, Number(values[key])])
    );
    const months = years * 12;
    let futureValue = principal;
    for (let month = 0; month < months; month++) {
      futureValue = futureValue * (1 + rate / 1200) + monthly;
      if (!Number.isFinite(futureValue) || futureValue > Number.MAX_SAFE_INTEGER / 100) {
        throw new RangeError('This projection is too large to display reliably. Reduce the amount, rate, or duration.');
      }
    }
    const contributions = principal + monthly * months;
    return { futureValue, contributions, growth: futureValue - contributions };
  }
  const api = { calculate, validate };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.InvestmentCalculator = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
