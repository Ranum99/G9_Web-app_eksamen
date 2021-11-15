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

    console.log(calender)
    console.log(calender.length)

    if (calender.length == 0) {
      console.log('Returnerer error')
      return {
        success: false,
        error: 'Fant ingen kalender med ID ' + id,
      }
    }

    return { success: true, data: calender }
  } catch (error) {
    //if it doesn return error
    console.log(error)
    return { success: false, error: 'Failed finding calender' }
  }
}
