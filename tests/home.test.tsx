import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import Home from "@/app/page";
import { phrases } from "@/lib/language-forge";

describe("home page", () => {
  it("renders the practice desk, every phrase in the bank and the illustrative-content notice", () => {
    const html = renderToString(<Home />);
    expect(html).toContain("Make a phrase");
    for (const phrase of phrases) expect(html).toContain(phrase.thai);
    expect(html).toContain("ILLUSTRATIVE CONTENT · NO LIVE TRANSLATION");
  });
  it("opens the first phrase with its prompt and keeps Check disabled until an answer is picked", () => {
    const html = renderToString(<Home />);
    expect(html).toContain(phrases[0].prompt);
    expect(html).toMatch(/<button[^>]*disabled=""[^>]*>Check phrase<\/button>/);
  });
});
