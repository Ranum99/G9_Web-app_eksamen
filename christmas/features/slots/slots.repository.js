import prisma  from "@/lib/clients/db";





export const doeNotexsist = async (id) =>{
  try {
    const calender = await prisma.calender.findUnique({
      where: {
        id,
      },
    })

    return { success: true, data: calender }
  } catch (error) {
    return { success: false, error: 'Failed finding calender' }
  }
}