import { readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import { parse } from "yaml";
import { describe, expect, it } from "vitest";

const DIR = resolve("src/content/lectures");

const lectures = readdirSync(DIR)
  .filter((f) => f.endsWith(".md"))
  .map((f) => {
    const raw = readFileSync(resolve(DIR, f), "utf8");
    const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
    if (!m) throw new Error(`${f} has no frontmatter`);
    return { slug: f.replace(/\.md$/, ""), data: parse(m[1]) ?? {}, body: m[2] };
  });

const byWeek = (n: number) => lectures.find((l) => l.data.week === n);

// Maths arrives in week 7, because week 7 is the first question in the chain
// that words cannot settle. Weeks 1-6 may use numbers, scales and comparisons;
// what they may not use is formalism.
const MATHS = [
  { name: "display maths ($$...$$)", re: /\$\$[\s\S]*?\$\$/ },
  { name: "inline maths ($...$)", re: /(?<!\\)\$[^$\n]+\$/ },
  { name: "LaTeX \\( \\)", re: /\\\([\s\S]*?\\\)/ },
  { name: "LaTeX \\[ \\]", re: /\\\[[\s\S]*?\\\]/ },
  { name: "an equation environment", re: /\\begin\{(?:equation|align|gather|multline)\}/ },
];

describe("maths does not arrive before week 7", () => {
  for (let week = 1; week <= 6; week++) {
    it(`week ${week} carries no formalism`, () => {
      const lecture = byWeek(week);
      expect(lecture, `no lecture for week ${week}`).toBeDefined();
      for (const { name, re } of MATHS) {
        expect(
          re.test(lecture!.body),
          `week ${week} uses ${name}; the threshold is week 7`,
        ).toBe(false);
      }
    });
  }
});

describe("every week closes the same way", () => {
  for (let week = 1; week <= 12; week++) {
    it(`week ${week} ends with what it explained and what became stranger`, () => {
      const lecture = byWeek(week);
      expect(lecture, `no lecture for week ${week}`).toBeDefined();

      const explained = lecture!.body.search(/^## What we explained\s*$/m);
      const stranger = lecture!.body.search(/^## What became stranger\s*$/m);

      expect(explained, `week ${week} has no "What we explained" heading`).toBeGreaterThan(-1);
      expect(stranger, `week ${week} has no "What became stranger" heading`).toBeGreaterThan(-1);
      expect(stranger, `week ${week} puts the two closing sections the wrong way round`).toBeGreaterThan(explained);
    });
  }

  for (let week = 1; week <= 12; week++) {
    it(`week ${week}'s leftover appears under "What became stranger"`, () => {
      const lecture = byWeek(week);
      expect(lecture, `no lecture for week ${week}`).toBeDefined();
      const tail = lecture!.body.slice(lecture!.body.search(/^## What became stranger\s*$/m));
      expect(
        tail.includes(String(lecture!.data.leftover)),
        `week ${week}'s closing section does not state the leftover its frontmatter declares`,
      ).toBe(true);
    });
  }
});