/* eslint-disable consistent-return */
import prisma from '@/lib/clients/db'
import * as slotConntroller from '@/features/slots/slots.controller'
import { ApiResponse } from '@/lib/api/apiResponse'

export default async function handler(req, res) {
  const { calenderId } = req.query

  if (req.method.toLowerCase() === 'get') {
    await slotConntroller.getSlots(req, res, calenderId)
  } else {
    ApiResponse(res).notAllowed()
  }
}
