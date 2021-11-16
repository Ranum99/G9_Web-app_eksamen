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
      return {
        success: false,
        error: 'Calendar not found',
      }
    }

    return { success: true, data: calender }
  } catch (error) {
    return { success: false, error: 'Failed finding calender' + error }
  }
}
