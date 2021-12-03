import { ApiResponse } from '@/lib/api/apiResponse'
import * as superbonusService from '@/features/admin/superbonus/superbonus.service'

export const drawSuperBonus = async (req, res, id) => {
  // userInfo() fungerer ikke, returnerer { user: null, admin: false }. Dvs at den ikke finner cookies

  const user = req.cookies
  if (!user.admin) {
    ApiResponse(res).unauthorized()
    return
  }

  if (!id) {
    ApiResponse(res).badRequest('ID mangler')
  }

  const response = await superbonusService.drawSuperBonus(req, res, id)

  if (!response.success) {
    ApiResponse(res).badRequest(response.error)
  } else {
    ApiResponse(res).ok(response.data)
  }
}
