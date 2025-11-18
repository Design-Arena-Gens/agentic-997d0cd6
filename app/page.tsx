"use client";

import { useState } from "react";
import { generateAll } from "@/lib/generator";
import OutputBlock from "@/components/OutputBlock";

export default function Page() {
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("emotional");
  const [niche, setNiche] = useState("general");
  const [seed, setSeed] = useState(() => Math.floor(Math.random() * 100000));
  const [result, setResult] = useState<ReturnType<typeof generateAll> | null>(null);
  const [loading, setLoading] = useState(false);

  function doGenerate(customSeed?: number) {
    if (!topic.trim()) return;
    setLoading(true);
    const s = typeof customSeed === "number" ? customSeed : seed;
    const output = generateAll({ topic: topic.trim(), tone, niche, seed: s });
    setResult(output);
    setLoading(false);
  }

  function regenerate() {
    const newSeed = Math.floor(Math.random() * 100000);
    setSeed(newSeed);
    doGenerate(newSeed);
  }

  return (
    <div className="page">
      <section className="controls">
        <div className="field">
          <label>Topic</label>
          <input
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g. Time Management, Passive Income, Fitness, AI, Study Hacks"
            onKeyDown={(e) => e.key === "Enter" && doGenerate()}
          />
        </div>
        <div className="row">
          <div className="field">
            <label>Tone</label>
            <select value={tone} onChange={(e) => setTone(e.target.value)}>
              <option value="emotional">Emotional</option>
              <option value="motivational">Motivational</option>
              <option value="mysterious">Mysterious</option>
              <option value="shocking">Shocking</option>
            </select>
          </div>
          <div className="field">
            <label>Niche</label>
            <select value={niche} onChange={(e) => setNiche(e.target.value)}>
              <option value="general">General</option>
              <option value="money">Money/Business</option>
              <option value="fitness">Fitness/Health</option>
              <option value="study">Study/Careers</option>
              <option value="tech">Tech/AI</option>
              <option value="motivation">Motivation</option>
            </select>
          </div>
        </div>
        <div className="actions">
          <button className="primary" disabled={!topic || loading} onClick={() => doGenerate()}>
            {loading ? "Generating..." : "Generate Viral Script"}
          </button>
          <button className="ghost" onClick={regenerate} disabled={loading || !result}>Regenerate ?</button>
        </div>
      </section>

      {result && (
        <section className="output">
          <OutputBlock title="1) VIRAL HOOK (???? 3 ?????)" copyText={result.hook}>
            <p className="hook">{result.hook}</p>
          </OutputBlock>

          <OutputBlock
            title="2) FULL SCRIPT (30?60s) ? Hindi + Hinglish"
            copyText={result.script.map((l) => `${l.text} [Visual: ${l.visual}]`).join("\n")}
            downloadableFilename={`script_${topic.replace(/\s+/g, "_")}.txt`}
          >
            <ol className="script-list">
              {result.script.map((line, i) => (
                <li key={i}>
                  <div className="line-text">{line.text}</div>
                  <div className="line-visual">Visual: {line.visual}</div>
                </li>
              ))}
            </ol>
          </OutputBlock>

          <OutputBlock title="3) VOICEOVER TEXT" copyText={result.voiceover.join("\n")}>
            <ol className="vo-list">
              {result.voiceover.map((l, i) => (
                <li key={i}>{l}</li>
              ))}
            </ol>
          </OutputBlock>

          <OutputBlock title="4) VISUAL SHOTS LIST" copyText={result.visuals.join("\n")}>
            <ol className="vis-list">
              {result.visuals.map((v, i) => (
                <li key={i}>{v}</li>
              ))}
            </ol>
          </OutputBlock>

          <OutputBlock title="5) CAPTIONS (Auto-subtitles)" copyText={result.captions.join("\n")}>
            <div className="captions">
              {result.captions.map((c, i) => (
                <span key={i} className="cap-chip">{c}</span>
              ))}
            </div>
          </OutputBlock>

          <OutputBlock title="6) HASHTAGS" copyText={result.hashtags.join(" ") }>
            <div className="hashtags">
              {result.hashtags.map((h, i) => (
                <span key={i} className="tag">{h}</span>
              ))}
            </div>
          </OutputBlock>
        </section>
      )}
    </div>
  );
}
