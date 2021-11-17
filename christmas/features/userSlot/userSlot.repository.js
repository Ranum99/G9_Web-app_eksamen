import prisma from '@/lib/clients/db'

const createCoupon = () => {
  // TODO: Lage coupon mer tilfeldig
  let coupon = ''
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  for (let i = 0; i < 4; i++) {
    coupon += letters[Math.random() * letters.length]
  }
  for (let i = 0; i < 4; i++) {
    coupon += Math.random() * 10
  }

  console.log(coupon)
  return coupon
}

export const create = async (slotId, userId) => {
  // Usikker på om dette virker
  try {
    const coupon = createCoupon()
    const userSlot = await prisma.userSlot.create({
      data: {
        user: {
          connect: { id: userId },
        },
        slot: {
          connect: { id: slotId },
        },
        coupon: coupon,
      },
    })

    return {
      success: true,
      data: userSlot,
    }
  } catch (error) {
    console.log(error)
    return {
      success: false,
      error: error,
    }
  }
}

export const exist = async (slotId, userId) => {
  // TODO: Virker ikke
  console.log('exist i userSlot repo')
  try {
    const userSlot = await prisma.userSlot.findUnique({
      where: {
        slotId_userId: {
          slotId,
          userId,
        },
      },
    })

    console.log('UserSlot i repo:')
    console.log(typeof userSlot)
    console.log(userSlot)
  } catch (error) {
    console.log(error)
    return {
      success: false,
      error: error,
    }
  }
}
