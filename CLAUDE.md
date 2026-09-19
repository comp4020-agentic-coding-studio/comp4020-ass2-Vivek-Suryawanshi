# Working on this repo

This is the course website for SLOP1849 The Universe Gets Stranger.
Read `docs/chain.md` before writing any course content. It is the
specification for the course, and I wrote it by hand.

## Rules

- Never invent a week's question, its physics, or its leftover. All twelve
  are fixed in `docs/chain.md`. If something seems missing, ask me — do not
  fill the gap.
- Every week page ends with the same two things: what this week explained,
  and what became stranger. The leftover must match what `docs/chain.md`
  says that week hands to the next one.
- No equations before Week 7. Weeks 1–6 can use numbers, estimates, graphs
  and comparisons, but no formalism. Week 7 is where maths arrives and the
  page should say why.
- Follow the Voice section of `docs/chain.md`. The banned phrases there are
  banned. Do not tell the reader something is fascinating.
- Do not write a week by summarising a textbook chapter. Each week starts
  from the concrete thing — the dark sky, a molecule in a box, two slits —
  before it names any abstraction.
- Where a popular explanation is too simple, say what it leaves out. Week 11
  must not claim Pauli exclusion alone is why you don't fall through the floor.

## Checks

`pnpm check` is broken on my machine (Windows: the theme runs
`execFile("npx", ...)` for pagefind, which can't resolve `npx.cmd`). Use
`pnpm typecheck ; pnpm build ; vitest run spec` locally and read the build
output down to `[build] ✓ Completed`. CI on Linux is the real signal.
- `dist/api/index.json` is emitted by the build pipeline, in the
  `astro:build:done` hook — not by a route under `src/pages`. It doesn't
  exist on my machine because that hook crashes on `npx` before it runs. It
  exists in CI. Don't describe this as a missing route or an infrastructure
  gap, and don't try to create an API route to fix it.