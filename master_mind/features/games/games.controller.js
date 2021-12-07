import * as gamesService from '@/features/games/games.service'
import { getUserFromCookie } from '@/lib/utils/api'

export const saveGame = async (req, res) => {
  const user = await getUserFromCookie(req)

  const { combination, numberOfTries, foundCombination } = req.body

  const combinationToString = combination.toString();

  const game = await gamesService.saveGame(
    { combination: combinationToString, user, numberOfTries, foundCombination }
  )

  if(!game.success)
    return res.status(500).json({success: false, data: game.error})


  return res.status(201).json({success: true, data: game.data})
}