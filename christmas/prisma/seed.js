/* eslint-disable no-await-in-loop */
/* eslint-disable consistent-return */
/* eslint-disable no-plusplus */


/*TODO UPDATE SEED FOR
    User UserSlot

    Calander Slot
    

    UserSlot User

    create use slot

*/
import { PrismaClient } from '@prisma/client'
import * as faker from 'faker'

const prisma = new PrismaClient()

const createUser = async () => {
  //Name variable gets used when creating a user
  const username = faker.name.firstName().toLowerCase()

  try {
    const user = await prisma.user.create({
      data: {
        //name used here
        username,
      },
    })

    return user
  } catch (error) {
    console.log(error)
  }
}


//list of users  is UserCount 
const createUsers = async (userCount) => {

  //list of users wil lbe gathered here 
  const userPromises = []

  //lennght of the list of users 
  for (let i = 0; i < userCount; i++) {


    //for each in the array createa aa new user
    const user = await createUser()


    //adds it to the array after creating users 
    userPromises.push(user)
  }

  //waits for userPromises to be finished
  await Promise.all(userPromises)
}

const createSlot = async (id, order) => {
  const slug = faker.lorem.slug()
  const currentYear = new Date().getFullYear()
  const currentMonth = new Date().getMonth()
  const currentDay = new Date().getDay()
  const openAt = new Date(
    currentYear,
    currentMonth,
    currentDay + order,
    12,
    0,
    0
  ).toISOString()

  try {
    const slot = await prisma.slot.create({
      data: {
        slug,
        order,
        openAt,
        calender: {
          connect: {
            id,
          },
        },
        //new field
      },
    })

    return slot
  } catch (error) {
    console.log(error)
  }
}

const createSlots = async (id, slotCount) => {
  const slotPromises = []

  for (let i = 0; i < slotCount; i++) {
    const order = Number(i + 1)

    const slot = await createSlot(id, order)

    slotPromises.push(slot)
  }
  await Promise.all(slotPromises)
}



const christmasCalender = async () =>
  prisma.calender.create({
    data: {
      name: 'Julekalender',
    },
  })

async function main() {
  console.log('Start seeding ...')
  await prisma.user.deleteMany({})
  await prisma.slot.deleteMany({})
  await prisma.calender.deleteMany({})
  await prisma.UserSlot.deleteMany({})
  const calender = await christmasCalender()

  await createSlots(calender.id, 24)
  await createUsers(10)
  console.log('Seeding finished.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })



  const createCalenderSlotwithUserAndSlot = async()=>{


   // henter en user
   const user = await prisma.user.findUnique({
    where: {
      username: 'test@test.no',
    },
  })

    // henter en feed
  const Slot = await prisma.slot.findUnique({
    where: {
      id: 'www.vg.no',
    },
  })
   await prisma.UserSlot.create({
    data: {
      slot : {
        connect: {id: slot.id},
      },
      user: {
        connect: {id: user.id}
      }
    }
   })

  }