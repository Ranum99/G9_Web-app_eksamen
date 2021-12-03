import prisma from '@/lib/clients/db'
import * as callenderService from '@/features/calenders/calenders.service'
import { ApiResponse } from '@/lib/api/apiResponse'

export const getCalenders = async (req, res, name) => {
  const calendar = await callenderService.checkIfExsist(req, res, name)

  if (!calendar?.success) {
    return ApiResponse(res).badRequest(calendar.error)
  }
  return ApiResponse(res).ok(calendar.data)
}
