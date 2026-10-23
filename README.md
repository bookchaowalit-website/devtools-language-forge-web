# Language Forge

A small Thai/English phrase practice desk: four authored phrases, each with Thai script, romanisation, meaning, an
example line and one multiple-choice prompt. Pick a phrase, choose an answer, check it, move to the next one.
Illustrative content only, kept in the code.

Live: https://language.bookchaowalit.com (Vercel deploys each push to `main`, see `PRODUCT.md`).

## What it does not do

- No live translation, audio, spaced repetition, streaks or course. No account. Nothing is saved.

## Run

```bash
npm ci
npm run dev
```

## Checks

```bash
npm test           # Vitest: practice logic, home page render, Sentry scrubbing
npm run lint
npm run typecheck
npm run build
```

CI (`.github/workflows/ci.yml`) runs the shared Node workflow (with a line-coverage gate) and the shared security
scan on every push and PR to `main`.

## Code map

- `lib/language-forge.ts`: the authored phrase bank plus `nextIndex`, `isCorrect`, `feedback` and `sessionProgress`
  (used by the page).
- `app/page.tsx`: the client practice desk.
- `lib/sentry.ts` + `instrumentation*.ts`: error reporting to Sentry, errors only, personal data stripped; off when
  `NEXT_PUBLIC_SENTRY_DSN` is unset.
