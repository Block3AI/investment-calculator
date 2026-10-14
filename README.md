# Investment Calculator

A simple investment calculator built with HTML, CSS, and vanilla JavaScript. Enter an initial investment, monthly contribution, duration, and annual return to estimate future value, total contributions, and growth or loss.

Website: [investmentcalculator.block3ai.com](https://investmentcalculator.block3ai.com)

## Getting started

Open `index.html` in your browser. No installation or build step is required. All calculations run locally in your browser.

## How it works

- Returns compound monthly using the nominal annual rate divided by 12.
- Contributions are added at the end of each month.
- The return rate and monthly contribution remain constant.
- Total contributions include the initial investment. Estimated growth or loss is the future value minus total contributions.
- Amounts are displayed in US dollars, rounded to two decimal places.

For example, $1,000 initially plus $100 per month for one year at a 12% nominal annual return produces an estimated **$2,395.08**: **$2,200.00** contributed and **$195.08** in growth.

## Tests

With Node.js 24 installed, run:

```sh
node --test tests/*.test.cjs
```

## Disclaimer

Projections are estimates, not guarantees or financial advice. Actual returns vary. Taxes, fees, inflation, and market volatility are not included.
