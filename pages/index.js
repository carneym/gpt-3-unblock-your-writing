import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [blockedText, setBlockedText] = useState("");
  const [exampleText, setExampleText] = useState("");
  const [prevBlockedText, setPrevBlockedText] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: blockedText, sample: exampleText }),
    });
    const data = await response.json();
    setResult(data.result);
    setPrevBlockedText(blockedText);
    setBlockedText("");
  }

  return (
    <div>
      <Head>
        <title>Get tax advice!</title>
        
      </Head>

      <main className={styles.main}>
        <img src="/plunger.png" className={styles.icon} />
        <h3>Unblock your creative writing.</h3>
        <form onSubmit={onSubmit}>
          <label htmlFor="sampleText">Provide some sample writing here.</label>
          <textarea 
            name="sampleText" 
            placeholder="I wrote this paragraph."
            value={exampleText}
            onChange={(e) => setExampleText(e.target.value)}
          ></textarea>
          <label htmlFor="prompt">Add the start of the sentence you're getting stuck on here.</label>

          <input
            type="text"
            name="prompt"
            placeholder="I'm getting stuck here :("
            value={blockedText}
            onChange={(e) => setBlockedText(e.target.value)}
          />
          <input type="submit" value="Get unblocked." />
        </form>
        <div className={styles.result}>{prevBlockedText}<b> {result}</b></div>
      </main>
    </div>
  );
}
