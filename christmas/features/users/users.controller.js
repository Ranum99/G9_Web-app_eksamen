import prisma from '@/lib/clients/db'
import * as usersService from '@/features/users/users.service'

export const getUsers = async (req, res) => {
  const users = await usersService.getUsers()

  // TODO: Kan bare returnere, vell
  if (!users?.success) {
    return users
  } else {
    return users
  }
}
