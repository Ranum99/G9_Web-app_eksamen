import * as gamesRepo from '@/features/games/games.repository'

export const saveGame = async({ combination, user, numberOfTries, foundCombination }) => {
  const game = await gamesRepo.create({ combination, user, numberOfTries, foundCombination })

  if(!game.success){
    return { success: false, error: game.error }
  }

  return { success: true, data: game.data }
}