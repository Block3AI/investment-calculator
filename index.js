'use strict';
const form = document.querySelector('#calculator-form');
const results = document.querySelector('#results');
const status = document.querySelector('#status');
const keys = ['principal', 'monthly', 'years', 'rate'];
const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
function clearErrors() {
  for (const key of keys) {
    document.getElementById(`${key}-error`).textContent = '';
    document.getElementById(key).removeAttribute('aria-invalid');
  }
}
form.addEventListener('submit', event => {
  event.preventDefault();
  clearErrors();
  results.hidden = true;
  const values = Object.fromEntries(keys.map(key => [key, form.elements[key].value]));
  const errors = InvestmentCalculator.validate(values);
  for (const [key, message] of Object.entries(errors)) {
    document.getElementById(`${key}-error`).textContent = message;
    document.getElementById(key).setAttribute('aria-invalid', 'true');
  }
  if (Object.keys(errors).length) {
    status.textContent = 'Please correct the highlighted inputs.';
    document.getElementById(Object.keys(errors)[0]).focus();
    return;
  }
  try {
    const projection = InvestmentCalculator.calculate(values);
    document.querySelector('#future-value').textContent = currency.format(projection.futureValue);
    document.querySelector('#contributions').textContent = currency.format(projection.contributions);
    document.querySelector('#growth').textContent = currency.format(projection.growth);
    document.querySelector('#result-context').textContent = `After ${Number(values.years)} years at ${Number(values.rate)}% nominal annual return, compounded monthly.`;
    results.hidden = false;
    status.textContent = `Projection calculated. Estimated future value: ${currency.format(projection.futureValue)}. Total contributions: ${currency.format(projection.contributions)}. Estimated growth or loss: ${currency.format(projection.growth)}.`;
  } catch (error) {
    status.textContent = error instanceof RangeError ? error.message : 'Unable to calculate. Check your inputs and try again.';
  }
});
form.addEventListener('input', () => {
  const wasVisible = !results.hidden;
  results.hidden = true;
  clearErrors();
  if (wasVisible) status.textContent = 'Inputs changed. Calculate again to update your projection.';
  else status.textContent = '';
});
form.addEventListener('reset', () => {
  clearErrors();
  results.hidden = true;
  status.textContent = 'Calculator reset.';
  form.elements.principal.focus();
});
