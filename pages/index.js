import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [blockedText, setBlockedText] = useState("");
  const [exampleText, setExampleText] = useState("");
  const [prevBlockedText, setPrevBlockedText] = useState("");
  const [result, setResult] = useState();
  const famousQuotes = [
    "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.",
    "Call me Ishmael.",
    "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair.",
    "Squire Trelawney, Dr Livesey, and the rest of these gentlemen having asked me to write down the whole particulars about Treasure Island, from the beginning to the end, keeping nothing back but the bearings of the island, and that only because there is still treasure not yet lifted, I take up my pen in the year of grace 17-, and go back to the time when my father kept the Admiral Benbow inn, and the brown old seaman, with the sabre cut, first took up his lodging under our roof.",
    "Stately, plump Buck Mulligan came from the stairhead, bearing a bowl of lather on which a mirror and a razor lay crossed.",
    "In my younger and more vulnerable years my father gave me some advice that I’ve been turning over in my mind ever since.",
    "It was a bright cold day in April, and the clocks were striking thirteen.",
    "If you really want to hear about it, the first thing you’ll probably want to know is where I was born, and what my lousy childhood was like, and how my parents were occupied and all before they had me, and all that David Copperfield kind of crap, but I don’t feel like going into it, if you want to know the truth.",
    "He was an old man who fished alone in a skiff in the Gulf Stream and he had gone eighty-four days now without taking a fish.",
    "It was love at first sight."
  ]

  function getQuote(){
    const index = Math.floor(Math.random()*10);
    return famousQuotes[index];
  }



  async function onSubmit(event) {
    event.preventDefault();
    if(blockedText === ""){
      alert("You need to provide some sample text and the start of where you are stuck.")
      return;
    }


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
        <title>Beat writers block!</title>
        
      </Head>

      <main className={styles.main}>
        <img src="/plunger.png" className={styles.icon} />
        <h3>Unblock your creative writing.</h3>
        <form onSubmit={onSubmit}>
          <label htmlFor="sampleText">Provide some sample writing here.</label>
          <textarea 
            name="sampleText" 
            placeholder={getQuote()}
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
