import { ApiResponse } from '@/lib/api/apiResponse'
import * as superbonus from '@/features/admin/superbonus/superbonus.controller'

export default async function handler(req, res) {
  const { id } = req.query

  if (req.method.toLowerCase() === 'get') {
    superbonus.drawSuperBonus(req, res, id)
  } else {
    ApiResponse(res).notAllowed()
  }
}
