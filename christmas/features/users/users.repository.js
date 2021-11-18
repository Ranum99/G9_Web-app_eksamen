import prisma from '@/lib/clients/db'
import { Result } from '@/lib/api/result'
import { PrismaErrors } from '@/lib/api/errors'

export const getUsers = async () => {
  try {
    const users = await prisma.user.findMany()

    return Result.success(users)

  } catch (error) {

  return Result.failure(PrismaErrors.read('users', undefined, error))
  }
  
}

/* OLD
  return {
      success: true,
      data: users,
    }
  } catch (error) {
    return {
      success: false,
      error: error,
    }
  }
}
*/
