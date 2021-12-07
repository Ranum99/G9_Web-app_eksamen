import prisma from '@/lib/clients/db'
import { PrismaErrors } from '@/lib/api/errors'
import { Result } from '@/lib/api/result'

const createCoupon = () => {
  let coupon = ''

  coupon = Math.random().toString().substr(2, 4)

  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  //generates 4 random letters
  for (let i = 0; i < 4; i++) {
    coupon += letters.charAt(Math.floor(Math.random() * letters.length))
  }

  const holderArray = coupon.split('')
  coupon = shuffle(holderArray)

  return coupon
}

// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
// Linken til koden funnet 26.11.21
const shuffle = (array) => {
  let currentIndex = array.length,
    randomIndex

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--

    // And swap it with the current element.
    ;[array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ]
  }

  let randomCode = ''

  array.forEach((element) => (randomCode += element))

  return randomCode
}

export const create = async (slotId, userId) => {
  try {
    const coupon = createCoupon()

    const date = new Date()

    const userSlot = await prisma.userSlot.create({
      data: {
        coupon: coupon,
        createdAt: new Date(),
        slotId: Number(slotId),
        userId: Number(userId),
      },
    })

    return Result.success(userSlot)
  } catch (error) {
    console.log(error)
    return Result.failure(PrismaErrors.create('userSlot', undefined, error))
  }
}

export const exist = async (slotId, userId) => {
  try {
    const userSlot = await prisma.userSlot.findFirst({
      where: {
        slotId: {
          equals: Number(slotId),
        },
        userId: {
          equals: Number(userId),
        },
      },
    })

    if (!userSlot) {
      return Result.success(null)
    }

    return Result.success(userSlot)
  } catch (error) {
    console.log(error)
    return Result.failure(error)
  }
}

export const clear = async () => {
  try {
    await prisma.userSlot.deleteMany({})
    return Result.success(null)
  } catch (error) {
    return Result.error(error)
  }
}
