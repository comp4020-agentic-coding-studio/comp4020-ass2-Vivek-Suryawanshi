---
title: The CMB spectrum, from real data
description:
  Real COBE/FIRAS measurements, plotted against a blackbody curve you compute
  yourself, so "the early universe looks thermal" stops being something you
  were told.
week: 2
date: 2026-08-12
teachers:
  - idris-fenn
spec:
  - you have downloaded and plotted the actual FIRAS monopole spectrum, not values copied from a textbook
  - your plot compares the measured spectrum against a 2.725 K blackbody curve you compute yourself
  - you can say how large the measured departure from that curve is, in the data's own units
related:
  - lectures/week-02
---

Week 2 said the microwave sky looks like the glow from something at a single temperature. This session is where you check that claim yourself, against the actual measurement, rather than taking the lecture's word for it.

## Before the session

Download the CMB monopole spectrum measured by COBE's FIRAS instrument, released through NASA's Legacy Archive for Microwave Background Data Analysis (LAMBDA):

- data file: <https://lambda.gsfc.nasa.gov/data/cobe/firas/monopole_spec/firas_monopole_spec_v1.txt>
- product page: <https://lambda.gsfc.nasa.gov/product/cobe/firas_monopole_get.html>
- source: Fixsen et al. 1996, *ApJ* 473, 576; Fixsen & Mather 2002, *ApJ* 581, 817

The file has five columns: frequency in cm⁻¹, the measured spectrum in MJy/sr, then a residual, an uncertainty, and a modelled Galactic contribution, all three in kJy/sr. Bring a laptop that can run a short plotting script — Python with numpy and matplotlib is enough.

## In the session

Plot the measured spectrum: frequency against intensity, straight from columns one and two. Then compute a Planck blackbody curve at 2.725 K over the same frequency range and lay it on top of your own data. Nobody hands you the agreement between the two curves — you build the blackbody curve yourself and see how well it lands on the measurement.

Once the two curves sit on top of each other, look at column three: the residual, the actual measured deviation from that 2.725 K blackbody. It is reported in kilojanskys per steradian, against a signal that runs in the hundreds of megajanskys per steradian. That is where "the CMB is thermal to very high precision" stops being a phrase from the lecture and becomes a ratio you read off a file.

## Afterwards

Bring your plot and your residual figure to the next lecture discussion. If your version of the spectrum does not look like the lecture's description of it, check your units first — a units mismatch is a far more likely explanation than a broken universe.
