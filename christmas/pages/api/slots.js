/* eslint-disable consistent-return */
import prisma from '@/lib/clients/db'
import * as slotConntroller from '@/features/slots/slots.controller'

export default async function handler(req, res) {
  const { calenderId } = req.query

  if (req.method.toLowerCase() === 'get') {
    await slotConntroller.getSlots(req, res, calenderId)
    
  } else {
    res.status(405).end()
  }
}
