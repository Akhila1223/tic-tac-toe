
import "./App.css";
import { useState } from "react";

function App() {
  const [turn, setTurn] = useState("x");
  const [cells, setCells] = useState(Array(9).fill(""));
  const [winner, setWinner] = useState(null);
  const [winningCells, setWinningCells] = useState([]);

  const [scores, setScores] = useState({
    x: 0,
    o: 0,
    draws: 0
  });

  const winnerCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  const checkWinner = (newCells) => {
    for (let combination of winnerCombinations) {
      const [a, b, c] = combination;

      if (
        newCells[a] &&
        newCells[a] === newCells[b] &&
        newCells[a] === newCells[c]
      ) {
        const winningPlayer = newCells[a];

        setWinner(winningPlayer);
        setWinningCells(combination);

        setScores((prev) => ({
          ...prev,
          [winningPlayer]: prev[winningPlayer] + 1
        }));

        return true;
      }
    }

    if (!newCells.includes("")) {
      setWinner("draw");

      setScores((prev) => ({
        ...prev,
        draws: prev.draws + 1
      }));

      return true;
    }

    return false;
  };

  const handleCellClick = (index) => {
    if (cells[index] !== "" || winner !== null) {
      return;
    }

    const newCells = [...cells];
    newCells[index] = turn;

    setCells(newCells);

    const gameOver = checkWinner(newCells);

    if (!gameOver) {
      setTurn(turn === "x" ? "o" : "x");
    }
  };

  const restartRound = () => {
    setCells(Array(9).fill(""));
    setTurn("x");
    setWinner(null);
    setWinningCells([]);
  };

  const resetAll = () => {
    restartRound();

    setScores({
      x: 0,
      o: 0,
      draws: 0
    });
  };

  return (
    <div className="App">
      <div className="game-card">
        <h1>Tic-Tac-Toe</h1>

        <div className="score-container">
          <div className="score x-score">
            X: {scores.x}
          </div>

          <div className="score">
            Draws: {scores.draws}
          </div>

          <div className="score o-score">
            O: {scores.o}
          </div>
        </div>

        <h3>
          {winner === "draw"
            ? "It's a Draw!"
            : winner
            ? `Winner: ${winner.toUpperCase()}`
            : `Turn: ${turn.toUpperCase()}`}
        </h3>

        <div className="grid-container">
          {cells.map((cell, index) => (
            <button
              className={`grid-item ${
                winningCells.includes(index)
                  ? "winning-cell"
                  : ""
              }`}
              key={index}
              onClick={() => handleCellClick(index)}
              disabled={cell !== "" || winner !== null}
            >
              {cell.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="button-container">
          <button
            className="primary-button"
            onClick={restartRound}
          >
            {winner !== null
              ? "Play Again"
              : "Restart Round"}
          </button>

          <button
            className="reset-button"
            onClick={resetAll}
          >
            Reset All
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
