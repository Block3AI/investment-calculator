# Standalone repository and deployment

These are preparation instructions. Repository creation, pushing, DNS changes, and deployment require explicit approval before execution.

## Prepared project boundary

Use this `investment-calculator/` directory as the source of the standalone project. Copy its contents, including `.gitignore`, into a new empty destination outside the TheLab checkout when creating the independent repository. Do not initialize a nested repository inside TheLab, move the original calculator, or copy TheLab's `.git` directory.

The standalone source consists of the four runtime files listed below, `tests/`, `README.md`, `AGENTS.md`, `.gitignore`, `BACKLOG.md`, and this document. No parent-folder dependencies or installation step are needed.

Before the copy, record `git status --short -- basic-investment-calculator` from TheLab. Afterward, repeat that check and confirm `git diff HEAD -- basic-investment-calculator` is empty. Preserve any pre-existing learning-project edits as well as its tracked history.

## Preserve project history

The local TheLab history contains two commits affecting `basic-investment-calculator/`: `8065d22` and `ece4353`. History extraction is practical. After approval to create the independent repository:

1. Make a separate temporary clone of TheLab. Do not perform history operations in the learning checkout.
2. In that clone run `git subtree split --prefix=basic-investment-calculator -b calculator-history`.
3. Create a separate `investment-calculator` repository from that extracted branch. The directory contents become the repository root. Extracted commit hashes differ from the originals.
4. Overlay these prepared files, including dotfiles and tests, without copying any `.git` directory. Review the diff and commit improvements separately from the extracted baseline.
5. Inspect the resulting files and extracted history for private material before publishing. Create `Block3AI/investment-calculator` and push only with approval.

A fresh initial commit with source attribution is a simpler alternative if history extraction is not desired. Neither approach requires removing or overwriting TheLab's original calculator.

## Static hosting contract

No build command, framework preset, environment variables, database, or backend is required. The public document root must contain:

- `index.html`
- `style.css`
- `index.js`
- `calculation.js`

Publish only those four files. Keep `.git`, local configuration, tests, and contributor documentation outside the public document root. For hosts with Git integration, configure a publishing step or an explicit public-file allowlist appropriate to the chosen provider. Do not upload the whole TheLab checkout.

To prepare a local upload directory, run from the standalone project root:

```sh
node --test tests/*.test.cjs
mkdir -p dist
cp index.html style.css index.js calculation.js dist/
```

Confirm `dist/` contains exactly those four files before uploading its contents. The ignored `dist/` folder is staging output, not additional application source. Preview it with `python3 -m http.server 8000 --bind 127.0.0.1 --directory dist` and visit http://127.0.0.1:8000. Stop the server with Ctrl+C.

## Domain and release checklist

1. Choose the hosting provider and prepare its static-site settings before requesting deployment approval.
2. After approval, publish the reviewed files to the assigned site/document root.
3. Obtain the provider's exact custom-domain DNS target. Configure `calculator.block3ai.com` only after approval; do not guess record values or change unrelated domain records.
4. Enable/verify HTTPS and redirect HTTP to HTTPS using the provider's supported settings.
5. Verify the live URL and all three assets return successfully, the console has no errors, and the known $1,000 / $100 / 1 year / 12% example returns $2,395.08.
6. Verify invalid inputs, reset, keyboard navigation, mobile layout, and result updates on the deployed site.
7. Record the published commit, date, host configuration, and live verification results. Retain the prior published files or release for rollback.

Provider-specific settings and DNS values remain pending hosting selection and authorization. A local test pass does not establish deployment success.

## Rollback

Before publishing an update, retain a copy of the currently published four files and record its source commit. If the new release fails verification, restore that complete set or select the previous release in the host, then repeat the live workflow checks. Do not repair a failed deployment by changing TheLab's original learning calculator.
