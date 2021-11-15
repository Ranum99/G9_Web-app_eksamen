import prisma from '@/lib/clients/db'
import * as callenderService from '@/features/calenders/calenders.service'

export const getCalenders = async (req, res, name) => {
  if (!callenderService.checkIfExsist(name)) {
    return rest.status(400).json({ success: true, error: `${name} not found` })
  } else {
    const calender = await prisma.calender.findMany({
      where: {
        name: {
          contains: name,
        },
      },
      include: {
        slot: true,
      },
    })

    console.log('calender: ' + calender)
    res.status(200).json({ success: true, data: calender }).end()
  }
}
