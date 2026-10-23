"use client";

import { useState } from "react";
import { feedback, isCorrect, nextIndex, optionLetter, pad2, phrases, sessionProgress } from "@/lib/language-forge";

export default function Home() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [answer, setAnswer] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const phrase = phrases[phraseIndex];
  const choosePhrase = (index: number) => { setPhraseIndex(index); setAnswer(null); setSubmitted(false); };
  const nextPhrase = () => choosePhrase(nextIndex(phraseIndex, phrases.length));

  return (
    <main className="forge-page">
      <div className="forge-shell">
        <header className="forge-header"><a className="forge-brand" href="#practice"><span className="forge-mark" aria-hidden="true">LF</span><span>LANGUAGE FORGE</span></a><nav aria-label="Practice sections"><a href="#bank">PHRASE BANK</a><a href="#practice">PRACTICE</a><a href="#notes">NOTES</a></nav><span className="forge-session">SESSION / 08 MIN</span></header>
        <section className="forge-intro" id="practice"><div><h1>Make a phrase<br /><em>stay with you.</em></h1><p>One small language desk for looking closely, saying it out loud, and using the phrase before it slips away.</p></div><div className="forge-intro-note"><span>WORKING SET</span><strong>TH / EN</strong><small>4 phrases · illustrative content</small></div></section>
        <section className="forge-workspace">
          <aside className="forge-bank" id="bank"><div className="forge-label"><span>PHRASE BANK</span><span>{phrases.length} / {pad2(phrases.length)}</span></div><p className="forge-aside-copy">Choose a phrase to open its sound, meaning, and use.</p><div className="phrase-list">{phrases.map((item, index) => <button key={item.id} type="button" className={index === phraseIndex ? "phrase-row is-active" : "phrase-row"} onClick={() => choosePhrase(index)}><span>{pad2(index + 1)}</span><strong>{item.thai}</strong><small>{item.meaning}</small><b>{index === phraseIndex ? "OPEN" : "VIEW"}</b></button>)}</div></aside>
          <section className="forge-card" aria-labelledby="phrase-title"><div className="forge-card-top"><span>OPEN PHRASE / {pad2(phraseIndex + 1)}</span><span>{submitted ? "ANSWER RECORDED" : "LISTEN · READ · USE"}</span></div><div className="phrase-main"><div className="phrase-word"><span>THAI</span><h2 id="phrase-title">{phrase.thai}</h2><p>{phrase.roman}</p></div><div className="phrase-meaning"><span>{phrase.part}</span><strong>{phrase.meaning}</strong></div></div><div className="phrase-example"><span>IN A LINE</span><blockquote>“{phrase.example}”</blockquote><small>Read once for shape. Read once for intent.</small></div><div className="answer-zone"><p>{phrase.prompt}</p><div className="answer-options">{phrase.answers.map((item, index) => <button key={item} type="button" className={answer === index ? "answer-option is-picked" : "answer-option"} aria-pressed={answer === index} onClick={() => { setAnswer(index); setSubmitted(false); }}><span>{optionLetter(index)}</span>{item}</button>)}</div><div className="answer-actions"><button type="button" className="forge-primary" disabled={answer === null} onClick={() => setSubmitted(true)}>Check phrase</button><button type="button" className="forge-text-button" onClick={nextPhrase}>Next phrase <span aria-hidden="true">→</span></button></div>{submitted && <p className={isCorrect(phrase, answer) ? "forge-feedback is-right" : "forge-feedback is-wrong"} role="status">{feedback(phrase, answer)}</p>}</div></section>
          <aside className="forge-notes" id="notes"><div className="forge-label"><span>SESSION MAP</span><span>01 / 03</span></div><div className="session-count"><strong>{pad2(phraseIndex + 1)}</strong><span>of {pad2(phrases.length)} phrases open</span></div><div className="session-line"><span style={{ transform: `scaleX(${sessionProgress(phraseIndex, phrases.length)})` }} /></div><ol className="forge-stages"><li className="is-done"><span>01</span><div><strong>Look</strong><small>shape + sound</small></div></li><li className="is-current"><span>02</span><div><strong>Choose</strong><small>meaning in context</small></div></li><li><span>03</span><div><strong>Use</strong><small>make it yours</small></div></li></ol><div className="forge-note"><span>FIELD NOTE</span><p>Say the phrase before checking the English. A little uncertainty is part of the memory.</p></div><button type="button" className="forge-reset" onClick={() => choosePhrase(0)}>Reset session</button></aside>
        </section>
        <footer className="forge-footer"><span>LANGUAGE FORGE / PRACTICE DESK</span><span>ILLUSTRATIVE CONTENT · NO LIVE TRANSLATION</span></footer>
      </div>
    </main>
  );
}
