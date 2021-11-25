export const getHints = async ( state ) => {
  const hints = getTheHints(JSON.parse(state))

  return { success: true, data: hints }
}

const getTheHints = (state) => {
  console.log("FASIT: ", state.game);
  console.log("Mine valg: ", state.selectedColors);
  return state.selectedColors?.reduce(
    (hints, color, index) => {
      if (color === state.game[index]) {
        hints.positions += 1
      } else if (state.game.includes(color)) {
        hints.colors += 1
      }
      return hints
    },
    { positions: 0, colors: 0 }
  )
}