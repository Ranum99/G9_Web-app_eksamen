import * as userSlotController from '@/features/userSlot/userSlot.controller'
import { ApiResponse } from '@/lib/api/apiResponse'

export default async function handler(req, res) {
  switch (req.method.toLowerCase()) {
    case 'get':
      userSlotController.getUserSlot(req, res)
      break
    default:
      ApiResponse(res).notAllowed()
  }
}
