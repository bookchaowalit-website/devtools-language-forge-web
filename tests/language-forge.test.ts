import { describe, expect, it } from "vitest";
import { feedback, isCorrect, nextIndex, optionLetter, pad2, phrases, sessionProgress } from "@/lib/language-forge";

describe("phrase bank", () => {
  it("has unique ids and a correct answer that points at the phrase meaning", () => {
    expect(new Set(phrases.map((p) => p.id)).size).toBe(phrases.length);
    for (const phrase of phrases) {
      expect(phrase.correct).toBeGreaterThanOrEqual(0);
      expect(phrase.correct).toBeLessThan(phrase.answers.length);
      expect(phrase.answers[phrase.correct]).toBe(phrase.meaning);
      expect(new Set(phrase.answers).size).toBe(phrase.answers.length);
    }
  });
});

describe("nextIndex", () => {
  it("moves forward and wraps from the last phrase to the first", () => {
    expect(nextIndex(0, 4)).toBe(1);
    expect(nextIndex(3, 4)).toBe(0);
  });
  it("returns 0 for an empty set instead of NaN", () => {
    expect(nextIndex(0, 0)).toBe(0);
  });
});

describe("answer checking", () => {
  const phrase = phrases[0];
  it("treats no answer as not correct", () => {
    expect(isCorrect(phrase, null)).toBe(false);
  });
  it("accepts only the correct option", () => {
    expect(isCorrect(phrase, phrase.correct)).toBe(true);
    expect(isCorrect(phrase, phrase.correct + 1)).toBe(false);
  });
  it("names the right meaning when the answer is wrong", () => {
    expect(feedback(phrase, phrase.correct)).toContain("ready to use");
    expect(feedback(phrase, 2)).toContain(`“${phrase.meaning}”`);
  });
});

describe("labels and progress", () => {
  it("pads numbers to two digits and letters options from A", () => {
    expect(pad2(1)).toBe("01");
    expect(pad2(12)).toBe("12");
    expect(optionLetter(0)).toBe("A");
    expect(optionLetter(2)).toBe("C");
  });
  it("keeps the session line between 0 and 1", () => {
    expect(sessionProgress(0, 4)).toBe(0.25);
    expect(sessionProgress(3, 4)).toBe(1);
    expect(sessionProgress(9, 4)).toBe(1);
    expect(sessionProgress(0, 0)).toBe(0);
  });
});
