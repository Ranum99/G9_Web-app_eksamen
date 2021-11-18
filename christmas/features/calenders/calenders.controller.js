import prisma from '@/lib/clients/db'
import * as callenderService from '@/features/calenders/calenders.service'
import { ApiResponse } from '@/lib/api/apiResponse'

export const getCalenders = async (req, res, name) => {
  const calendar = await callenderService.checkIfExsist(req, res, name)

  if (!calendar?.success) {

    return ApiResponse(res).badRequest(calendar)
 
  } else {
    const calender = await prisma.calender.findMany({
      where: {
        name,
      },
      include: {
        slot: true,
      },
    })

    return ApiResponse(res).ok(calender)
  }
}

/*
if (!calendar?.success) {
  return res.status(400).json(calendar)
} else {
  const calender = await prisma.calender.findMany({
    where: {
      name,
    },
    include: {
      slot: true,
    },
  })

  res.status(200).json({ success: true, data: calender })
}
}
*/