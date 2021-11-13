import prisma from '@/lib/clients/db'
import * as UserController from "@/features/users/users.controller"

export default async function handler(req, res) {
  switch (req.method.toLowerCase()) {

    case 'get': {
           await UserController.getUsers(req, req)
    }
    
    default:
      return res.status(405).end()
  }
}
