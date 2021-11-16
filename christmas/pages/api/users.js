import prisma from '@/lib/clients/db'
import * as userController from '@/features/users/users.controller'

export default async function handler(req, res) {
  if (req.method.toLowerCase() === 'get') {
    const users = await userController.getUsers(req, req)
    return res.status(200).json(users)
  } else {
    return res
      .status(405)
      .json({ success: false, error: 'Bruk en annen HTTP metode' })
      .end()
  }
}
