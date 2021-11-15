import prisma from '@/lib/clients/db'
import * as slotsRepository from '@/features/slots/slots.repository'
import * as slotService from './slots.service'
import { rest } from 'msw'

export const getSlots = async (req, res, id) => {
  if (!Number(id)) {
    return res
      .status(400)
      .json({ success: false, error: `${id} er ikke et tall` })
  }

  const slots = await slotService.checkIfExsist(id)

  if (slots.success) {
    res.status(200).json(slots)
  } else {
    // TODO: feilkode
    res.status(400).json(slots)
  }
}
