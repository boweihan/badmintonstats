import React from 'react'

function SetDisplay({ set, uid }) {
  const wonGames = set.filter((game) => game.winner.includes(uid))
  const lostGames = set.filter((game) => !game.winner.includes(uid))

  return (
    <div>
      <h2>Overall: {`${wonGames.length} - ${lostGames.length}`}</h2>
      <h1>Games Won</h1>
      {wonGames.map((game) => (
        <div>
          {game.winScore}:{game.loseScore}
        </div>
      ))}
      <h1>Games Lost</h1>
      {lostGames.map((game) => (
        <div>
          {game.loseScore}:{game.winScore}
        </div>
      ))}
    </div>
  )
}

export default SetDisplay
