# Contributor guidance

- Treat this directory as the standalone `investment-calculator` project root. Keep assets and configuration self-contained; do not depend on sibling TheLab projects or parent-directory files.
- Keep changes scoped to this project. Never move, delete, or overwrite the original learning calculator when preparing a release or independent checkout.

- Keep this a general investment calculator using HTML, CSS, and vanilla JavaScript. Do not introduce a framework, backend, runtime dependency, tracking, or external data service without an explicit requirement.
- Preserve the original `TheLab/basic-investment-calculator/` files and history.
- Keep calculation logic independently testable in `calculation.js`. Use nominal annual rate / 12 and end-of-month contributions. Change assumptions only with approval and update UI, documentation, and reference tests together.
- Validate finite inputs, ranges, precision, and projected result size. Never render NaN or Infinity as money.
- Keep labels, keyboard navigation, focus visibility, inline errors, live announcements, and mobile layouts accessible.
- Run `node --test tests/*.test.cjs` after calculation or validation changes. Check form submission, reset, changed inputs, invalid input, and narrow-screen overflow after UI changes.
- Distinguish automated calculation checks, browser checks, and live deployment checks in reports.
- Do not create repositories, push, alter DNS, or deploy without explicit user approval. Prepare reviewable source and instructions first.
- Never commit credentials, private configuration, local server logs, or dependency folders.
- Update README.md and DEPLOYMENT.md when setup, file layout, publishing steps, or release assumptions change. Publish only the four runtime files listed in DEPLOYMENT.md.
