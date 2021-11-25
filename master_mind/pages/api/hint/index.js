import * as hintsController from '@/features/hints/hints.controller'

export default async function handler(req, res) {
  const { method } = req

  switch(method?.toLowerCase()) {
    case 'get':
      await hintsController.getHints(req, res)
      break
    default:
      res.status(405).end()
  }
}