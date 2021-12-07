import { PrismaErrors } from '@/lib/api/errors'
import { Result } from '@/lib/api/result'
import prisma from '@/lib/clients/db'
import error from 'next/error'

export const exsist = async (id) => {
  try {
    id = Number(id)
    const calender = await prisma.slot.findMany({
      where: {
        calender: {
          is: {
            id: id,
          },
        },
      },
    })

    if (calender.length == 0) {
      return Result.failure(
        PrismaErrors.read(calender, 'Fant ingen kalender med id: ' + id, error)
      )
    }

    return Result.success(calender)
  } catch (error) {
    return Result.failure(PrismaErrors.read(calender, undefined, error))
  }
}

export const exsistSingleSlot = async (id) => {
  try {
    const slot = await prisma.slot.findFirst({
      where: {
        id: {
          equals: Number(id),
        },
      },
    })

    if (slot == null) {
      return {
        success: false,
        type: 'Slot.NotFound',
        error: 'Slot ikke funnet',
      }
    }

    return {
      success: true,
      data: slot,
    }
  } catch (error) {
    return {
      success: false,
      error: error,
    }
  }
}
