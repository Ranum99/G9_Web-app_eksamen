import prisma from '@/lib/clients/db'
import * as calenderController from '@/features/calenders/calenders.controller'

export default async function handler(req, res) {
  const { name } = req.query

  if (req.method.toLowerCase() === 'get') {
    calenderController.getCalenders(req, res, name)
  }
  //could also just use 404 i guess
  else {
    // TODO: Bruke api/result
    res.status(405).json({
      success: false,
      error: 'Method not allowed',
    })
  }
}
