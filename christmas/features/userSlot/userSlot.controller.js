import * as userSlotService from '@/features/userSlot/userSlot.service'
import { ApiResponse } from '@/lib/api/apiResponse'

export const getUserSlot = async (req, res) => {
  const { slotId, userId } = req.query

  if (!slotId || !userId) {
    return ApiResponse(res).badRequest('Mangler slotId og/eller userId')
  }

  const userSlot = await userSlotService.getUserSlot(slotId, userId)

  console.log(userSlot)

  if (!userSlot.success) {
    switch (userSlot?.type) {
      case 'User.NotFound':
        return ApiResponse(res).notFound('Error 404: User Not Found')
        break

      case 'Slot.NotFound':
        return ApiResponse(res).notFound('Error 404: Slot Not Found')
        break

      case 'UserSlot.Exist':
        ApiResponse(res).conflict('Finnes allerede')

      default:
        return ApiResponse(res).serverError
    }
  }
  res.status(200)
  res.json({ success: true, data: userSlot.data })
  res.end()
}

/*

export const getUserSlot = async (req, res) => {
  const { slotId, userId } = req.query

  console.log(slotId)
  console.log(userId)

  if (!slotId || !userId) {
    return res.status(400).json({
      success: false,
      error: 'Mangler slotId og/eller userId',
    })
  }

  const userSlot = await userSlotService.getUserSlot({
    slotId,
    userId,
  })

  if (!userSlot.success) {
    switch (userSlot?.type) {
      case 'User.NotExsist':
        return res.status(404).json({
          success: false,
          error: userSlot.error,
        })
      case 'Slot.NotExsist':
        return res.status(404).json({
          success: false,
          error: userSlot.error,
        })
      case 'UserSlot.Exist':
        return res.status(409).json({
          success: false,
          error: userSlot.error,
        })
      default:
        return res.status(500).json({
          success: false,
          error: userSlot.error,
        })
    }
*/
