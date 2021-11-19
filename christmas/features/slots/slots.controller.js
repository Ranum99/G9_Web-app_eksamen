import * as slotService from './slots.service'

import { ApiResponse } from '@/lib/api/apiResponse'




export const getSlots = async (req, res, id) => {

  if (!Number(id)) {

    return ApiResponse(res).badRequest(`${id} er ikke et tall` )
  }


  const slots = await slotService.checkIfExsist(id)

  if (!slots?.success) {
    return ApiResponse(res).badRequest("Error getting data")
  } 
   return ApiResponse(res).ok(slots)
  
}


/*
export const getSlots = async (req, res, id) => {
  if (!Number(id)) {
    return res
      .status(400)y
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
*/