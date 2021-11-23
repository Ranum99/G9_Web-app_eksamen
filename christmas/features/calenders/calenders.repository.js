import { PrismaErrors } from '@/lib/api/errors'
import { Result } from '@/lib/api/result'
import prisma from '@/lib/clients/db'
//import error from 'next/error'

//unsure what next/error import are used for tbh

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
      return Result.failure(PrismaErrors.read(calender, undefined, error))
    }
    return Result.success(calender)
  } catch (error) {
    return Result.failure(PrismaErrors.read(calender, undefined, error))
  }
}
