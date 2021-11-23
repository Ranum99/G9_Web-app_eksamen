import { PrismaErrors } from '@/lib/api/errors'
import { Result } from '@/lib/api/result'
import prisma from '@/lib/clients/db'

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

export const exist = async (id) => {
  try {
    // TODO: Burde vell vært findUnique ?
    const user = await prisma.user.findFirst({
      where: {
        id: {
          equals: Number(id),
        },
      },
    })

    if (user == null) {
      return {
        success: false,
        type: 'User.NotFound',
        error: 'Bruker ikke funnet',
      }
    }

    return {
      success: true,
      data: user,
    }
  } catch (error) {
    return {
      success: false,
      error: error,
    }
  }
}
