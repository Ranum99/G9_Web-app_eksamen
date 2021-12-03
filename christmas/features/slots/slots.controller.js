import * as slotService from './slots.service'

import { ApiResponse } from '@/lib/api/apiResponse'

export const getSlots = async (req, res, id) => {
  if (!id) {
    return ApiResponse(res).badRequest('calendarId mangeler')
  }

  if (!Number(id)) {
    return ApiResponse(res).badRequest(`${id} er ikke et tall`)
  }

  const slots = await slotService.checkIfExsist(id)

  if (!slots?.success) {
    return ApiResponse(res).badRequest('Error getting data')
  }

  if (slots.data == undefined) {
    return ApiResponse(res).notFound(`Fant ingen kalender med ID ${id}`)
  }
  return ApiResponse(res).ok(slots.data)
}
