import prisma  from "@/lib/clients/db";





export const doeNotexsist = async (name) =>{
  try {
    const calender = await prisma.calender.findUnique({
      where: {
        name: {
          contains: name,
        },
      },
      include: {
        slot: true,
      },
    })

    return { success: true, data: calender }
  } catch (error) {
    return { success: false, error: 'Failed finding calender' }
  }
}