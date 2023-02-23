export const didWinSet = (set, userId) => {
  let wins = 0

  set.forEach((game) => {
    if (game.winner.includes(userId)) {
      wins++
    }
  })

  return wins === 2
}
