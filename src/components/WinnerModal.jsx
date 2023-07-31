import React from "react";
import { Square } from "./Square";

export const WinnerModal = ({ winner, resetGame }) => {
  if (winner === null) return null;

  const whoWin = winner === false ? "Empate 🤺 " : "Ganador 🎉 ";

  return (
    <>
      <section className="winner">
        <div className="text">
          <h2>{whoWin}</h2>

          <header className="win">
            {winner && <Square> {winner} </Square>}
          </header>

          <footer>
            <button onClick={resetGame}>Empezar de nuevo</button>
          </footer>
        </div>
      </section>
    </>
  );
};
