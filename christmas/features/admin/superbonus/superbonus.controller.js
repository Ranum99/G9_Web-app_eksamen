import { ApiResponse } from '@/lib/api/apiResponse'
import * as superbonusService from '@/features/admin/superbonus/superbonus.service'

export const drawSuperBonus = async (req, res, id) => {
  // TODO: sjekke om bruker er admin
  // 401

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
