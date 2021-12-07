import * as gameController from '@/features/games/games.controller'

export default async function handler(req, res) {
  const { method } = req

  switch(method?.toLowerCase()) {
    case 'post':
      await gameController.saveGame(req, res)
      break
    default:
      res.status(405).end()
  }
}