import prisma from '@/lib/clients/db'
import * as userController from '@/features/users/users.controller'
import { ApiResponse } from '@/lib/api/apiResponse'

export default async function handler(req, res) {
  if (req.method.toLowerCase() === 'get') {
    const users = await userController.getUsers(req, res)
  } else {
    ApiResponse(res).notAllowed()
  }
}
