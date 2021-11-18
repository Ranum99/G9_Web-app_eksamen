import prisma from '@/lib/clients/db'
import { PrismaErrors } from '@/lib/api/errors'
import { Result } from '@/lib/api/result'



const createCoupon = () => {
  // TODO: Lage coupon mer tilfeldig


  let coupon = ''

 
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  
  

 
   let fourRndNumr = Math.random().toString().substr(2, 8); 

   let nrOfRndLetter = 4;
   let str = '';

   //generates 4 random letters 
   for (let i = 0; i < nrOfRndLetter; i++) {
       str += letters.charAt(Math.floor(Math.random() * letters.length));
   }

   holder = fourRndNumr + str;
  
   const holderArray = holder.split("");

   coupon = shuffle(holderArray)
  
  return coupon
}

const shuffle=(array)=> {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  let randomCode = array.toString();

  return randomCode;
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

    return Result.success(userSlot);
    
  } catch (error) {
    console.log(error)
    return  Result.failure(PrismaErrors.create("userSlot", undefined, error))
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


    //added return for sucsess
    return Result.success(userSlot)

    console.log('UserSlot i repo:')
    console.log(typeof userSlot)
    console.log(userSlot)
    
  } catch (error) {
    console.log(error)
    return  Result.failure(PrismaErrors.read("userSlot",undefined,error))
   
  }
}











/* OLD 
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

*/