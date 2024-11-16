import React, { useState, useEffect } from "react";
import { words } from "./words";
import { scrambleWord } from "./utils";
import "./App.css";

function App() {
  const [currentWord, setCurrentWord] = useState("");
  const [scrambledWord, setScrambledWord] = useState("");
  const [guess, setGuess] = useState("");
  const [feedback, setFeedback] = useState("");
  const [hint, setHint] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [timerId, setTimerId] = useState(null);

  // Load a new word when the component mounts
  useEffect(() => {
    loadNewWord();
  }, []);

  // Timer effect
  useEffect(() => {
    if (timeLeft <= 0) {
      setFeedback("Time's up! Moving to next word.");
      setTimeout(() => {
        loadNewWord();
      }, 2000);
    }
  }, [timeLeft]);

  useEffect(() => {
    // Start timer when a new word is loaded
    if (timerId) clearInterval(timerId);
    const id = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);
    setTimerId(id);

    return () => clearInterval(id);
  }, [scrambledWord]);

  // Function to load a new word
  const loadNewWord = () => {
    if (words.length === 0) {
      setScrambledWord("");
      setFeedback("Congratulations! You've completed all words.");
      setCurrentWord("");
      setHint("");
      setShowHint(false);
      setTimeLeft(0);
      return;
    }
    const randomIndex = Math.floor(Math.random() * words.length);
    const selectedWord = words[randomIndex];
    setCurrentWord(selectedWord.word);
    setScrambledWord(scrambleWord(selectedWord.word));
    setHint(selectedWord.hint);
    setShowHint(false);
    setGuess("");
    setFeedback("");
    setTimeLeft(30);
  };

  // Function to check the user's guess
  const checkGuess = () => {
    if (!guess.trim()) {
      setFeedback("Please enter a valid guess.");
      return;
    }
    if (guess.toLowerCase() === currentWord.toLowerCase()) {
      setFeedback("Correct! Well done.");
      setScore(score + 1);
      // Remove the guessed word from the list
      const index = words.findIndex((w) => w.word === currentWord);
      words.splice(index, 1);
      // Load next word after a short delay
      setTimeout(() => {
        loadNewWord();
      }, 2000);
    } else {
      setFeedback("Incorrect. Try again.");
    }
  };

  return (
    <div className="container">
      <h1>Word Scramble Game</h1>
      <p>Unscramble the word:</p>
      <h2 className="scrambled-word">{scrambledWord}</h2>
      <div className="input-group">
        <input
          type="text"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          placeholder="Your guess"
          onKeyPress={(e) => {
            if (e.key === "Enter") checkGuess();
          }}
        />
        <button onClick={checkGuess}>Submit</button>
      </div>
      <div className="controls">
        <button onClick={() => setShowHint(true)}>Show Hint</button>
        <button onClick={loadNewWord}>Skip Word</button>
      </div>
      {showHint && <p className="hint">Hint: {hint}</p>}
      <p
        className={`feedback ${
          feedback.includes("Correct")
            ? "correct"
            : feedback.includes("Incorrect")
            ? "incorrect"
            : ""
        }`}
      >
        {feedback}
      </p>
      <div className="status">
        <p>Score: {score}</p>
        <p>Time Left: {timeLeft} seconds</p>
      </div>
    </div>
  );
}

export default App;
