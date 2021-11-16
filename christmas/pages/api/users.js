import prisma from '@/lib/clients/db'
import * as userController from '@/features/users/users.controller'

export default async function handler(req, res) {
  console.log('\n\n\n\n\n')

  if (req.method.toLowerCase() === 'get') {
    const users = await userController.getUsers(req, req)
    console.log('har fått brukere')
    return res.status(200).json(users)
  } else {
    return res.status(405).end()
  }
}
