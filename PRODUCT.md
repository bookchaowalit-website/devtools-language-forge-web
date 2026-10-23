# Language Forge — Product truth

> Inferred from the code and copy (no user interview). Checked against the portfolio card claims review
> (`portfolio-site-web/docs/audits/CARD-CLAIMS-REVIEW-2026-10.md`, row `language-forge`, evidence Prototype) on
> 2026-10-23.

## What it is

A client-only practice desk over four hard-coded, illustrative Thai/English phrases.

## Who it is for

A portfolio visitor or curious learner who wants to see a calm, focused single-phrase practice UI.

## What works today

1. Phrase bank: choose any of the four phrases to open its Thai script, romanisation, part of speech, meaning and
   example line.
2. Answer one multiple-choice prompt per phrase. "Check phrase" stays disabled until an option is picked; feedback
   says whether it was right and names the meaning when it was not.
3. "Next phrase" moves on and wraps to the first; "Reset session" goes back to phrase 01. The session line shows how
   far through the set you are.
4. Front-end and server errors go to Sentry (errors only, personal data stripped) when `NEXT_PUBLIC_SENTRY_DSN` is set.

## What does not work (and must not be claimed)

- No live translation, audio or pronunciation scoring, no spaced repetition, streaks, lessons or course.
- The "SESSION / 08 MIN" label and the Look / Choose / Use stage list are fixed copy, not tracked progress.
- No account, storage or sync; nothing survives a reload. No API route.

## Live URL and deploy state

- Live: https://language.bookchaowalit.com (HTTP 200 on 2026-10-23).
- The Vercel project `bookchaowalit-language-forge-frontend` is linked to this repository
  (`bookchaowalit-website/devtools-language-forge-web`, branch `main`), so each push to `main` deploys to production.
  Last production deploy before this work: 2026-10-23, commit bf2ceef (Git, READY).
- `NEXT_PUBLIC_SENTRY_DSN` is set on the Vercel project (Sentry project `devtools-language-forge-web`, org
  `personal-yu0`).

## Boundaries

- Browser-only, no server data. The only outbound call is a Sentry error report, when the DSN is set.
