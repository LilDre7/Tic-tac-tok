// Aqui la logica
import { useState } from "react";
import confetti from "canvas-confetti";

const Turns = {
  X: "x",
  O: "o",
};

const Square = ({ children, isSelected, updateBoard, index }) => {
  const className = `square ${isSelected ? "is-selected" : ""}`;

  const handleClick = () => {
    updateBoard(index);
  };

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  );
};

// Logica para el juego //

const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
  [1, 4, 9],
  [3, 4, 7],
];

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(Turns.X);
  const [winner, setWinner] = useState(null);

  const checkWinner = (boardToCheck) => {
    // Comprobar si hay un ganador //
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo;
      if (
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a];
      }
    }
    return null;
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(Turns.X);
    setWinner(null);
  }

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
    // revisar si existe un ganador //
    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
      confetti()
    }else if(!newBoard.includes(null)){
      setWinner(false)
    }else{
      setWinner(null)
    }
  };

  return (
    <>
      <main className="board">
        <h1>Tic Tac Toc</h1>
        <button onClick={resetGame} >Reset Game</button>
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
        {
          winner !== null && (
            <section className="winner">
              <div className="text" >
                <h2>
                  {
                    winner === false ? "Empate" : "Ganador"
                  }
                </h2>

                <header className="win" >
                  {
                    winner && <Square> {winner} </Square>
                  }
                </header>

                <footer>
                  <button onClick={resetGame} >
                    Empezar de nuevo
                  </button>
                </footer>

              </div>
            </section>
          )
        }
      </main>
    </>
  );
}

export default App;
