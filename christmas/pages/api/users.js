import prisma from '@/lib/clients/db'
import * as UserController from "@/features/users/user.controller"

export default async function handler(req, res) {
  switch (req.method.toLowerCase()) {

    case 'get': {
      const users = await prisma.user.findMany()

      return res.status(200).json({ success: true, users })

      await UserController.getUsers(req, req)
    }
    
    default:
      return res.status(405).end()
  }
}
