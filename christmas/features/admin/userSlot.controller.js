import { ApiResponse } from '@/lib/api/apiResponse'
import * as adminUserSlotService from '@/features/admin/userSlot.service'

export const getUserSlots = async (req, res, id) => {
  if (!id) {
    ApiResponse(res).badRequest('ID mangler')
  }

  // userInfo() fungerer ikke, returnerer { user: null, admin: false }. Dvs at den ikke finner cookies

  const user = req.cookies
  if (!user.admin) {
    ApiResponse(res).unauthorized()
    return
  }

  const response = await adminUserSlotService.getUserSlots(req, res, id)

  if (!response.success) {
    ApiResponse(res).badRequest(response.error)
  }
  ApiResponse(res).ok(response.data)
}
