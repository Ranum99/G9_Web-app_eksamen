import prisma from '@/lib/clients/db'

export const getUsers = async () => {
  try {
    const users = await prisma.user.findMany()

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
