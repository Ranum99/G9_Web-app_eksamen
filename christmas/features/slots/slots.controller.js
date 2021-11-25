import * as slotService from './slots.service'

import { ApiResponse } from '@/lib/api/apiResponse'

export const getSlots = async (req, res, id) => {
  if (!Number(id)) {
    return ApiResponse(res).badRequest(`${id} er ikke et tall`)
  }

  const slots = await slotService.checkIfExsist(id)

  if (!slots?.success) {
    return ApiResponse(res).badRequest('Error getting data')
  }
  return ApiResponse(res).ok(slots)
}
