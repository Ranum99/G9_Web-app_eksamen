import prisma from '@/lib/clients/db'
import * as callenderService from '@/features/calenders/calenders.service'

export const getCalenders = async (req, res, name) => {
  const calendar = await callenderService.checkIfExsist(req, res, name)

  if (!calendar?.success) {
    console.log(calendar)
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
