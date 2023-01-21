import React, {useState} from "react";
import "./styles/app.css"
import Header from "./components/Header";
import GameContainer from "./components/Game-container";
import GameOverlay from "./components/Game-overlay";

function App() {

  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameOverlayActive, setGameOverlayActive] = useState(false);
  const [restartedGame, setRestartedGame] = useState(false);

  const updateScore = () => {
      setScore(score + 1)
  }

  const updateHighScore = (score) => {
      setHighScore(score)
  }

  const toggleGameOverlay = () => {
      setGameOverlayActive(!gameOverlayActive);
  }

  const restartGame = () => {
      setScore(0);
      toggleGameOverlay();
      setRestartedGame(true);
  }

  const toggleRestartedGame = (val) => {
      setRestartedGame(val);
  }

  return (
    < div className="container">
      <Header score={score} highScore={highScore}/>
      <GameContainer score={score} highScore={highScore} updateScore={updateScore} updateHighScore={updateHighScore} toggleGameOverlay={toggleGameOverlay} restartedGame={restartedGame} toggleRestartedGame={toggleRestartedGame}/>
      <GameOverlay score={score} gameOverlayActive={gameOverlayActive} restartGame={restartGame}/>
    </div>
  );
}

export default App;
