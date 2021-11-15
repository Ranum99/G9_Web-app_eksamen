import prisma  from "@/lib/clients/db";





export const doeNotexsist = async (id) =>{
  try {
    const calender = await prisma.calender.findUnique({
      where: {
        id,
      },
    })
      //if it exsist return true
    return { success: true, data: calender }

  } //if it doesn return error 
  catch (error) {
    return { success: false, error: 'Failed finding calender' }
  }
}