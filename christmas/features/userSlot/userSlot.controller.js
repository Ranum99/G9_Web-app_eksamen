import * as userSlotService from '@/features/userSlot/userSlot.service'
import { ApiResponse } from '@/lib/api/apiResponse'

export const getUserSlot = async (req, res) => {
  const { slotId, userId } = req.query

  if (!slotId || !userId) {
    return ApiResponse(res).badRequest('Mangler slotId og/eller userId')
  }

  const userSlot = await userSlotService.getUserSlot(slotId, userId)

  if (!userSlot.success) {
    switch (userSlot?.type) {
      case 'User.NotFound':
        return ApiResponse(res).notFound('Error 404: User Not Found')
      case 'Slot.NotFound':
        return ApiResponse(res).notFound('Error 404: Slot Not Found')
      case 'UserSlot.Exist':
        ApiResponse(res).conflict('Finnes allerede')
      default:
        return ApiResponse(res).serverError
    }
  } else {
    return ApiResponse(res).ok(userSlot.data)
  }
}

export const clear = async (req, res) => {
  const response = await userSlotService.clear()

  if (!response.success) {
    return ApiResponse(res.clearedData)
  }
  return ApiResponse(res).ok()
}
