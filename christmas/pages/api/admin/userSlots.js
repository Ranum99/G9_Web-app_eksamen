import { ApiResponse } from '@/lib/api/apiResponse'
import * as adminUserSlots from '@/features/admin/userSlot.controller'

export default async function handler(req, res) {
  const { id } = req.query

  if (req.method.toLowerCase() === 'get') {
    adminUserSlots.getUserSlots(req, res, id)
  } else {
    console.log('Ulovlig')
    ApiResponse(res).notAllowed()
  }
}
