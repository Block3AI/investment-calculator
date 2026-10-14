# Block3AI Investment Calculator

A lightweight general investment calculator built with HTML, CSS, and vanilla JavaScript. Estimate future value, total contributions, and growth or loss. All calculations happen in your browser; the application sends no input data to a server.

## Standalone project

Project name: `investment-calculator`. This folder is the complete project root: it can be copied into a separate checkout without any other TheLab files. It uses no parent-directory assets, packages, or configuration.

The original `TheLab/basic-investment-calculator/` remains unchanged as a record of JavaScript learning. Continue product development in this project only.

See [DEPLOYMENT.md](DEPLOYMENT.md) for repository preparation, the four-file publishing contract, release verification, and rollback. See [AGENTS.md](AGENTS.md) for contributor guidance.

## Run locally

Open `index.html` in a browser. No installation, build step, or runtime dependencies are required. Alternatively, run `python3 -m http.server 8000` from this directory and open http://localhost:8000.

## Assumptions

- Currency: US dollars (USD), formatted with the `en-US` locale.
- The entered annual rate is **nominal**, not an effective annual yield.
- Monthly rate = annual percentage / 100 / 12.
- Starting from the initial investment, each month updates the balance as `balance * (1 + monthlyRate) + monthlyContribution`.
- Contributions are deposited at the **end** of each month; returns and deposits remain constant.
- Total contributions = initial investment + monthly contribution × 12 × years.
- Estimated growth/loss = future value − total contributions.
- No intermediate currency rounding; displayed amounts round to two decimal places. JavaScript uses floating-point arithmetic, so this is an estimate, not ledger accounting.
- Negative rates model steady monthly declines. −100% nominal annual return means −8.333…% monthly, not total loss in a year.
- Taxes, fees, inflation, and market volatility are not modeled.

Example: $1,000 initially plus $100 at each month-end, for one year at 12% nominal annual return, produces **$2,395.08**, including **$2,200.00** contributed and **$195.08** estimated growth.

## Input limits

Initial investment: $0–$1 billion. Monthly contribution: $0–$1 million. Duration: whole years from 0–100. Nominal annual return: −100% to 100%. Money and rate inputs allow at most two decimal places. Zero years returns the initial investment without contributions or growth. These are technical bounds, not suggested investment outcomes. Projections exceeding `Number.MAX_SAFE_INTEGER / 100` are rejected to avoid unreliable cent-scale output.

## Tests

With Node.js 24 installed, run:

```sh
node --test tests/*.test.cjs
```

Tests cover reference projections, zero values, negative rates, contributions, validation, and excessive projections. Node is needed only for development tests, not hosting. Manually verify keyboard focus, error announcements, reset, input edits invalidating results, and layouts at 320px, 768px, and desktop widths.

## Files

- `index.html`, `style.css`, `index.js`: accessible form, responsive layout, and UI behavior.
- `calculation.js`: independent validation and projection functions.
- `tests/`: automated calculation tests.
- `DEPLOYMENT.md`: standalone repository and static-hosting workflow.
- `AGENTS.md`: contributor constraints.

## Origin and release status

Derived from `basic-investment-calculator/` in https://github.com/Block3AI/TheLab. The original remains a JavaScript learning record and must not be overwritten. Relevant original commits: `8065d22` (calculator added) and `ece4353` (backlog added). This is the independent project checkout, starting with a fresh commit attributed to the original learning project. The original history remains in TheLab. The application has not been deployed.

Repository: https://github.com/Block3AI/investment-calculator. Planned deployment URL: https://calculator.block3ai.com; hosting and DNS configuration remain pending.

Projections are illustrative estimates, not guarantees or financial advice. Actual returns vary. Taxes, fees, and inflation are not included.
