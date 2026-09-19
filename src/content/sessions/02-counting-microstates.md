---
title: Counting microstates by hand
description:
  A system small enough to list completely, until the statistical argument
  for entropy is something you counted rather than something you read.
week: 5
date: 2026-09-02
teachers:
  - idris-fenn
spec:
  - you have enumerated, by hand, every microstate of a system small enough to list completely
  - you can say which macrostate has the most microstates, and why that makes it the one you would actually find the system in
  - you can explain entropy's statistical basis using only the counts you produced, without using "disorder" as the explanation
related:
  - lectures/week-05
---

Week 5 argued that entropy is about counting: how many microscopic arrangements are compatible with a given large-scale description. This session is where you do the counting, on paper, for a system small enough that nothing has to be taken on trust.

## Before the session

Nothing to prepare beyond pen and paper — the counting happens in the room.

## In the session

Take four coins, or four particles distributed between the left and right half of a box — the physics is the same either way. List every distinct arrangement: which coins are heads, which particles are on the left. There are sixteen of them in total, and you write out all sixteen.

Now group those sixteen arrangements by macrostate: how many heads, or how many particles on the left. One arrangement puts all four on the left. Four arrangements put three on the left and one on the right. Six arrangements split two and two. Four put one on the left and three on the right. One puts all four on the right.

Nobody has to tell you that "two and two" is the macrostate you would actually find the system in if you looked. You counted it: six ways to get there, against a single way to get all four crowded onto one side. Scale the particle count up — from four to four hundred to four times ten to the twenty-third — and that six-to-one advantage becomes so overwhelming that the lopsided macrostates never turn up in practice, without anything about the underlying physics having changed.

## Afterwards

Keep your tally sheet. It is the entire statistical argument for entropy, run once, by hand, for a system small enough that no formula was needed to see it.
