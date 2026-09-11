# QA Practice Repo — Playwright + Copilot + CI/CD

A personal sandbox for practicing the full loop: write a test with Copilot's
help, push it, watch CI run it, and experience the merge-request/review
flow — all for free, using a public demo site as the target app.

## Setup

1. Install [Node.js](https://nodejs.org) (LTS version) if you don't have it.
2. Clone or download this folder, then from inside it run:
   ```bash
   npm install
   npx playwright install --with-deps
   ```
3. Run the tests locally:
   ```bash
   npm test
   ```
4. View the HTML report after a run:
   ```bash
   npm run report
   ```

## Getting this onto GitHub (so CI actually runs)

1. Create a new **personal** GitHub repo (separate from any work account).
2. Push this folder to it:
   ```bash
   git init
   git add .
   git commit -m "Initial practice repo setup"
   git branch -M main
   git remote add origin <your-repo-url>
   git push -u origin main
   ```
3. Go to the **Actions** tab on GitHub — you should see the "Playwright Tests"
   workflow run automatically. This is your CI pipeline, free, using GitHub's
   hosted runners.

## A practice checklist (mirrors the Josh & Hari workflow)

- [ ] Create a branch: `git checkout -b add-filter-test`
- [ ] Open Copilot Chat and ask it to draft a new test (see the prompt
      suggestion at the bottom of `tests/todo.spec.ts`)
- [ ] Review what Copilot generates — check locator choices, check the
      assertion actually verifies something meaningful, watch for hard
      waits (`waitForTimeout`) and replace them with auto-retrying assertions
- [ ] Commit, push, open a Pull Request against your own `main`
- [ ] Watch the GitHub Actions check run automatically on the PR
- [ ] Merge once it's green
- [ ] **Deliberately break a test** (e.g. change a locator to something wrong),
      push, and watch CI go red — then fix it and watch it recover.
      This is the "Hari triaging a red pipeline" muscle from earlier.
- [ ] After a few tests exist, try asking Copilot's Agent Mode to
      "refactor these tests to use a shared Page Object class"

## What this setup does and doesn't cover

**Covered:** writing tests with Copilot, CI running automatically on push/PR,
reviewing generated code, red/green pipeline feedback loop.

**Not covered (needs a real org/production environment):** code review from
another human, canary/gradual rollout deployment, MCP governance/allowlists,
production health-check-triggered rollback.

## Target site

Tests run against Playwright's own public demo app:
https://demo.playwright.dev/todomvc — safe to hit repeatedly, no auth needed,
no real data involved.
