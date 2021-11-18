import { PrismaErrors } from '@/lib/api/errors'
import { Result } from '@/lib/api/result'
import prisma from '@/lib/clients/db'
export const exsist = async (id) => {
  try {
    id = Number(id)
    console.log(typeof id + id)
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
      return {
        success: false,
        error: 'Fant ingen kalender med ID ' + id,
      }
    }

    return { success: true, data: calender }
  } catch (error) {
    return { success: false, error: 'Failed finding calender: ' + error }
  }
}
