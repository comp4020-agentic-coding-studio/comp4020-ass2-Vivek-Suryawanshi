import { readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import { parse } from "yaml";
import { describe, expect, it } from "vitest";

// The chain, frozen. docs/chain.md is the account of why these twelve
// questions are in this order; this table is what holds the site to it.
// Changing a question here is a change to the course, not a test fix.
const CHAIN = [
  { week: 1, question: "Why is the night sky dark?", leftover: "What is the oldest light we can see?" },
  { week: 2, question: "What is the oldest light we can see?", leftover: "What is a temperature?" },
  { week: 3, question: "What is a temperature?", leftover: "How does a crowd have properties its members don't?" },
  { week: 4, question: "How does a crowd have properties its members don't?", leftover: "Why does time run one way?" },
  { week: 5, question: "Why does time run one way?", leftover: "How do organised structures persist at all?" },
  { week: 6, question: "How do organised structures persist at all?", leftover: "Why hasn't the Sun burned out?" },
  { week: 7, question: "Why hasn't the Sun burned out?", leftover: "How do two nuclei that can't touch, touch?" },
  { week: 8, question: "How do two nuclei that can't touch, touch?", leftover: "What is a particle?" },
  { week: 9, question: "What is a particle?", leftover: "What happens when you look?" },
  { week: 10, question: "What happens when you look?", leftover: "Why does matter behave like matter?" },
  { week: 11, question: "Why does matter behave like matter?", leftover: "Where does explanation break?" },
  { week: 12, question: "Where does explanation break?", leftover: "Why does the universe have the history, contents and laws that made the dark sky of Week 1 possible?" },
] as const;

const DIR = resolve("src/content/lectures");

interface Lecture {
  slug: string;
  data: Record<string, unknown>;
  body: string;
}

const lectures: Lecture[] = readdirSync(DIR)
  .filter((f) => f.endsWith(".md"))
  .map((f) => {
    const raw = readFileSync(resolve(DIR, f), "utf8");
    const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
    if (!m) throw new Error(`${f} has no frontmatter`);
    return { slug: f.replace(/\.md$/, ""), data: parse(m[1]) ?? {}, body: m[2] };
  });

const byWeek = (n: number) => lectures.find((l) => l.data.week === n);

describe("the chain is twelve weeks", () => {
  it("has exactly twelve lectures", () => {
    expect(lectures).toHaveLength(12);
  });

  for (const { week } of CHAIN) {
    it(`week ${week} exists exactly once`, () => {
      expect(lectures.filter((l) => l.data.week === week)).toHaveLength(1);
    });
  }
});

describe("each week opens on the question the last one left", () => {
  for (const { week, question, leftover } of CHAIN) {
    it(`week ${week} asks and leaves the right question`, () => {
      const lecture = byWeek(week);
      expect(lecture, `no lecture for week ${week}`).toBeDefined();
      expect(lecture!.data.question).toBe(question);
      expect(lecture!.data.leftover).toBe(leftover);
    });
  }

  for (let i = 0; i < CHAIN.length - 1; i++) {
    it(`week ${CHAIN[i].week}'s leftover is week ${CHAIN[i + 1].week}'s question`, () => {
      expect(CHAIN[i].leftover).toBe(CHAIN[i + 1].question);
    });
  }

  it("week 12 hands its question back to week 1 rather than to a week 13", () => {
    expect(CHAIN[11].leftover).toMatch(/Week 1/);
  });
});

describe("the chain is linked in the content graph", () => {
  for (const { week } of CHAIN.slice(1)) {
    it(`week ${week} declares a related ref to week ${week - 1}`, () => {
      const lecture = byWeek(week);
      expect(lecture, `no lecture for week ${week}`).toBeDefined();
      const related = (lecture!.data.related ?? []) as string[];
      const previous = byWeek(week - 1);
      expect(previous, `no lecture for week ${week - 1}`).toBeDefined();
      expect(
        related.some((r) => r === previous!.slug || r === `lectures/${previous!.slug}`),
        `week ${week} must link back to ${previous!.slug}`,
      ).toBe(true);
    });
  }
});