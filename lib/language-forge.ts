// Phrase bank and pure practice logic for the Language Forge desk.
// The phrases are illustrative, authored in the code; nothing is fetched or saved.

export type Phrase = {
  id: string;
  thai: string;
  roman: string;
  meaning: string;
  part: string;
  example: string;
  prompt: string;
  answers: string[];
  correct: number;
};

export const phrases: Phrase[] = [
  { id: "calm", thai: "ใจเย็น", roman: "jai yen", meaning: "stay calm", part: "phrase / gentle", example: "ใจเย็นก่อน แล้วค่อยดูอีกครั้ง", prompt: "Which meaning belongs to this phrase?", answers: ["stay calm", "take a seat", "look around"], correct: 0 },
  { id: "notice", thai: "สังเกต", roman: "sǎng-gèt", meaning: "to notice", part: "verb / attentive", example: "ลองสังเกตเสียงท้ายคำ", prompt: "What are you doing when you sǎng-gèt?", answers: ["to notice", "to forget", "to carry"], correct: 0 },
  { id: "enough", thai: "พอแล้ว", roman: "phɔɔ láew", meaning: "that is enough", part: "phrase / boundary", example: "วันนี้ฝึกเท่านี้พอแล้ว", prompt: "Which line sets a gentle boundary?", answers: ["that is enough", "see you tomorrow", "let us begin"], correct: 0 },
  { id: "together", thai: "ด้วยกัน", roman: "dûay-kan", meaning: "together", part: "adverb / shared", example: "เราลองอ่านประโยคนี้ด้วยกัน", prompt: "What does dûay-kan describe?", answers: ["together", "quickly", "quietly"], correct: 0 },
];

/** Two-digit label used across the desk ("01", "04"). */
export function pad2(value: number): string {
  return String(value).padStart(2, "0");
}

/** Index of the phrase after `index`, wrapping back to the first one. */
export function nextIndex(index: number, count: number): number {
  if (count <= 0) return 0;
  return (index + 1) % count;
}

/** Letter shown beside an answer option (0 -> "A"). */
export function optionLetter(index: number): string {
  return String.fromCharCode(65 + index);
}

export function isCorrect(phrase: Phrase, answer: number | null): boolean {
  return answer !== null && answer === phrase.correct;
}

/** Feedback line shown after "Check phrase". */
export function feedback(phrase: Phrase, answer: number | null): string {
  return isCorrect(phrase, answer)
    ? "Good read — this one is ready to use."
    : `Not quite. The useful meaning here is “${phrase.meaning}”.`;
}

/** Share of the set opened so far, 0..1, for the session line. */
export function sessionProgress(index: number, count: number): number {
  if (count <= 0) return 0;
  return Math.min(1, Math.max(0, (index + 1) / count));
}
