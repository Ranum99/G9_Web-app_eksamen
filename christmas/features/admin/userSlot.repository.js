import prisma from '@/lib/clients/db'
import { Result } from '@/lib/api/result'

export const getUserSlots = async (id) => {
  console.log('REPO')

  try {
    const userSlots = await prisma.userSlot.findMany({
      where: {
        slotId: Number(id),
      },
    })

    // TODO: Returnere en feil dersom det ikke finnes userSlots med rett ID
    return Result.success(userSlots)
  } catch (error) {
    return Result.failure(error)
  }
}
