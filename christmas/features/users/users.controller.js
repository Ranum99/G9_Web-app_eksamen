import prisma from '@/lib/clients/db'
import * as usersService from '@/features/users/users.service'

export const getUsers = async (req, res) => {
  const users = await usersService.getUsers()

  console.log(users)

  if (!users?.success) {
    return users
  } else {
    console.log('returnerer')
    return users
  }
}
