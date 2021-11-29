import { ApiResponse } from '@/lib/api/apiResponse'
import * as adminUserSlotService from '@/features/admin/userSlot.service'

export const getUserSlots = async (req, res, id) => {
  // TODO: Sjekke om bruker er admin, hvis nei avslutte forespørsel
  // 401 HTTP kode
  console.log('Controller')

  if (!id) {
    ApiResponse(res).badRequest('ID mangler')
  }

  const response = await adminUserSlotService.getUserSlots(req, res, id)

  console.log(response)

  if (!response.success) {
    console.log('Bad')
    ApiResponse(res).badRequest(response.error)
  }
  console.log('OK')
  ApiResponse(res).ok(response.data)
}
