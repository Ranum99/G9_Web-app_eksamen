import prisma from '@/lib/clients/db'
import * as calenderController from '@/features/calenders/calenders.controller'
import { ApiResponse } from '@/lib/api/apiResponse'

export default async function handler(req, res) {
  const { name } = req.query

  if (req.method.toLowerCase() === 'get') {
    calenderController.getCalenders(req, res, name)
  } else {
    ApiResponse(res).notAllowed()
  }
}
