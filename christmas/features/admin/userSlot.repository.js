import prisma from '@/lib/clients/db'
import { Result } from '@/lib/api/result'

export const getUserSlots = async (id) => {
  try {
    const userSlots = await prisma.userSlot.findMany({
      where: {
        slotId: Number(id),
      },
      include: {
        user: true,
        slot: true,
      },
    })

    return Result.success(userSlots)
  } catch (error) {
    return Result.failure(error)
  }
}
