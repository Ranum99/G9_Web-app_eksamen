import { PrismaErrors } from '@/lib/api/errors'
import { Result } from '@/lib/api/result'
import prisma from '@/lib/clients/db'

export const doeNotexsist = async (name) => {
  try {
    const calender = await prisma.calender.findUnique({
      where: {
        name,
      },
      include: {
        slot: true,
      },
    })

    if (calender == null) {
      return Result.failure('Fant ingen kalender')
    }
    return Result.success(calender)
  } catch (error) {
    return Result.failure(error)
  }
}
