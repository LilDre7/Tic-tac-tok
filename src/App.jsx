// Aqui la logica
import { useState } from "react";
import confetti from "canvas-confetti";
import Square from "./components/Square";
import { Turns } from "./utils/constants";
import { WinnerModal } from "./components/WinnerModal";
import { checkWinner } from "./utils/board";
import FooterPersonal from "./components/footerPersonal";

function App() {
  const [board, setBoard] = useState(() => {
    const loadGame = window.localStorage.getItem("board");

    if (loadGame) return JSON.parse(loadGame);
    return Array(9).fill(null);
  });
  const [turn, setTurn] = useState(() => {
    const turn = window.localStorage.getItem("turn");
    return turn ?? Turns.X;
  });
  const [winner, setWinner] = useState(null);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(Turns.X);
    setWinner(null);

    window.localStorage.removeItem("board");
    window.localStorage.removeItem("turn");
  };

  const updateBoard = (index) => {
    // ** No actualizamos esta posicion porque ya esta ocupada ** //
    // Si ya tiene algo //
    if (board[index] || winner) return;
    // Actualizar el tablero //
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);
    // cambiar el turno //
    const newTurn = turn === Turns.X ? Turns.O : Turns.X;
    setTurn(newTurn);
    // Guardar en localStorage la partida
    window.localStorage.setItem("board", JSON.stringify(newBoard));
    window.localStorage.setItem("turn", JSON.stringify(turn));
    // revisar si existe un ganador //
    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
      confetti();
    } else if (!newBoard.includes(null)) {
      setWinner(false);
    } else {
      setWinner(null);
    }
  };

  return (
    <>
      <main className="board">
        <h1>Tic Tac Toc</h1>
        <button onClick={resetGame}>Reset Game</button>
        <section className="game">
          {board.map((value, index) => {
            return (
              <Square index={index} key={index} updateBoard={updateBoard}>
                {board[index]}
              </Square>
            );
          })}
        </section>

        <section className="turn">
          <Square isSelected={turn === Turns.X}>{Turns.X}</Square>
          <Square isSelected={turn === Turns.O}>{Turns.O}</Square>
        </section>

        <WinnerModal winner={winner} resetGame={resetGame} />
      </main>
      <FooterPersonal />
    </>
  );
}

export default App;
