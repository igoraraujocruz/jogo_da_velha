import { useEffect, useState } from 'react';
import './App.css';

type Players = "X" | "O"

function App() {

  const [turn, setTurn] = useState<Players>('X');
  const [winner, setWinner] = useState<Players | null>(null);
  const [draw, setDraw] = useState<boolean | null>(null);
  const [marks, setMarks] = useState<{[key: string]: Players}>({})
  const [player1, setPlayer1] = useState('Jogador 1')
  const [player2, setPlayer2] = useState('Jogador 2')
  const [pointsPlayer1, setPointsPlayer1] = useState(0)
  const [pointsPlayer2, setPointsPlayer2] = useState(0)
  const [winnerName, setWinnerName] = useState('')

  useEffect(() => {
    const winner = getWinner()

    if (winner) {
      setWinner(winner)
    } else {
      if (Object.keys(marks).length === 9) {
        setDraw(true)
      }
    }
  }, [marks])

  useEffect(() => {
    if(marks[0] === "X") {
      setWinnerName(player1)
      setPointsPlayer1(pointsPlayer1 + 1)
    } else {
    setWinnerName(player2)}
    setPointsPlayer2(pointsPlayer2 + 1)
  },[winner])

  const gameOver = !!winner || !!draw;


  function getSquares() {
    return new Array(9).fill(true)
  }

  function play(index: number) {
    if(marks[index] || gameOver) {
      return;
    }

    setMarks(prev => ({ ...prev, [index]: turn}))
    setTurn(prev => prev === "X" ? "O" : "X")
  }

  function reset() {
    setTurn(marks[0] === "O" ? "X" : "O");

    setMarks({})
    setWinner(null)
    setDraw(null)
  }

  function getCellPlayer(index: number) {
    if(!marks[index]) {
      return;
    }

    return marks[index];
  }

  function getWinner () {
    const victoryLines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 4, 8],
      [2, 4, 6],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
    ]

    for (const line of victoryLines) {
      const [a, b, c] = line;

      if (marks[a] && marks[a] === marks[b]
        && marks[a] === marks[c]) {
          return marks[a]
      }
    }
  }

  return (
    <div className='container'>
      <div className='content'>
      {winner && <h2>{winnerName} Ganhou!</h2>}
          { draw && <h2>Empate</h2>}
          {gameOver && <button onClick={reset}>Jogar Novamente</button> }
   
      <div className={`board ${gameOver ? "gameOver" : null}`}>
        {getSquares().map((_, i) => (
          <div key={i} className={`cell ${getCellPlayer(i)}`} onClick={() => play(i)}>{marks[i]}</div>
        ))}
      </div>
      </div>
      <div className='input-names'>
          <label>Jogador 1</label>
          <input onChange={e => setPlayer1(e.target.value)} type="text" />
          <label>Jogador 2</label>
          <input  onChange={e => setPlayer2(e.target.value)} type="text" />   
        
      </div>
    </div>
    
  );
}

export default App;
